

(function (globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function (n) {
    var v=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<12 || n%100>14) ? 1 : n%10==0 || (n%10>=5 && n%10<=9) || (n%100>=11 && n%100<=14)? 2 : 3);
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  
  /* gettext library */

  django.catalog = {
    "%curr% of %total%": "%curr% \u0438\u0437 %total%", 
    "<a href=\"%url%\" target=\"_blank\">The image</a> could not be loaded.": "<a href=\"%url%\" target=\"_blank\">\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435</a> \u043d\u0435 \u0431\u044b\u043b\u043e \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u043e.", 
    "Are you sure you want to delete these selected items?": "\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0435 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u044b?", 
    "Cancel": "\u041e\u0442\u043c\u0435\u043d\u0430", 
    "Canceled.": "\u041e\u0442\u043c\u0435\u043d\u0435\u043d\u043e.", 
    "Close (Esc)": "\u0417\u0430\u043a\u0440\u044b\u0442\u044c (Esc)", 
    "Copy {placeholder} to:": "\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c {placeholder} \u0432:", 
    "Copying %(name)s": "\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 %(name)s", 
    "Copying file %(index)s of %(total)s": "\u041a\u043e\u043f\u0438\u0440\u0443\u0435\u0442\u0441\u044f \u0444\u0430\u0439\u043b %(index)s \u0438\u0437 %(total)s", 
    "Delete": "\u0423\u0434\u0430\u043b\u0438\u0442\u044c", 
    "Delete Items": "\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u043e\u0432", 
    "Delete succeeded.": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0443\u0434\u0430\u043b\u0435\u043d\u043e.", 
    "Empty file upload result": "\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u043f\u0443\u0441\u0442\u043e\u0433\u043e \u0444\u0430\u0439\u043b\u0430", 
    "Error": "\u041e\u0448\u0438\u0431\u043a\u0430", 
    "Failed to copy %(name)s": "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c %(name)s", 
    "Failed to delete %(name)s and %(amount)s other items.": "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0443\u0434\u0430\u043b\u0438\u0442\u044c %(name)s \u0438 \u0435\u0449\u0435 %(amount)s \u0434\u0440\u0443\u0433\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432.", 
    "Failed to delete %(name)s and 1 other item.": "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0443\u0434\u0430\u043b\u0438\u0442\u044c %(name)s \u0438 \u0435\u0449\u0435 1 \u043e\u0431\u044a\u0435\u043a\u0442.", 
    "Failed to delete %(name)s.": "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0443\u0434\u0430\u043b\u0438\u0442\u044c %(name)s.", 
    "Failed to get update url": "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443 \u0434\u043b\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438", 
    "Failed to get upload url": "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443 \u0434\u043b\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438", 
    "Failed to move %(name)s": "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u0435\u0440\u0435\u043c\u0435\u0441\u0442\u0438\u0442\u044c %(name)s", 
    "Failed to send to {placeholder}": "\u041e\u0448\u0438\u0431\u043a\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438 \u0432 {placeholder}", 
    "Failed to share to {placeholder}": "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043e\u0431\u0449\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f {placeholder}", 
    "Failed.": "\u041d\u0435 \u0443\u0434\u0430\u0447\u043d\u043e.", 
    "Failed. Please check the network.": "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u0435\u0442\u044c.", 
    "File Upload canceled": "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0444\u0430\u0439\u043b\u0430 \u043e\u0442\u043c\u0435\u043d\u0435\u043d\u0430", 
    "File Upload complete": "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0444\u0430\u0439\u043b\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0430", 
    "File Upload failed": "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0444\u0430\u0439\u043b", 
    "File Uploading...": "\u0424\u0430\u0439\u043b \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044f...", 
    "File is too big": "\u0424\u0430\u0439\u043b \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u043e\u0439", 
    "File is too small": "\u0424\u0430\u0439\u043b \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0438\u0439", 
    "Filetype not allowed": "\u0422\u0438\u043f \u0444\u0430\u0439\u043b\u0430 \u043d\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043d", 
    "Internal error. Failed to copy %(name)s and %(amount)s other item(s).": "\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u044f\u044f \u043e\u0448\u0438\u0431\u043a\u0430. \u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c %(name)s \u0438 \u0435\u0449\u0435 %(amount)s \u0434\u0440\u0443\u0433\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432.", 
    "Internal error. Failed to copy %(name)s.": "\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u044f\u044f \u043e\u0448\u0438\u0431\u043a\u0430. \u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c %(name)s.", 
    "Internal error. Failed to move %(name)s and %(amount)s other item(s).": "\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u044f\u044f \u043e\u0448\u0438\u0431\u043a\u0430. \u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u0435\u0440\u0435\u043c\u0435\u0441\u0442\u0438\u0442\u044c %(name)s \u0438 \u0435\u0449\u0435 %(amount)s \u0434\u0440\u0443\u0433\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432.", 
    "Internal error. Failed to move %(name)s.": "\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u044f\u044f \u043e\u0448\u0438\u0431\u043a\u0430. \u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u0435\u0440\u0435\u043c\u0435\u0441\u0442\u0438\u0442\u044c %(name)s.", 
    "Invalid destination path": "\u041f\u0443\u0442\u044c \u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u0443\u043a\u0430\u0437\u0430\u043d \u043d\u0435\u0432\u0435\u0440\u043d\u043e", 
    "It is required.": "\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0435.", 
    "Just now": "\u041f\u0440\u044f\u043c\u043e \u0441\u0435\u0439\u0447\u0430\u0441", 
    "Loading...": "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...", 
    "Max number of files exceeded": "\u041f\u0440\u0435\u0432\u044b\u0448\u0435\u043d\u0438\u0435 \u043c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0447\u0438\u0441\u043b\u0430 \u0444\u0430\u0439\u043b\u043e\u0432", 
    "Move {placeholder} to:": "\u041f\u0435\u0440\u0435\u043c\u0435\u0441\u0442\u0438\u0442\u044c {placeholder} \u0432:", 
    "Moving %(name)s": "\u041f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u0435 %(name)s", 
    "Moving file %(index)s of %(total)s": "\u041f\u0435\u0440\u0435\u043c\u0435\u0449\u0430\u0435\u0442\u0441\u044f \u0444\u0430\u0439\u043b %(index)s \u0438\u0437 %(total)s", 
    "Name is required": "\u0418\u043c\u044f \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e", 
    "Next (Right arrow key)": "\u0412\u043f\u0435\u0440\u0451\u0434 (\u2192)", 
    "Only an extension there, please input a name.": "\u0417\u0434\u0435\u0441\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043d\u0438\u0435, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435.", 
    "Open in New Tab": "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432 \u043d\u043e\u0432\u043e\u0439 \u0432\u043a\u043b\u0430\u0434\u043a\u0435", 
    "Password is required.": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u043f\u0430\u0440\u043e\u043b\u044c.", 
    "Password is too short": "\u041f\u0430\u0440\u043e\u043b\u044c \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043a\u043e\u0440\u043e\u0442\u043a\u0438\u0439", 
    "Passwords don't match": "\u041f\u0430\u0440\u043e\u043b\u0438 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442", 
    "Permission error": "\u041e\u0448\u0438\u0431\u043a\u0430 \u0434\u043e\u0441\u0442\u0443\u043f\u0430", 
    "Please check the network.": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u0435\u0442\u044c.", 
    "Please choose a directory": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u0430\u0442\u0430\u043b\u043e\u0433", 
    "Please enter days.": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0435\u043d\u044c.", 
    "Please enter password": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c", 
    "Please enter the password again": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c \u0435\u0449\u0451 \u0440\u0430\u0437", 
    "Please enter valid days": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u0434\u0435\u043d\u044c", 
    "Please input at least an email.": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e \u043a\u0440\u0430\u0439\u043d\u0435\u0439 \u043c\u0435\u0440\u0435, E-mail.", 
    "Please select a contact or a group.": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043a\u043e\u043d\u0442\u0430\u043a\u0442 \u0438\u043b\u0438 \u0433\u0440\u0443\u043f\u043f\u0443.", 
    "Previous (Left arrow key)": "\u041d\u0430\u0437\u0430\u0434 (\u2190)", 
    "Processing...": "\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430 ...", 
    "Really want to delete {lib_name}?": "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c {lib_name}?", 
    "Rename Directory": "\u041f\u0435\u0440\u0435\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u0442\u044c \u043a\u0430\u0442\u0430\u043b\u043e\u0433", 
    "Rename File": "\u041f\u0435\u0440\u0435\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u0442\u044c \u0444\u0430\u0439\u043b", 
    "Replace file {filename}?": "\u0417\u0430\u043c\u0435\u043d\u0438\u0442\u044c \u0444\u0430\u0439\u043b {filename}?", 
    "Saving...": "\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435...", 
    "Search users or enter emails": "\u041d\u0430\u0439\u0434\u0438\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f \u0438\u043b\u0438 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 email", 
    "Select groups": "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u0440\u0443\u043f\u043f\u0443", 
    "Set {placeholder}'s permission": "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u043f\u0440\u0430\u0432\u0430 \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u043a {placeholder} ", 
    "Share {placeholder}": "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043e\u0431\u0449\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f \u043a {placeholder}", 
    "Start": "\u041d\u0430\u0447\u0430\u0442\u044c", 
    "Success": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e", 
    "Successfully copied %(name)s and %(amount)s other items.": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d %(name)s \u0438 \u0435\u0449\u0435 %(amount)s \u0434\u0440\u0443\u0433\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432.", 
    "Successfully copied %(name)s and 1 other item.": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d %(name)s \u0438 \u0435\u0449\u0435 1 \u043e\u0431\u044a\u0435\u043a\u0442.", 
    "Successfully copied %(name)s.": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d %(name)s.", 
    "Successfully deleted %(name)s": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0443\u0434\u0430\u043b\u0435\u043d %(name)s", 
    "Successfully deleted %(name)s and %(amount)s other items.": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0443\u0434\u0430\u043b\u0435\u043d %(name)s \u0438 \u0435\u0449\u0435 %(amount)s \u0434\u0440\u0443\u0433\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432.", 
    "Successfully deleted %(name)s and 1 other item.": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0435\u043c\u0435\u0449\u0435\u043d %(name)s \u0438 \u0435\u0449\u0435 1 \u043e\u0431\u044a\u0435\u043a\u0442.", 
    "Successfully deleted %(name)s.": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0443\u0434\u0430\u043b\u0435\u043d %(name)s.", 
    "Successfully moved %(name)s and %(amount)s other items.": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0435\u043c\u0435\u0449\u0435\u043d %(name)s \u0438 \u0435\u0449\u0435 %(amount)s \u0434\u0440\u0443\u0433\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432.", 
    "Successfully moved %(name)s and 1 other item.": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0435\u043c\u0435\u0449\u0435\u043d %(name)s \u0438 \u0435\u0449\u0435 1 \u043e\u0431\u044a\u0435\u043a\u0442.", 
    "Successfully moved %(name)s.": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d %(name)s.", 
    "Successfully sent to {placeholder}": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u0432 {placeholder}", 
    "Successfully shared to {placeholder}": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u043e\u0442\u043a\u0440\u044b\u0442 \u0434\u043e\u0441\u0442\u0443\u043f \u043a {placeholder}", 
    "Successfully unshared {placeholder}": "\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0437\u0430\u043a\u0440\u044b\u0442 \u0434\u043e\u0441\u0442\u0443\u043f \u043a {placeholder}", 
    "Successfully unstared {placeholder}": "\u041e\u0442\u043c\u0435\u0442\u043a\u0430 \u0441\u043d\u044f\u0442\u0430 \u0441 {placeholder}", 
    "Uploaded bytes exceed file size": "\u041f\u0440\u0435\u0432\u044b\u0448\u0435\u043d\u0438\u0435 \u043b\u0438\u043c\u0438\u0442\u0430 \u0440\u0430\u0437\u043c\u0435\u0440\u0430 \u0444\u0430\u0439\u043b\u0430", 
    "You don't have any library at present.": "\u0412\u044b \u043f\u043e\u043a\u0430 \u043d\u0435 \u043e\u0442\u043c\u0435\u0442\u0438\u043b\u0438 \u043d\u0438 \u043e\u0434\u043d\u043e\u0433\u043e \u0444\u0430\u0439\u043b\u0430", 
    "You have not renamed it.": "\u0412\u044b \u043d\u0435 \u043f\u0435\u0440\u0435\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043b\u0438 \u0435\u0433\u043e.", 
    "canceled": "\u043e\u0442\u043c\u0435\u043d\u0435\u043d\u043e", 
    "uploaded": "\u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u043e"
  };

  django.gettext = function (msgid) {
    var value = django.catalog[msgid];
    if (typeof(value) == 'undefined') {
      return msgid;
    } else {
      return (typeof(value) == 'string') ? value : value[0];
    }
  };

  django.ngettext = function (singular, plural, count) {
    var value = django.catalog[singular];
    if (typeof(value) == 'undefined') {
      return (count == 1) ? singular : plural;
    } else {
      return value[django.pluralidx(count)];
    }
  };

  django.gettext_noop = function (msgid) { return msgid; };

  django.pgettext = function (context, msgid) {
    var value = django.gettext(context + '\x04' + msgid);
    if (value.indexOf('\x04') != -1) {
      value = msgid;
    }
    return value;
  };

  django.npgettext = function (context, singular, plural, count) {
    var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
    if (value.indexOf('\x04') != -1) {
      value = django.ngettext(singular, plural, count);
    }
    return value;
  };
  

  django.interpolate = function (fmt, obj, named) {
    if (named) {
      return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
    } else {
      return fmt.replace(/%s/g, function(match){return String(obj.shift())});
    }
  };


  /* formatting library */

  django.formats = {
    "DATETIME_FORMAT": "j E Y \u0433. G:i:s", 
    "DATETIME_INPUT_FORMATS": [
      "%d.%m.%Y %H:%M:%S", 
      "%d.%m.%Y %H:%M", 
      "%d.%m.%Y", 
      "%d.%m.%y %H:%M:%S", 
      "%d.%m.%y %H:%M", 
      "%d.%m.%y", 
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d"
    ], 
    "DATE_FORMAT": "j E Y \u0433.", 
    "DATE_INPUT_FORMATS": [
      "%d.%m.%Y", 
      "%d.%m.%y", 
      "%Y-%m-%d"
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "1", 
    "MONTH_DAY_FORMAT": "j F", 
    "NUMBER_GROUPING": "3", 
    "SHORT_DATETIME_FORMAT": "d.m.Y H:i", 
    "SHORT_DATE_FORMAT": "d.m.Y", 
    "THOUSAND_SEPARATOR": "\u00a0", 
    "TIME_FORMAT": "G:i:s", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H:%M"
    ], 
    "YEAR_MONTH_FORMAT": "F Y \u0433."
  };

  django.get_format = function (format_type) {
    var value = django.formats[format_type];
    if (typeof(value) == 'undefined') {
      return format_type;
    } else {
      return value;
    }
  };

  /* add to global namespace */
  globals.pluralidx = django.pluralidx;
  globals.gettext = django.gettext;
  globals.ngettext = django.ngettext;
  globals.gettext_noop = django.gettext_noop;
  globals.pgettext = django.pgettext;
  globals.npgettext = django.npgettext;
  globals.interpolate = django.interpolate;
  globals.get_format = django.get_format;

}(this));

