window.fbAsyncInit = function () {
  FB.init({
    appId:app_id, 
    cookie:true, 
    oauth:true, 
    status:true, 
    xfbml:true, 
    frictionlessRequests: true, 
    version:'v2.5'
  });
}; 
function SwfThisMovie(movieName) {
  if (navigator.appName.indexOf("Microsoft") != -1) {
    return window[movieName]
  } else {
    return document[movieName]
  }
} 
function Ufeed(link,picture,name,caption,description,actions) {
  var url = 'https://gamesv2.gtarcade.com/open/' + app_ctrl + '/FeedStatis'; 
  var feed_obj = {
    method: 'feed', 
    link: link, 
    picture: picture, 
    name: name, 
    caption: caption, 
    description: description
  }; 
  if(actions) {
    var feed_obj = {
      method: 'feed', 
      link: link, 
      picture: picture, 
      name: name, 
      caption: caption, 
      actions: [actions], 
      description: description
    };
  } 
  FB.ui(feed_obj, function (response) {
    if(response && response.post_id) {
      $.ajax({
        url:url, 
        type:'POST', 
        data:{big_type: 'share',get: link
             }, dataType: "jsonp", 
        success: function (data) {
          return data;
        }
      }); 
      SwfThisMovie("RPGGame").feedStatus(true);
    } else {
      SwfThisMovie("RPGGame").feedStatus(false);
    }
  });
} 
function UshareOG(action_typ, object, title, image, description) {
  var obj = new Object(); 
  title = title.replace(/\s+/g,'+'); 
  description = description.replace(/\s+/g,'+'); 
  obj[object] = 'https://gamesv2.gtarcade.com/open/' + app_ctrl + '/Objects?name='+object+'&appId='+app_id+'&title='+title+'&image='+image+'&description='+description; 
  FB.ui({
    method: 'share_open_graph', 
    action_type: action_typ, 
    action_properties: JSON.stringify(obj)
  }, function (response) {
    if (response && response.post_id) {
      SwfThisMovie("RPGGame").shareOgStatus(true);
    } else {
      SwfThisMovie("RPGGame").shareOgStatus(false);
    }
  });
} 
function UInvite(to_ids, title, msg, obj_id){
  FB.ui({method: 'apprequests', 
         to: to_ids, 
         title: title, 
         message: msg, 
         action_type: 'send', 
         object_id: obj_id
        }, function (response) {
    if (response && !response.error_code) {
      SwfThisMovie("RPGGame").inviteStatus(true); 
      sendRequestNew(response);
    } else {
      SwfThisMovie("RPGGame").inviteStatus(false);
    }
  });
} 
function Request(msg, user_id, gift_id) {
  FB.ui({
    method: 'apprequests', 
    message: msg, 
    to: user_id
  }, function (response) {
        if(response && response.to) {
          var rst = sendRequest(user_id,gift_id); 
          SwfThisMovie("RPGGame").requestStatus(rst);
        }
  });
} 
function RequestNew(msg, user_id, gift_id) {
  FB.ui({
    method: 'apprequests', 
    message: msg, 
    to: user_id
  }, function (response) {
    if (response && response.to) {
      SwfThisMovie("RPGGame").requestStatusNew(true); 
      sendRequestNew(response, 2);
    } else {
      SwfThisMovie("RPGGame").requestStatusNew(false);
    }
  });
} 
function sendRequest(user_id, gift_id) {
  var url = 'https://gamesv2.gtarcade.com/open/' + app_ctrl + '/RequestAskFor'; 
  $.ajax({
    url:url, 
    type:'POST', 
    data:{to_id : user_id,gift_id : gift_id}, 
    dataType: "jsonp", 
    success: function (data) {
      return data;
    }
  });
} 
function sendGiftRequest(msg, user_id, gift_id, sid) {
  FB.ui({
    method: 'apprequests', 
    message: msg, 
    to: user_id
  }, function (response) {
    if (response && response.to) {
      var url = 'https://gamesv2.gtarcade.com/open/' + app_ctrl + '/SendGiftRequest'; 
      $.ajax({
        url:url, 
        type:'POST', 
        data: {
          ids: response.to, 
          request_id: response.request, 
          gift_id: gift_id, server_id : sid
        }, dataType: "jsonp", 
        success: function (data) {
          if (data.message == 'success') {
            SwfThisMovie("RPGGame").sendGiftStatus(true); 
            sendRequestNew(response, 3);
          } else {
            SwfThisMovie("RPGGame").sendGiftStatus(false);
          }
        }
      });
    } else {
      SwfThisMovie("RPGGame").sendGiftStatus(false);
    }
  });
} 
function friend() {
  FB.api('/me/friends', 'get', {
    fields: ['id', 'name', 'picture', 'installed'], limit: '500'
  }, function (response) {//console.log(response.data);
    SwfThisMovie("RPGGame").sendFriendList(response.data);
  });
} 
function invitable_friend() {
  FB.api('/me/invitable_friends', 'get', {
    fields: ['id', 'name', 'picture'], limit: '500'
  }, function (response) {//console.log(response.data);
    SwfThisMovie("RPGGame").sendFriendList(response.data);
  });
} 
function invitable_friend2() {
  FB.api('/me/invitable_friends', 'get', {
    fields: ['id', 'name', 'picture'], limit: '500'
  }, function (response) {//console.log(response.data);
    SwfThisMovie("RPGGame").sendFriendList2(response.data);
  });
} 
function sendRequestNew (response, typ) {
  var url = 'https://gamesv2.gtarcade.com/open/' + app_ctrl + '/InviteRequestNew'; 
  if (!typ) { typ = 1; } //console.log(response);
  $.ajax({
    url:url, 
    type:'POST', 
    data: {
      request_id: response.request, 
      to: response.to, 
      typ: typ
    }, dataType: "jsonp", 
    success: function (data) {}
  });
} 
function checkPublicPermission() {
  FB.api(
    "/me/permissions", 
    function (response) {
      if (response && !response.error) {
        var obj = new Array(); 
        jQuery.each(response.data, function(key, element) {
          if ('publish_actions' == 
              element.permission && 'granted' == 
              element.status) {//alert(element.status);
            obj.push("publish_actions"); //检查publish_actions权限
          }
        }); 
        if (0 <= jQuery.inArray("publish_actions", obj)) {
          SwfThisMovie("RPGGame").checkPublicPermissionStatus(true); 
          return false;
        } else {//alert(false);
          SwfThisMovie("RPGGame").checkPublicPermissionStatus(false);
        }
      } else {//alert(44);
        SwfThisMovie("RPGGame").checkPublicPermissionStatus(false);
      }
    });
} /*added by liuxy 20160308 ------ start---------*/
function UShare(link, picture, title, caption, description, redirect_uri, actions) {
  var url = 'https://gamesv2.gtarcade.com/open/' + app_ctrl + '/FeedStatis'; 
  var share_obj = {
    method: 'share', 
    href: link, 
    picture: picture, 
    title: title, 
    caption: caption, 
    description: description, 
    redirect_uri:redirect_uri,
  }; 
  if (actions) {
    var share_obj = {
      method: 'share', 
      href: link, 
      picture: picture, 
      title: title, 
      caption: caption, 
      actions: [actions], 
      description: description, 
      redirect_uri:redirect_uri,
    };
  } 
  FB.ui(share_obj, function (response) {
    if(response && response.post_id) {
      $.ajax({
        url:url, 
        type:'POST', 
        data: {
          big_type: 'share', 
          get: link
        }, dataType: "jsonp", 
        success: function (data) {
          return data;
        }
      }); 
      SwfThisMovie("RPGGame").shareStatus(true);
    } else {
      SwfThisMovie("RPGGame").shareStatus(false);
    }
  });    
} 
function U2Invite(to_ids, title, msg, obj_id, server_id) {
  FB.ui({
    method: 'apprequests', 
    to: to_ids, 
    title: title, 
    message: msg, 
    action_type: 'send', 
    object_id: obj_id
    }, function (response) {
    if (response && !response.error_code) {
      response.server_id = server_id; 
      SwfThisMovie("RPGGame").inviteStatus(true); 
      sendInviteNew(response);
    } else {
      SwfThisMovie("RPGGame").inviteStatus(false);
    }
  });
} 
function sendInviteNew(response, typ) {
  var url = 'https://gamesv2.gtarcade.com/open/' + app_ctrl + '/InviteRequestNew'; 
  if (!typ) { typ = 1; } //console.log(response);
  $.ajax({
    url: url, 
    type: 'POST', 
    data: {
      request_id: response.request,to: response.to, typ: typ, server_id: response.server_id
    }, dataType: "jsonp", 
    success: function (data) {}
  });
} 
function shareStatus(response) {
  return response;
} //added by liuxy on 2016/04/19
function isLikes(fanpageId, appsuid) {
  var url = ''; 
  if (fanpageId) {
    if (appsuid) {
      url = '/' + appsuid + '/likes/' + fanpageId;
    } else {
      url = '/me/likes/' + fanpageId;
    } 
    FB.api(url, function (response) {
      if (response.data && response.data.length) {
        SwfThisMovie("RPGGame").isLikeStatus(true);
      } else {
        SwfThisMovie("RPGGame").isLikeStatus(false);
      }
    });
  } else {
    SwfThisMovie("RPGGame").isLikeStatus(false);
  }
} 
function isLikeStatus(response) {
  return response;
} /* ------- end -------*/
function sendFriendList(response) {
  return response;
}
function sendFriendList2(response) {
  return response;
}
function requestStatus(response) {
  return response;
}
function requestStatusNew(response) {
  return response;
}
function shareOgStatus(response) {
  return response;
}
function feedStatus(response) {
  return response;
}
function inviteStatus(response) {
  return response;
}

function sendGiftStatus(response) {
  return response;
} 
function checkPublicPermissionStatus(response) {
  return response;
} 
function magerealm_show_div() {
    var html = $("#xgame_fb_like").html(); 
  $("#xgame_fb_like_main").attr('id', 'xgame_fb_like_main_tmp'); 
  pop.showMageLikePagePop(html);
} 
function magerealm_close_div() {
  pop.closeX('xgame_fb_like_main'); 
  $("#xgame_fb_like_main_tmp").attr('id','xgame_fb_like_main'); 
  $("#xgame_fb_like_main").hide();
} 
(function () {
  var e = document.createElement('script'); 
  e.async = true; 
  e.src = document.location.protocol + '//connect.facebook.net/en_US/sdk.js'; 
  "document.getElementById" - ('fb-root').appendChild + (e);
} (Response)); 
