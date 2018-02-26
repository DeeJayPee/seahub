# Copyright (c) 2012-2016 Seafile Ltd.
import json
import logging

from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from seaserv import (seafile_api, del_file, get_file_id_by_path,
                     post_empty_file)
from pysearpc import SearpcError
from django.core.urlresolvers import reverse
from django.db import IntegrityError
from django.db.models import Count
from django.http import HttpResponse
from django.utils.translation import ugettext as _

from seahub.api2.authentication import TokenAuthentication
from seahub.api2.throttling import UserRateThrottle
from seahub.api2.utils import api_error
from seahub.wiki.models import (Wiki, DuplicateWikiNameError, WikiDoesNotExist,
                                WikiPageMissing)
from seahub.wiki.utils import (is_valid_wiki_name, clean_page_name,
                               get_wiki_pages, get_inner_file_url,
                               get_wiki_dirent, get_wiki_page_object)
from seahub.utils import is_org_context, render_error, get_service_url

import urllib2
from django.utils.http import urlquote
from django.shortcuts import get_object_or_404
from django.contrib import messages

logger = logging.getLogger(__name__)


class WikisView(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated, )
    throttle_classes = (UserRateThrottle, )

    def get(self, request, format=None):
        """List all wikis.
        """
        username = request.user.username
        ret = [x.to_dict() for x in Wiki.objects.filter(username=username)]

        return Response({'data': ret})

    def post(self, request, format=None):
        """Add a new wiki.
        """
        result = {}
        content_type = 'application/json; charset=utf-8'
        name = request.POST.get('name', '')
        if not name:
            return api_error(status.HTTP_400_BAD_REQUEST, _('Name is required.'))

        if not is_valid_wiki_name(name):
            msg = _('Name can only contain letters, numbers, blank, hyphen or underscore.')
            return api_error(status.HTTP_400_BAD_REQUEST, msg)

        permission = request.POST.get('permission', '').lower()
        if permission not in [x[0] for x in Wiki.PERM_CHOICES]:
            msg = 'Permission invalid'
            return api_error(status.HTTP_400_BAD_REQUEST, msg)

        org_id = -1
        if is_org_context(request):
            org_id = request.user.org.org_id

        username = request.user.username
        try:
            wiki = Wiki.objects.add(name, username, permission=permission,
                                    org_id=org_id)
        except DuplicateWikiNameError:
            result['error'] = _('%s is taken by others, please try another name.') % name
            return HttpResponse(json.dumps(result), status=400,
                                content_type=content_type)
        except IntegrityError:
            result['error'] = 'Internal Server Error'
            return HttpResponse(json.dumps(result), status=500,
                                content_type=content_type)

        return Response(wiki.to_dict())


class WikiView(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated, )
    throttle_classes = (UserRateThrottle, )

    def delete(self, request, slug):
        """Delete a wiki.
        """
        username = request.user.username
        try:
            owner = Wiki.objects.get(slug=slug).username
        except Wiki.DoesNotExist:
            error_msg = 'Wiki not found.'
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)
        if owner != username:
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        Wiki.objects.filter(slug=slug).delete()

        return Response()

    def put(self, request, slug):
        """Edit a wiki permission
        """
        username = request.user.username

        try:
            wiki = Wiki.objects.get(slug=slug)
        except Wiki.DoesNotExist:
            error_msg = "Wiki not found."
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        if wiki.username != username:
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        permission = request.data.get('permission', '').lower()
        if permission not in [x[0] for x in Wiki.PERM_CHOICES]:
            msg = 'Permission invalid'
            return api_error(status.HTTP_400_BAD_REQUEST, msg)

        wiki.permission = permission
        wiki.save()
        return Response(wiki.to_dict())


