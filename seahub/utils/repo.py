# Copyright (c) 2012-2016 Seafile Ltd.
# -*- coding: utf-8 -*-
import logging

import seaserv
from seaserv import seafile_api

from seahub.utils import EMPTY_SHA1, is_org_context
from seahub.settings import ENABLE_FOLDER_PERM

logger = logging.getLogger(__name__)

def list_dir_by_path(cmmt, path):
    if cmmt.root_id == EMPTY_SHA1:
        return []
    else:
        dirs = seafile_api.list_dir_by_commit_and_path(cmmt.repo_id, cmmt.id, path)
        return dirs if dirs else []

def get_sub_repo_abbrev_origin_path(repo_name, origin_path):
    """Return abbrev path for sub repo based on `repo_name` and `origin_path`.

    Arguments:
    - `repo_id`:
    - `origin_path`:
    """
    if len(origin_path) > 20:
        abbrev_path = origin_path[-20:]
        return repo_name + '/...' + abbrev_path
    else:
        return repo_name + origin_path

def get_repo_owner(request, repo_id):
    if is_org_context(request):
        return seafile_api.get_org_repo_owner(repo_id)
    else:
        return seafile_api.get_repo_owner(repo_id)

def get_repo_shared_users(repo_id, repo_owner, include_groups=True):
    """Return a list contains users and group users. Repo owner is ommited.
    """
    ret = []
    users = seafile_api.list_repo_shared_to(repo_owner, repo_id)
    ret += [x.user for x in users]
    if include_groups:
        for e in seafile_api.list_repo_shared_group_by_user(repo_owner, repo_id):
            g_members = seaserv.get_group_members(e.group_id)
            ret += [x.user_name for x in g_members if x.user_name != repo_owner]

    return list(set(ret))

def get_library_storages(request):
    """ Return all storages info.

    1. If not enable user role feature OR
       haven't configured `storage_ids` option in user role setting:

       Return storage info getted from seafile_api.
       And always put the default storage as the first item in the returned list.

    2. If have configured `storage_ids` option in user role setting:

       Only return storage info in `storage_ids`.
       Filter out the wrong stotage id(s).
       Not change the order of the `storage_ids` list.
    """

    all_storages = []
    for storage in seafile_api.get_all_storage_classes():
        storage_info = {
            'storage_id': storage.storage_id,
            'storage_name': storage.storage_name,
            'is_default': storage.is_default,
        }
        if storage.is_default:
            all_storages.insert(0, storage_info)
        else:
            all_storages.append(storage_info)

    user_role_storage_ids = request.user.permissions.storage_ids()
    if not user_role_storage_ids:
        return all_storages

    user_role_storages = []
    for user_role_storage_id in user_role_storage_ids:
        for storage in all_storages:
            if storage['storage_id'] == user_role_storage_id:
                user_role_storages.append(storage)
                continue

    return user_role_storages

def can_set_folder_perm_by_user(username, repo, repo_owner):
    """ user can get/update/add/delete folder perm feature must comply with the following
            setting: ENABLE_FOLDER_PERM
            repo:repo is not virtual
            permission: is admin or repo owner.
    """
    if not ENABLE_FOLDER_PERM:
        return False
    if repo.is_virtual:
        return False
    is_admin = is_repo_admin(username, repo.id)
    if username != repo_owner and not is_admin:
        return False
    return True

# TODO
from seahub.share.utils import is_repo_admin
