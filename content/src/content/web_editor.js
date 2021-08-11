var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/web_editor.js");
wisestamp_utils.log("web_editor.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){wisestamp_jquery(function(){wisestamp_jquery(".extension-notice").remove();
var a={command:"load_param",param:["from_gallery","save_button_clicked"]};
wisestamp_utils.send_request(a,function(c){if(!c){return
}if(!(c.from_gallery&&c.save_button_clicked)){wisestamp_jquery("body").prepend('<div class="extension-from-gallery" style="display: none;"></div>')
}var b=false;
if(c.from_gallery){if(c.save_button_clicked){b=true
}}else{b=true
}if(b){wisestamp_jquery(".no-extension").remove();
wisestamp_jquery(".extension-present").show()
}ackExtensionToFront()
});
get_legacy_sigs()
});
window.addEventListener("message",function(d){try{if(d.source.document.location.href!==window.document.location.href){return
}if(d.data&&d.data.type){switch(d.data.type){case"CHECK_FOR_EXT":ackExtensionToFront();
break;
case"FROM_PAGE":var c={command:"update_data"};
if(d.data.initiator==="save_button"){c.save_button=true
}if(d.data.initiator==="logout"){c.logout=true
}wisestamp_utils.send_request(c,function(e){if(d.data.initiator==="login"){document.location.reload()
}});
break;
case"updateAndRedirect":var c={command:"update_data"};
wisestamp_utils.send_request(c,function(e){document.location.href=d.data.url
});
break;
case"FB_LOGIN":var b=wisestamp_jquery("#only-facebook-login-wisestamp-uid");
var a=b.attr("data-wisestamp-uid");
var c={command:"log_in"};
c.wisestamp_uid=a;
wisestamp_utils.send_request(c,function(e){});
break;
case"G_LOGIN":var b=wisestamp_jquery("#only-google-login-wisestamp-uid");
var a=b.attr("data-wisestamp-uid");
var c={command:"log_in"};
c.wisestamp_uid=a;
wisestamp_utils.send_request(c,function(e){});
break
}}}catch(f){}},false);
function get_legacy_sigs(a,b){if(document.location.href.match(/.*wisestamp.*restore$/gi)){wisestamp_utils.send_request({command:"get",type:"legacy_sigs"},function(c){parent.postMessage({type:"render_sigs",sigs:c},"*")
})
}}}function ackExtensionToFront(){console.log("============ acking ext");
top.postMessage({type:"FROM_CONTENT",initiator:"extension"},"*")
};