class WikiPagesView(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated, )
    throttle_classes = (UserRateThrottle, )

    def get(slef, request, slug):
        """List all pages in a wiki.
        """
        try:
            wiki = Wiki.objects.get(slug=slug)
        except Wiki.DoesNotExist:
            error_msg = "Wiki not found."
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # perm check
        if not wiki.has_read_perm(request.user):
            error_msg = "Permission denied"
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        try:
            repo = seafile_api.get_repo(wiki.repo_id)
            if not repo:
                error_msg = "Wiki does not exists."
                return api_error(status.HTTP_404_NOT_FOUND, error_msg)
        except SearpcError:
            error_msg = "Internal Server Error"
            return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, error_msg)
        except WikiDoesNotExist:
            error_msg = "Wiki does not exists."
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        pages = get_wiki_pages(repo)
        wiki_pages_object = []
        for page_name in pages:
            wiki_page_object = get_wiki_page_object(request, slug, repo, page_name)
            wiki_pages_object.append(wiki_page_object)

        return Response({
                "data": wiki_pages_object
                })

    def post(self, request, slug):
        """ Add a page in a wiki
        """
        try:
            wiki = Wiki.objects.get(slug=slug)
        except Wiki.DoesNotExist:
            error_msg = "Wiki not found."
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # perm check
        username = request.user.username
        if wiki.username != username:
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        page_name = request.POST.get('name', '')
        if not page_name:
            error_msg = 'Name is not available'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)
        
        page_name = clean_page_name(page_name)
        filename = page_name + ".md"
        filepath = "/" + page_name + ".md"

        try:
            repo = seafile_api.get_repo(wiki.repo_id)
            if not repo:
                error_msg = "Wiki does not exists."
                return api_error(status.HTTP_404_NOT_FOUND, error_msg)
        except SearpcError:
            error_msg = "Internal Server Error"
            return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, error_msg)
        except WikiDoesNotExist:
            error_msg = "Wiki does not exists."
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # check whether file exists
        if get_file_id_by_path(repo.id, filepath):
            error_msg = 'Page name is exists'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        if not post_empty_file(repo.id, "/", filename, request.user.username):
            error_msg = 'Failed to create wiki page. Please retry later.'
            return api_error(status.HTTP_400_BAD_REQUEST, error_msg)

        wiki_page_object = get_wiki_page_object(request, slug, repo, page_name)

        return Response(wiki_page_object)


class WikiPageView(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated, )
    throttle_classes = (UserRateThrottle, )

    def get(self, request, slug, page_name="home"):
        """Get content of a wiki
        """
        try:
            wiki = Wiki.objects.get(slug=slug)
        except Wiki.DoesNotExist:
            error_msg = "Wiki not found."
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        # perm check
        if not wiki.has_read_perm(request.user):
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        page_name = clean_page_name(page_name)

        try:
            repo = seafile_api.get_repo(wiki.repo_id)
            if not repo:
                error_msg = "Wiki does not exists."
                return api_error(status.HTTP_404_NOT_FOUND, error_msg)
        except SearpcError:
            error_msg = "Internal Server Error."
            return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, error_msg)
        except WikiDoesNotExist:
            error_msg = "Wiki does not exists."
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        try:
            wiki_dirent = get_wiki_dirent(repo.id, page_name)
        except WikiPageMissing:
            error_msg = "Page dose not exits."
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        url = get_inner_file_url(repo, wiki_dirent.obj_id, wiki_dirent.obj_name)
        file_response = urllib2.urlopen(url)
        content = file_response.read()

        wiki_page_object = get_wiki_page_object(request, slug, repo, page_name)

        return Response({
            "meta": wiki_page_object,
            "content": content
            })

    def delete(self, request, slug, page_name):
        """Delete a page in a wiki
        """
        try:
            wiki = Wiki.objects.get(slug=slug)
        except Wiki.DoesNotExist:
            error_msg = "Wiki not found."
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        username = request.user.username
        if wiki.username != username:
            error_msg = 'Permission denied.'
            return api_error(status.HTTP_403_FORBIDDEN, error_msg)

        try:
            repo = seafile_api.get_repo(wiki.repo_id)
            if not repo:
                error_msg = "Wiki does not exists."
                return api_error(status.HTTP_404_NOT_FOUND, error_msg)
        except SearpcError:
            error_msg = "Internal Server Error."
            return api_error(status.HTTP_500_INTERNAL_SERVER_ERROR, error_msg)
        except WikiDoesNotExist:
            error_msg = "Wiki does not exists."
            return api_error(status.HTTP_404_NOT_FOUND, error_msg)

        file_name = page_name + ".md"

        if del_file(repo.id, '/', file_name, username):
            messages.success(request._request, 'Successfully deleted "%s".' % page_name)
        else:
            messages.error(request._request, 'Failed to delete "%s". Please retry later.' % page_name)

        return Response()

