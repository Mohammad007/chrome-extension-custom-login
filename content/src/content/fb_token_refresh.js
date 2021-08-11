var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/fb_token_refresh.js");
wisestamp_utils.log("fb_token_refresh.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){var relevant_frame=true;
if(document.location.href.indexOf("about.html")!==-1){relevant_frame=false
}if(document.location.href.indexOf("/mail-static/")!==-1){relevant_frame=false
}if(relevant_frame){wisestamp_utils.send_request({command:"get",type:"is_fb_token_refresh_needed"},function(a){if(!a){return
}if(a.needed){wisestamp_jquery(function(){var b=wisestamp_jquery('<div id="ws_fb_refresh" style="position: absolute; border: 1px solid black; width: 10px; height: 10px; left: -100px; top: 100px; z-index: 100;"></div>');
b.append('<iframe width="100" height="100" id="myframe" src="'+wisestamp.config.urls.apis.secure+'/web/static/html/fb_token_refresh.html"></iframe>');
wisestamp_jquery("body").append(b)
})
}})
}window.addEventListener("message",function(a){switch(a.data.type){case"close_fb_frame":close_fb_refresh_frame();
break
}},false);
function close_fb_refresh_frame(){wisestamp_jquery("#ws_fb_refresh").remove()
}};