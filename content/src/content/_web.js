var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/_web.js");
wisestamp_utils.log("_web.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){wisestamp_utils.log("[wisestamp_content_web] >>>>>");
var wisestamp_content_web=function(){this.m_thread_timeout=500;
this.m_control_layer=null;
this.m_control_toolbar=null;
this.m_session_id=0;
this.rand=Math.floor((Math.random()*900000000000000)+100000000000000);
this.m_update_details={};
this.found={};
this.check_action_conduit_setup_compose=500;
this.wisestamp_uid=false;
this.enabled=true;
var b=this;
this.message_function=function(c){if(typeof WS_MSG_FUNC==="undefined"){return null
}return WS_MSG_FUNC
};
this.send_request=function(c,d){wisestamp_utils.send_request(c,d)
};
this.init=function(){wisestamp_utils.log("[wisestamp_content_web::init] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
a.init();
if(window==top){var c=wisestamp_jquery("html > head #wisestamp-css-element");
if(c.length===0){wisestamp_jquery("html > head").append('<link id="wisestamp-css-element" href="'+wisestamp_utils.get_url("content/css/web.css",true)+'" rel="stylesheet" type="text/css">')
}if(!(b.m_top_menu_enabled)){wisestamp_utils.setTimeout(function(){b.after_add_top_menu()
},0)
}}if(b.m_init_conduit){return b.init_conduit()
}if(window==top){b.setup_wisestamp()
}};
this.init_conduit=function(){wisestamp_utils.log("[wisestamp_content_web::init_conduit] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
if(window!=top){return
}b.setup_wisestamp();
try{wisestamp_utils.log("[wisestamp_content_web::init_conduit] calling try_setup_wisestamp_compose");
b.try_setup_wisestamp_compose();
wisestamp_utils.log("[wisestamp_content_web::init_conduit] done calling try_setup_wisestamp_compose")
}catch(d){wisestamp_utils.log("[wisestamp_content_web::init_conduit] try_setup_wisestamp_compose exception")
}var c="";
b.checkAction=function(){wisestamp_utils.setTimeout(b.checkAction,500);
if(!((document.location.hash===c)&&(!(b.new_frames_found())))){wisestamp_utils.log("[wisestamp_content_web::init_conduit] hash or iframes changed");
c=document.location.hash;
wisestamp_utils.setTimeout(b.conduit_setup_compose,b.check_action_conduit_setup_compose)
}if((b.m_wisestamp_personal_promo_enabled)||(b.m_wisestamp_personal_signature_enabled)){b.update_all_promos()
}};
b.checkAction()
};
this.handle_dom_inserted=function(e,d){var c;
if(e.main&&e.main.selector){c=wisestamp_ui.is_dom_inserted(d,e.main.selector);
if(c){if(typeof e.editor.callback!="function"){b.setup_wisestamp()
}else{e.editor.callback(c)
}b.found.main=true
}}if(e.editor&&e.editor.selector){c=wisestamp_ui.is_dom_inserted(d,e.editor.selector);
if(c){if(typeof e.editor.callback!="function"){c.addEventListener("load",function(f){wisestamp_utils.setTimeout(function(){var g=wisestamp_ui.get_iframe_document(c);
if(g){b.m_current_editor_body=wisestamp_jquery(g.body);
b.setup_wisestamp_compose(b.m_current_editor_body,b.should_insert_signature())
}},b.m_delay_after_load)
},true)
}else{e.editor.callback(c)
}}}};
this.listen=function(e){function g(i,h){if(i.readyState=="complete"){if(i.addEventListener&&e.editor.reply_indicator){i.addEventListener("DOMNodeInserted",function(k){if(e.editor&&e.editor.reply_indicator&&e.editor.reply_indicator.test(k.target.innerHTML)){var j=wisestamp_jquery(k.currentTarget.body);
h.reply(j);
i.removeEventListener("DOMNodeInserted",arguments.callee)
}},false)
}h.compose(i)
}}function d(m,k,h){if(e.editor&&e.editor.selector){var l;
if(e.editor.selector.id){l=document.getElementById(e.editor.selector.id)
}else{if(e.editor.selector.name){l=wisestamp_utils.prop_by_path(document.getElementsByName(e.editor.selector.name),"0")
}else{if(e.editor.selector.className){var n=document.getElementsByClassName(e.editor.selector.className);
for(var j=0;
j<n.length;
j++){if(n[j].nodeName=="IFRAME"){l=n[j];
break
}}}}}if(wisestamp_utils.is_empty(l)){return false
}var o=wisestamp_ui.get_iframe_document(l);
g(o,{reply:function(i){b.remove_wisestamp_compose(i);
b.setup_wisestamp_compose(i)
},compose:function(i){b.on_iframe_loaded()
}})
}}wisestamp_utils.log("[wisestamp_content_web::listen] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
if(e.editor&&e.editor.location&&wisestamp_utils.wildcard_to_regex(e.editor.location).test(document.location.href)){var f=null;
function c(){switch(wisestamp.sys.platform){case"firefox":case"chrome":case"safari":if(/loaded|complete/.test(document.readyState)){wisestamp_utils.send_request({command:"setup_compose"});
clearInterval(f)
}break
}}if(wisestamp.sys.platform==="safari"){f=window.setInterval(c,50)
}else{document.addEventListener("readystatechange",c,false)
}}else{switch(wisestamp.sys.platform){case"safari":safari.self.addEventListener("message",function(h){if(h.name=="assign compose events"){d()
}},false);
break;
case"firefox":case"chrome":chrome.runtime.onMessage.addListener(d);
break
}document.addEventListener("readystatechange",function(){if(document.readyState=="complete"&&document.body){b.handle_dom_inserted(e,document.body)
}},false);
if(window.addEventListener){window.addEventListener("DOMNodeInserted",function(h){if(b.found.editor){if(e.main.selector){if(b.found.main){window.removeEventListener("DOMNodeInserted",arguments.callee)
}}else{window.removeEventListener("DOMNodeInserted",arguments.callee)
}}b.handle_dom_inserted(e,h.target)
},false)
}}};
this.setup_wisestamp=function(){wisestamp_utils.log("[wisestamp_content_web::setup_wisestamp] >>>>>");
a.m_wisestamp_ui=wisestamp_ui;
a.setup_wisestamp();
var c=wisestamp_jquery("html > head #wisestamp-lato-font-element");
if(c.length===0){wisestamp_jquery("html > head").append('<link id="wisestamp-lato-font-element" href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" type="text/css">')
}return true
};
this.insert_signature=function(e,d,c){if(e==="None"){e="0"
}wisestamp_utils.log("[wisestamp_content_web::insert_signature] >>>>>");
a.m_wisestamp_ui=wisestamp_ui;
a.insert_signature(e,d,c)
};
this.setup_wisestamp_compose=function(e,d){if(typeof d==="undefined"){d=true
}var c=b.is_wisestamped(e);
wisestamp_utils.log("[wisestamp_content_web::setup_wisestamp_compose] wisestamped="+c+", b_insert_signature="+d);
if(c){wisestamp_utils.log("[wisestamp_content_web::setup_wisestamp_compose] wisestamped <<<<<");
return
}b.set_wisestamped(e,true);
a.setup_wisestamp_compose(e,d)
};
this.is_wisestamped=function(d){var c=d[0].getAttribute("wisestamped")==="true";
wisestamp_utils.log("[wisestamp_content_web::is_wisestamped] wisestamped="+c);
return c
};
this.set_wisestamped=function(c,d){wisestamp_utils.log("[wisestamp_content_web::set_wisestamped] wisestamped="+d);
if((c.length===1)&&(typeof(c.attr("data-wisestamp-editor-id"))==="undefined")){c.attr("data-wisestamp-editor-id",Math.floor((Math.random()*900000000000000)+100000000000000))
}c[0].setAttribute("wisestamped",d?"true":"false");
if(!d){c.removeAttr("data-space-before-signature")
}};
this.add_menu_separator=function(c){c.append(wisestamp_menu.create_menu_separator(false))
};
this.add_menu_bottom_div=function(c){c.append(wisestamp_menu.create_menu_bottom_div())
};
this.add_menu_bottom_triangle=function(c){c.append(wisestamp_menu.create_menu_bottom_triangle())
};
this.add_menu_left_triangle=function(c){c.append(wisestamp_menu.create_menu_left_triangle())
};
this.add_menu_top_triangle=function(c){c.append(wisestamp_menu.create_menu_top_triangle())
};
this.add_menu_bottom_disabled_triangle=function(c){c.append(wisestamp_menu.create_menu_bottom_disabled_triangle())
};
this.add_menu_left_disabled_triangle=function(c){c.append(wisestamp_menu.create_menu_left_disabled_triangle())
};
this.add_menu_top_disabled_triangle=function(c){c.append(wisestamp_menu.create_menu_top_disabled_triangle())
};
this.add_menu_item=function(d,c){d.append(wisestamp_menu.create_menu_item(c,false))
};
this.add_top_menu_top_triangle=function(c){c.append(b.create_top_menu_top_triangle())
};
this.create_top_menu_top_triangle=function(){var c;
c=wisestamp_jquery('<div class="wisestamp-top-menu-top-triangle"></div>');
c.css({width:"15px",height:"11px","background-image":'url("'+wisestamp_utils.get_url("content/img/toolbar-menu/top-pointer.png",true)+'")',"background-position":"center center","background-repeat":"no-repeat",position:"absolute",top:"-10px"});
if(b.m_top_menu_direction==="bottom-right"){c.css({left:"42px"})
}else{c.css({right:"42px"})
}return c[0]
};
this.add_top_menu_item=function(d,c){d.append(b.create_top_menu_item(c))
};
this.create_top_menu_item=function(e){var c,h;
if(e["upgrade-link"]===true){c=wisestamp_jquery('<li class="wisestamp-menu-item wisestamp-menu-item-upgrade"></li>')
}else{c=wisestamp_jquery('<li class="wisestamp-menu-list-item with-transition"></li>')
}var g=wisestamp_jquery('<div class="wisestamp-menu-list-item-inner"></div>');
if(e.imageURI&&(typeof(e.imageURI)==="string")){var f=wisestamp_jquery('<img class="wisestamp-menu-list-item-icon" src="'+e.imageURI+'">');
g.append(f)
}if(e.label){var d='<span class="wisestamp-menu-list-item-text '+((e["upgrade-link"]===true)?"with-scale with-transition":"")+'">'+e.label+"</span>";
g.append(d)
}h="click";
c.css({cursor:((typeof(e.command)==="function")?"pointer":"default")});
c.append(g);
if(typeof e.disabled==="boolean"){c.attr("disabled",e.disabled)
}if(typeof e.command==="function"){c.bind(h,e.command)
}if(typeof e.class_name==="string"){c.attr("class",e.class_name)
}if(typeof e.id==="string"){c.attr("id",e.id)
}return c[0]
};
this.get_wisestamp_top_menu=function(j,p,c){wisestamp_utils.log("[wisestamp_content_web::get_wisestamp_top_menu] >>>>>");
var i=p&&(b.m_upgrade_promo_notifications!=null&&b.m_upgrade_promo_notifications.length>0);
var r=wisestamp_jquery('<div id="wisestamp-toolbar-menu" class="wisestamp-main-menu"><img class="wisestamp-main-menu-close" src="'+wisestamp_utils.get_url("content/img/toolbar-menu/close.png",true)+'" /></div>',j);
r.find(".wisestamp-main-menu-close").click(function(){wisestamp_jquery("#wisestamp-toolbar-menu").remove()
});
var q=wisestamp_jquery('<div class="wisestamp-context-menu"></div>',j);
var g=wisestamp_jquery('<div class="wisestamp-context-menu-inner"></div>',j);
var w=wisestamp_jquery('<div class="wisestamp-top-menu-header-wrapper"></div>');
var k=wisestamp_jquery('<p class="wisestamp-top-menu-title">WiseStamp Signature</p>');
w.append(k);
if(c){var t=wisestamp_jquery('<div class="wisestamp-user-email"></div>');
var e=wisestamp_jquery('<div class="wisestamp-menu-inner-item-user-email-title">You are logged in as:</div><div class="wisestamp-menu-inner-item-user-email">'+c+"</div>");
t.append(e);
w.append(t)
}var f=wisestamp_jquery('<div class="wisestamp-sign-out with-transition">Sign out</div>');
f.bind("click",function(){wisestamp_utils.send_request({command:"log_out"},function(x){if(x.result===true){if(b.m_is_popup){window.close()
}else{document.location.reload()
}}})
});
w.append(f);
w.append('<div style="clear: both;"></div>');
g.append(w);
var n=wisestamp_jquery('<ul class="wisestamp-menu-list"></ul>',j);
b.add_top_menu_item(n,{label:"Edit your signature",command:function(){b.open_link(b.urls.editor_url,"top","edit_signature_top")
},imageURI:wisestamp_utils.get_url("content/img/toolbar-menu/edit.png"),"background-position":"0px center"});
b.add_top_menu_item(n,{label:"Signature settings",command:function(){b.open_link(b.urls.signature_settings_url,"top","signature_settings_top")
},imageURI:wisestamp_utils.get_url("content/img/toolbar-menu/settings.png"),"background-position":"0px center"});
b.add_top_menu_item(n,{label:"Need help?",command:function(){b.open_link(b.urls.help_url,"top","help_top")
},imageURI:wisestamp_utils.get_url("content/img/toolbar-menu/support.png"),"background-position":"0px center"});
if(i){var o=b.m_upgrade_promo_notifications;
(function(x){if(x.length===0){return
}var y=x[0];
if(y.description.length===0){return
}if(y.type!=="upgrade-promo"){return
}b.track_notification(y.title,"");
n.append(y.description)
})(o)
}var l=wisestamp_jquery('<li class="wisestamp-menu-share-buttons-wrapper"></li>');
var d=wisestamp_jquery('<a class="wisestamp-menu-share-button wisestamp-menu-share-button-facebook with-scale with-transition" href="'+b.urls.share_facebook_url+'" target="_blank"><span class="wisestamp-menu-button-text">Share on</span><img class="wisestamp-menu-button-icon" src="'+wisestamp_utils.get_url("content/img/facebook.png")+'"></a>');
var v=wisestamp_jquery('<a class="wisestamp-menu-share-button wisestamp-menu-share-button-twitter with-scale with-transition" href="'+b.urls.share_twitter_url+'" target="_blank"><span class="wisestamp-menu-button-text">Share on</span><img class="wisestamp-menu-button-icon" src="'+wisestamp_utils.get_url("content/img/twitter.png")+'"></a>');
l.append(d);
l.append(v);
l.append('<div style="clear: both;"></div>');
n.append(l);
if(p){if(!i){b.add_top_menu_item(n,{label:"Upgrade to PRO",command:function(){b.open_link(b.urls.upgrade_url,"top","upgrade_top","upgrade_top")
},"upgrade-link":true})
}}g.append(n);
var s;
var h;
if(b.enabled){s=wisestamp_jquery('<div class="wisestamp-disable-div with-transition">Disable WiseStamp</div>');
h=false
}else{s=wisestamp_jquery('<div class="wisestamp-enable-div with-transition">Enable WiseStamp</div>');
h=true
}s.click(function(){wisestamp_jquery("#wisestamp-toolbar-menu").remove();
wisestamp_utils.send_request({command:"set_enabled",value:h,closePanel:true},function(){b.update_enabled_status(h)
})
});
var m=wisestamp_jquery('<div class="wisestamp-menu-bottom"></div>');
m.append(s);
var u=wisestamp_jquery('<img src="'+wisestamp_utils.get_url("content/img/toolbar-menu/logo_blue_small.png")+'" class="wisestamp-top-menu-logo with-transition with-scale">');
u.click(function(){b.open_link(b.urls.home_url,"top","home_top")
});
m.append(u);
m.append('<div style="clear: both;"></div>');
q.append(g);
q.append(m);
r.css({display:"none",direction:"ltr"});
if(!b.m_is_popup){r.css({position:"absolute"})
}r.append(q);
if(!b.m_is_popup){b.add_top_menu_top_triangle(r)
}return r
};
this.open_wisestamp_top_menu=function(d){wisestamp_utils.log("[wisestamp_content_web::open_wisestamp_top_menu] >>>>>");
if(wisestamp_utils.is_logged_in(b.wisestamp_uid)){if(b.m_news_notifications==null||b.m_news_notifications.length==0){var f=d[0].ownerDocument;
wisestamp_utils.send_request({command:"get",type:"user_plan"},function(g){wisestamp_utils.send_request({command:"load_param",param:["enabled","user"]},function(l){if(wisestamp.sys.platform==="safari"){l=JSON.parse(l)
}b.enabled=l.enabled;
var h=l.user.login_email;
var j=b.get_wisestamp_top_menu(f,g,h);
var k=wisestamp_jquery(f).find("body");
k.append(j);
j.fadeIn("fast");
var m=d.offset();
j.css({display:"block",position:"absolute",top:m.top+d.parent().height()+9+b.m_top_menu_top_offset,"z-index":"9999999"});
if(b.m_top_menu_direction==="bottom-right"){j.css({left:m.left+d.width()-68+b.m_top_menu_left_offset})
}else{j.css({right:k.width()-m.left-d.width()-24+b.m_top_menu_right_offset})
}function i(){j.fadeOut("fast",function(){wisestamp_jquery(this).remove()
});
wisestamp_ui.remove_event_recursively(document,".wisestamp-top-menu");
b.close_wisestamp_menu_event(".wisestamp-top-menu",undefined)
}wisestamp_utils.setTimeout(function(){wisestamp_ui.add_event_recursively(document,"click.wisestamp-top-menu",i);
b.close_wisestamp_menu_event("click.wisestamp-top-menu",i)
},200)
})
})
}else{var c=b.m_news_notifications;
var e=b.m_news_notified_id;
b.m_news_notifications=null;
b.m_news_notified_id=null;
b.update_wisestamp_top_image();
(function(g,h){if(g.length===0){return
}b.notified(h,undefined,function(k){var j=g[0];
if(k>=j.date){return
}if(j.description.length===0){return
}if(j.type!=="minor"&&j.type!=="major"){return
}b.track_notification(j.title,"");
var l=b.getwisestamp_jquery();
var i=l("<span>"+j.description+"</span>");
b.show_bubble({title:j.title,type:j.type,width:j.width,height:j.height,content:i,delay:0,position_bubble_selector:"#wisestamp-top",callback:function(){b.notified(h,j.date)
}})
})
})(c,e)
}}else{b.open_wisestamp_login_menu(d)
}};
this.open_wisestamp_login_menu=function(e){wisestamp_utils.log("[wisestamp_content_web::open_wisestamp_login_menu] >>>>>");
function k(){c.fadeOut("fast",function(){wisestamp_jquery(this).remove();
if(b.m_is_popup){window.close()
}});
wisestamp_ui.remove_event_recursively(document,".wisestamp-top-menu");
b.close_wisestamp_menu_event(".wisestamp-top-menu",undefined)
}function g(){wisestamp_jquery(".wisestamp-error").removeClass("wisestamp-error");
wisestamp_jquery("#wisestamp-login-button").css("opacity","1");
wisestamp_jquery("#wisestamp-login-popup .wisestamp-error-response, #wisestamp-toolbar-menu div.wisestamp-form .wisestamp-error-response").html("");
if(!wisestamp_jquery("#wisestamp-login-email").val()||!(/[a-zA-Z\-_\.0-9]+@([a-zA-Z\-_\.0-9])+(\.([a-zA-Z\-_\.0-9])+)+/).test(wisestamp_jquery("#wisestamp-login-email").val())){wisestamp_jquery("#wisestamp-login-email").addClass("wisestamp-error");
return false
}if(!wisestamp_jquery("#wisestamp-login-password").val()){wisestamp_jquery("#wisestamp-login-password").addClass("wisestamp-error");
return false
}wisestamp_jquery("#wisestamp-login-button").css("opacity","0.8");
wisestamp_jquery("#wisestamp-waiting-overlay").fadeIn(250);
var q={command:"log_in"};
q.login_email=wisestamp_jquery("#wisestamp-login-email").val();
q.login_password=wisestamp_jquery("#wisestamp-login-password").val();
wisestamp_utils.send_request(q,function(r){if(r&&r.result&&r.user&&r.user.uid){wisestamp_utils.log("[wisestamp_content_web::open_wisestamp_login_menu::login] logged in successfully. Reloading...");
if(b.m_is_popup){window.close()
}}else{wisestamp_utils.log("[wisestamp_content_web::open_wisestamp_login_menu::login] error logging in.");
wisestamp_jquery("#wisestamp-login-popup .wisestamp-error-response, #wisestamp-toolbar-menu div.wisestamp-form .wisestamp-error-response").html(r.message);
wisestamp_jquery("#wisestamp-login-button").css("opacity","1");
wisestamp_jquery("#wisestamp-waiting-overlay").fadeOut(250)
}})
}var c=wisestamp_jquery('<div id="wisestamp-toolbar-menu" class="wisestamp-login"></div>');
var o=wisestamp_jquery(['<span class="wisestamp-login-menu-close">+</span>','<div class="wisestamp-form wisestamp-transition wisestamp-row">','<div class="wisestamp-col">','<div class="wisestamp-top-title">You are currently logged out of WiseStamp</div>','<div id="wisestamp-fb-connect-div"></div>','<div id="wisestamp-g-connect-div"></div>','<div class="wisestamp-error-response"></div>','<div class="wisestamp-open-login-form">Or, Login with your email</div>','<div class="wisestamp-form-inline wisestamp-form-inline-hidden wisestamp-transition">','<div class="wisestamp-form-group">','<div class="wisestamp-input-group">','<input id="wisestamp-login-email" class="wisestamp-form-control" type="text">','<label for="wisestamp-login-email" placeholder="Type your email"></label>','<div class="wisestamp-error-text">Please type a valid email address</div>',"</div>",'<div class="wisestamp-input-group">','<input id="wisestamp-login-password" class="wisestamp-form-control" type="password">','<label for="wisestamp-login-email" placeholder="Type your password"></label>','<div class="wisestamp-error-text">Please type your password</div>',"</div>",'<div id="wisestamp-login-button-parent">','<button id="wisestamp-login-button" class="wisestamp-button wisestamp-transition wisestamp-orange">Login</button>','<div id="wisestamp-waiting-overlay" style="display: none;">','<loader class="white"></loader>',"</div>","</div>","</div>",'<a class="wisestamp-forgot-pass" href="'+wisestamp.config.urls.website.forgot_password+'" target="_blank">Forgot Your Password?</a>',"</div>",'<div class="wisestamp-need-help"><a href="'+wisestamp.config.urls.website.need_help+'">Need help?</a></div>',"</div>","</div>",'<div class="wisestamp-checkbox">','<input type="checkbox" value="1" id="wisestamp-dont-show-checkbox" name="" />','<label for="wisestamp-dont-show-checkbox"><span>Don’t show this to me again</span></label>','<button type="submit" class="wisestamp-login-menu-close">OK</button>',"</div>"].join(""));
c.css({width:"250px","-webkit-border-radius":"2px","-moz-border-radius":"2px","border-radius":"2px","background-color":"#fff",color:"#333","font-family":'"Lato", sans-serif',"font-size":"18px","line-height":"22px","font-weight":"300","padding-top":"35px",overflow:"hidden","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box",display:"none",direction:"ltr","z-index":"9999999"});
if(b.m_is_popup){c.css({margin:"4px"})
}else{c.css({position:"absolute","-webkit-box-shadow":"0px 3px 5px 1px rgba(0,0,0,0.23)","-moz-box-shadow":"0px 3px 5px 1px rgba(0,0,0,0.23)","box-shadow":"0px 3px 5px 1px rgba(0,0,0,0.23)"})
}c.append(o);
c.find("button").css({height:"inherit"});
var n;
var f;
if(b.m_is_popup){n=true;
f=true
}else{switch(wisestamp.sys.platform){case"safari":n=true;
f=true;
break;
case"firefox":case"chrome":default:n=false;
f=false;
break
}}if(n){var j=wisestamp_jquery(['<button class="wisestamp-only-facebook-login-input-group">','<div class="wisestamp-only-facebook-login-input-group-addon"><img src="'+wisestamp_utils.get_url("content/img/facebook.png",true)+'" alt="" /></div>','<div class="wisestamp-only-facebook-login-form-control"><span class="wisestamp-only-facebook-login-form-control-inner-text">Login with Facebook</span></div>',"</button>"].join(""));
c.find("#wisestamp-fb-connect-div").append(j);
switch(b.m_content_type){case"Gmail":case"AOL":case"GoDaddy":c.find("#wisestamp-fb-connect-div .wisestamp-only-facebook-login-input-group-addon").css({position:"relative",top:"-1px",left:"-2px"});
break;
default:c.find("#wisestamp-fb-connect-div .wisestamp-only-facebook-login-input-group-addon").css({position:"relative",left:"-1px"});
break
}j.click(function(){k();
b.open_link(wisestamp.config.urls.website.login,"top","fb_login_top","fb_login_top");
return false
})
}else{var i=wisestamp_jquery('<iframe id="myframe_f" src="'+wisestamp_utils.get_url("content/src/login_iframe/login_iframe.html?url="+encodeURIComponent(wisestamp.config.urls.website.only_facebook_login))+'"></iframe>');
c.find("#wisestamp-fb-connect-div").append(i)
}if(f){var h=wisestamp_jquery(['<button class="wisestamp-only-google-login-input-group">','<div class="wisestamp-only-google-login-input-group-addon"><img src="'+wisestamp_utils.get_url("content/img/gplus.png",true)+'" alt="" /></div>','<div class="wisestamp-only-google-login-form-control"><span class="wisestamp-only-google-login-form-control-inner-text">Login with Google</span></div>',"</button>"].join(""));
c.find("#wisestamp-g-connect-div").append(h);
switch(b.m_content_type){case"Gmail":case"AOL":case"GoDaddy":c.find("#wisestamp-g-connect-div .wisestamp-only-google-login-input-group-addon").css({position:"relative",top:"-1px",left:"-2px"});
break;
default:c.find("#wisestamp-g-connect-div .wisestamp-only-google-login-input-group-addon").css({position:"relative",left:"-1px"});
break
}h.click(function(){k();
b.open_link(wisestamp.config.urls.website.login,"top","g_login_top","g_login_top");
return false
})
}else{var p=wisestamp_jquery('<iframe id="myframe_g" src="'+wisestamp_utils.get_url("content/src/login_iframe/login_iframe.html?url="+encodeURIComponent(wisestamp.config.urls.website.only_google_login+"&w="+window.innerWidth+"&h="+window.innerHeight))+'"></iframe>');
c.find("#wisestamp-g-connect-div").append(p)
}c.find(".wisestamp-col").css({width:"190px",position:"relative","min-height":"1px",margin:"0 auto"});
c.find(".wisestamp-open-login-form").click(function(){c.find(".wisestamp-form-inline").addClass("wisestamp-form-inline-shown");
c.find(".wisestamp-open-login-form").addClass("wisestamp-open-login-form-hidden")
});
c.find(".wisestamp-login-menu-close").click(function(){k();
if(c.find("#wisestamp-dont-show-checkbox").is(":checked")){wisestamp_utils.send_request({command:"save_param",param:"dont_show_login_popup",value:true},function(){})
}return false
});
var m=wisestamp_jquery("body");
m.append(c);
c.fadeIn("fast");
if(e){var l=e.offset();
c.css({display:"block",position:"absolute",top:l.top+e.parent().height()+18+b.m_top_menu_top_offset});
if(b.m_top_menu_direction==="bottom-right"){c.css({left:l.left+e.width()-70+b.m_top_menu_left_offset})
}else{c.css({right:m.width()-l.left-e.width()-26+b.m_top_menu_right_offset})
}}else{var d=50;
c.css({display:"block"});
if(!b.m_is_popup){c.css({position:"absolute",top:(10+b.m_notifications_top_offset)+"px"});
if(b.m_top_menu_direction==="bottom-right"){c.css({left:"3px","margin-left":d})
}else{c.css({right:"3px","margin-right":d})
}}}wisestamp_jquery("#wisestamp-login-button").on("click",g);
wisestamp_jquery("#wisestamp-toolbar-menu div.wisestamp-form-inline input.wisestamp-form-control").keyup(function(q){wisestamp_jquery(this).removeClass("wisestamp-error");
if(q.target.value.length>0){wisestamp_jquery(this).addClass("wisestamp-active")
}else{wisestamp_jquery(this).removeClass("wisestamp-active")
}if(q.keyCode===13){wisestamp_jquery("#wisestamp-login-button").click()
}})
};
this.get_wisestamp_compose_menu=function(f,k,i,n){if(b.enabled){var e=wisestamp_jquery('<div id="wisestamp-menu"></div>',k);
var h=wisestamp_jquery("<div></div>",k);
h.css({"-webkit-box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)","-moz-box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)","box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)","-webkit-border-radius":"4px","-moz-border-radius":"4px","border-radius":"4px",background:"white","font-size":"90%",width:"262px","font-family":"arial, sans-serif",display:"block",overflow:"hidden"});
b.add_menu_top_header(h,{label:"Choose the signature<br>you want to use"});
for(var c in f.signatures){if(c==="__exposedProps__"||c==="result"){continue
}var j=f.signatures[c].title;
var g=function(o){b.on_menu_switch_signature(o.target.parentNode.id,n)
};
b.add_menu_item(h,{id:c,label:j,command:g,type:"radio",name:"switch-signature","text-color":"#333",imageURI:wisestamp_utils.get_url("content/img/checkbox_empty.png",true)},n)
}b.add_menu_item(h,{id:"0",label:"No signature",command:function(p){var o=wisestamp_jquery(this).parents("[data-wisestamp-editor-id]").attr("data-wisestamp-editor-id");
b.on_menu_switch_signature(p.target.parentNode.id,o)
},type:"radio",name:"switch-signature","text-color":"#333",imageURI:wisestamp_utils.get_url("content/img/checkbox_empty.png",true)},n);
if(i){b.add_menu_item(h,{label:"Add another signature",command:function(o){b.open_link(b.urls.upgrade_url,"compose","add_another_signature")
},type:"radio",name:"add-another-signature","text-color":"#333",imageURI:wisestamp_utils.get_url("content/img/checkbox_empty.png",true)},n)
}h.append('<div style="margin-top: 15px;"></div>');
b.add_menu_bottom_footer(h,i);
if(typeof b.m_update_details==="object"&&b.m_update_details!==null&&typeof b.m_update_details.url==="string"){b.add_menu_item(h,{label:"Update available!",command:function(){b.open_link(b.m_update_details.url,"update","compose")
},imageURI:wisestamp_utils.get_url("content/img/exclamation.png"),"background-color":"#f0f0f0","background-color-hover":"#e0e0e0","text-color":"#777777"})
}e.css({display:"none",position:"absolute",direction:"ltr"});
e.html(h[0]);
switch(b.m_menu_direction){case"top":b.add_menu_bottom_triangle(e);
break;
case"right":b.add_menu_left_triangle(e);
break;
case"bottom":b.add_menu_top_triangle(e);
break
}return e
}else{var e=wisestamp_jquery('<div id="wisestamp-menu"></div>',k);
var m=wisestamp_jquery('<div>Your WiseStamp is disabled<br /><span class="enable">Click to Enable</span></div>');
e.css({width:"193px",height:"59px","-moz-border-radius":"7px","-webkit-border-radius":"2px","border-radius":"2px","-moz-background-clip":"padding","-webkit-background-clip":"padding-box","background-clip":"padding-box","background-color":"#fff",color:"#323b43","font-family":"'Lato', sans-serif","font-size":"12px","line-height":"1.6",display:"none",position:"absolute",direction:"ltr","-webkit-box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)","-moz-box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)","box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)"});
m.css({display:"table",margin:"10px auto"});
e.append(m);
var d=e.find("span.enable");
d.css({cursor:"pointer",color:"#323b43","text-decoration":"underline"});
if(b.enabled){var l=false
}else{var l=true
}d.click(function(){wisestamp_utils.send_request({command:"set_enabled",value:l,closePanel:true},function(){b.update_enabled_status(l)
})
});
switch(b.m_menu_direction){case"top":b.add_menu_bottom_disabled_triangle(e);
break;
case"right":b.add_menu_left_disabled_triangle(e);
break;
case"bottom":b.add_menu_top_disabled_triangle(e);
break
}return e
}};
this.open_wisestamp_compose_menu=function(h){var f=h.parents("body");
var n=f.find("[wisestamped][data-wisestamp-editor-id]");
var q;
if(!(n.length===1)){var m;
try{m=f.find("iframe")
}catch(o){wisestamp_utils.log("[wisestamp_content_gmail::open_wisestamp_compose_menu] iframes exception!");
m=[]
}var r=[];
for(var k=0;
k<m.length;
k++){var d=wisestamp_ui.get_iframe_document(m[k]);
if(!(typeof(d)==="undefined")){var c=wisestamp_ui.find_element_recursively("[wisestamped][data-wisestamp-editor-id]",d);
if(c!=null){for(var g=0;
g<c.length;
g++){r.push(c[g])
}}}}if(r.length===1){n=wisestamp_jquery(r)
}else{n=[]
}}if(n.length===1){q=n.attr("data-wisestamp-editor-id")
}else{q=undefined
}var p=h[0].ownerDocument;
wisestamp_jquery("#wisestamp-menu, #wisestamp-control-signature-insertion").remove();
var l=false;
wisestamp_utils.send_request({command:"get",type:"user_plan"},function(e){wisestamp_utils.send_request({command:"load_param",param:["enabled"]},function(t){l=true;
if(wisestamp.sys.platform==="safari"){t=JSON.parse(t)
}b.enabled=t.enabled;
var j=b.get_wisestamp_compose_menu(b.m_data,p,e,q);
var s=wisestamp_jquery(p).find("body");
s.append(j);
j.show();
var v=h.offset();
j.css({display:"block",position:"absolute","z-index":"9999"});
switch(b.m_menu_direction){case"top":j.css({top:v.top-j.height()-35});
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){j.css({left:v.left+h.width()-65})
}else{j.css({left:v.left-j.width()+h.width()+37})
}break;
case"right":j.css({top:v.top+h.height()-50,left:v.left+34});
break;
case"bottom":j.css({top:v.top+31});
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){j.css({left:v.left+h.width()-65})
}else{j.css({left:v.left-j.width()+h.width()+37})
}break
}wisestamp_utils.setTimeout(function(){l=true
},500);
var i=function(){j.remove();
l=false;
wisestamp_ui.remove_event_recursively(document,".wisestamp-compose-menu");
wisestamp_ui.remove_event_recursively(document,"#wisestamp-menu");
b.close_wisestamp_menu_event(".wisestamp-compose-menu",undefined);
b.close_wisestamp_menu_event("#wisestamp-menu",undefined)
};
var u=function(w){if(l&&!wisestamp_jquery(w.target).hasClass("wisestamp-always-do")&&!wisestamp_jquery(w.target).hasClass("wisestamp-always-do-label")){i()
}};
wisestamp_ui.add_event_recursively(document,"click.wisestamp-compose-menu",u);
wisestamp_ui.add_event_recursively(document,"keyup.wisestamp-compose-menu",function(w){if(w.keyCode===27){i()
}});
b.close_wisestamp_menu_event("click.wisestamp-compose-menu",u)
})
})
};
this.add_always_do_button=function(e){var g=wisestamp_jquery('<div class="wisestamp-always-do-wrapper" style="margin: 20px 30px;"></div>');
var d=wisestamp_jquery('<input type="checkbox" id="wisestamp-always-do" class="wisestamp-always-do"/>');
var f=wisestamp_jquery('<label for="wisestamp-always-do" class="wisestamp-always-do-label">&nbsp;&nbsp;Always do this for this email</label>');
var c="<style>";
c+='.wisestamp-always-do + label:before {background: url("'+wisestamp_utils.get_url("content/img/checkbox_unchecked.png",true)+'");}';
c+='.wisestamp-always-do:checked + label:before {background: url("'+wisestamp_utils.get_url("content/img/checkbox_checked.png",true)+'");}';
c+="</style>";
g.append(d);
g.append(f);
e.append(c);
e.append(g)
};
this.add_menu_bottom_footer=function(e,d){var f=wisestamp_jquery('<div class="wisestamp-menu-bottom-footer"></div>');
f.css({padding:"12px 20px 15px 20px",background:"#f2f2f2"});
var c=wisestamp_jquery('<div style="float: left;"></div>');
b.add_footer_link(c,{label:"Edit Signature",command:function(){b.open_link(wisestamp.config.urls.website.editor,"compose","edit_signature")
}});
b.add_footer_link(c,{label:"Signature insertion settings",command:function(){b.open_link(wisestamp.config.urls.website.signature_settings,"compose","manage_signature_insertion")
}});
if(d){b.add_footer_link(c,{label:"Upgrade",command:function(){b.open_link(b.urls.upgrade_url,"compose","upgrade_compose","upgrade_compose")
}})
}f.append(c);
f.append('<div style="clear: both;"></div>');
e.append(f)
};
this.add_footer_link=function(f,e){var c=e.label;
var d=wisestamp_jquery('<div><span class="arrow-menu-link">&gt;</span>'+c+"</div>");
d.css({cursor:"pointer",color:"#1CB7EB","line-height":"180%","font-family":"'Lato', sans-serif","font-size":"13px","font-weight":"600"});
d.hover(function(){wisestamp_jquery(this).css({color:"#333"})
},function(){wisestamp_jquery(this).css({color:"#1CB7EB"})
});
d.click(e.command);
f.append(d)
};
this.add_menu_top_header=function(d,c){var f=wisestamp_jquery('<div class="wisestamp-menu-top-header"></div>');
var e=wisestamp_jquery("<span>"+c.label+"</span>");
f.append(e);
f.css({background:"#fff",color:"#333",padding:"25px 0px 0px 20px","font-family":"'Lato', sans-serif","font-weight":"600","margin-bottom":"7px","font-size":"17px"});
d.append(f)
};
this.get_wisestamp_compose_icon=function(d){var c=wisestamp_jquery('<img id="wisestamp-icon-compose" class="wisestamp-compose-img" src="'+wisestamp_utils.get_url("content/img/webmail_icon.png",true)+'" />');
c.click(function(e){b.open_wisestamp_compose_menu(wisestamp_jquery(this),d);
e.stopImmediatePropagation();
e.stopPropagation()
});
return c
};
this.update_wisestamp_compose_image=function(){if(wisestamp_jquery("img.wisestamp-compose-img").length>0){if(b.enabled){wisestamp_jquery("img.wisestamp-compose-img").attr("src",wisestamp_utils.get_url("content/img/webmail_icon.png",true))
}else{wisestamp_jquery("img.wisestamp-compose-img").attr("src",wisestamp_utils.get_url("content/img/webmail_disabled_icon.png",true))
}}};
this.on_signature_out=function(){if(b.m_control_layer==null){return
}b.m_control_layer.remove();
b.m_control_toolbar.remove()
};
this.show_bubble=function(g,d,f,c,h,e,i){a.m_wisestamp_ui=wisestamp_ui;
a.show_bubble(g,d,f,c,h,e,i)
};
this.position_bubble=function(m,l,c){var f=5;
var g=wisestamp_jquery(l.position_bubble_selector);
var j=0;
var i=0;
var d=false;
if(g.length===1){try{j=g.offset().left+15;
i=g.offset().top+g.height();
j-=(c.arrow_size+c.arrow_off_set);
var k=j-5;
if(k<0){j-=k;
if(((-k)<(Math.round((c.width/2)-(c.arrow_size*2))))&&(!(l.type==="minor"))){c.arrow_off_set+=k;
d=true
}}k=j+l.width+f+5-wisestamp_jquery("body").width();
if(k>0){j-=k;
if((k<(Math.round((c.width/2)-(c.arrow_size*2))))&&(!(l.type==="minor"))){c.arrow_off_set+=k;
d=true
}}}catch(h){j=0;
i=0
}}if((j===0)&&(i===0)){if(b.m_top_menu_direction==="bottom-right"){m.css({position:"absolute",top:(((l.type==="minor")?10:3)+b.m_notifications_top_offset)+"px",left:"3px","margin-left":f})
}else{m.css({position:"absolute",top:(((l.type==="minor")?10:3)+b.m_notifications_top_offset)+"px",right:"3px","margin-right":f})
}}else{if(b.m_top_menu_direction==="bottom-right"){m.css({position:"absolute",top:i+(((l.type==="minor")?3:0)+b.m_notifications_top_offset),left:j+b.m_notifications_left_offset,"margin-left":f})
}else{m.css({position:"absolute",top:i+(((l.type==="minor")?3:0)+b.m_notifications_top_offset),right:wisestamp_jquery("body").width()-(j+l.width+f+2)+b.m_notifications_right_offset,"margin-right":f})
}if(d){m.find(".arrow-top, .arrow-bottom").css({left:c.arrow_off_set+"px"})
}}};
this.try_setup_wisestamp=function(c){var d=window.setInterval(function(){wisestamp_utils.log("[wisestamp_content_web::try_setup_wisestamp] retry, location = "+document.location+" >>>>>");
if(b.setup_wisestamp()==true){clearInterval(d)
}},100)
};
this.try_setup_wisestamp_compose=function(d){wisestamp_utils.log("[wisestamp_content_web::try_setup_wisestamp_compose] >>>>>");
if(typeof d==="undefined"){d=document
}if(b.is_black_listed_view()===true){wisestamp_utils.log("[wisestamp_content_web::try_setup_wisestamp_compose] blacklisted <<<<<");
return
}function c(e){wisestamp_utils.log("[wisestamp_content_web::try_setup_wisestamp_compose] editor = "+e);
if(typeof c.counter==="undefined"){c.counter=0
}if(e==null){if(c.counter++>3){return
}wisestamp_utils.setTimeout(function(){b.get_editor(d,c)
},1000);
return
}c.counter=0;
b.m_current_editor_body=e;
b.setup_wisestamp_compose(e,b.should_insert_signature())
}b.get_disabled_editor(d,b.disable_editor);
b.get_editor(d,c)
};
this.run_thread=function(){var d=null;
function c(){wisestamp_utils.log("[wisestamp_content_web::run_thread] "+d+" >>>>>");
b.get_editor(document,function(e){if(e!=null){wisestamp_utils.log("[wisestamp_content_web::run_thread] got editor! "+b.rand);
b.m_current_editor_body=e;
b.setup_wisestamp_compose(e)
}d=wisestamp_utils.setTimeout(function(){c()
},b.m_thread_timeout)
},function(){d=wisestamp_utils.setTimeout(function(){c()
},b.m_thread_timeout)
})
}c()
};
this.on_dom_node_inserted=function(e){function c(g){var i=wisestamp_ui.get_iframe_document(g);
if(wisestamp_jquery(i).find("script#wisestamp").length!==0){return
}wisestamp_utils.log("[wisestamp_content_web::on_dom_node_inserted] WiseStamping a new iframe");
var h=i.getElementsByTagName("head")[0];
var f=i.createElement("script");
f.type="text/javascript";
f.setAttribute("id","wisestamp");
f.src=wisestamp_utils.get_url("allJs.php");
h.appendChild(f);
if(typeof EBCallBackMessageReceived!=="undefined"){window.msgRequestFunc="EBCallBackMessageReceived"
}i.defaultView.msgRequestFunc=window.msgRequestFunc;
i.defaultView[window.msgRequestFunc]=window[window.msgRequestFunc];
wisestamp_utils.log("[wisestamp_content_web::on_dom_node_inserted] msgRequestFunc = "+window.msgRequestFunc)
}if(typeof(e.target)==="undefined"||!("tagName" in e.target)){return
}var d=e.target;
if(d.tagName=="IFRAME"){if(wisestamp.sys.platform==="conduit"){c(d)
}if(d.contentDocument&&d.contentDocument.designMode=="on"){return
}d.addEventListener("load",function(f){wisestamp_utils.setTimeout(function(){b.on_iframe_loaded(f)
},b.m_delay_after_load)
},false)
}};
this.on_iframe_loaded=function(c){try{b.setup_wisestamp()
}catch(d){}b.try_setup_wisestamp_compose()
};
this.is_black_listed_view=function(){return false
};
this.should_insert_signature=function(){return true
};
this.get_assign_signature_to_email_address_popup=function(l,n){var f=wisestamp_jquery('<div class="wisestamp-assign-signature-overlay"></div>');
var d=wisestamp_jquery('<div class="wisestamp-assign-signature-popup"></div>');
var o=wisestamp_jquery('<div class="wisestamp-assign-signature-loader-wrapper"><div class="wisestamp-assign-signature-loader"></div></div>');
d.append(o);
d.append('<img src="https://s3.amazonaws.com/wisepress.wisestamp.com/9d77920d-b350-48a2-a736-18e19431a7f0/wblue.svg" style="position: absolute; top: 15px; left: 15px; width: 40px;"/>');
var p=wisestamp_jquery('<span class="wisestamp-assign-signature-close">+</span>');
p.click(function(){wisestamp_utils.send_request({command:"ws_track",action:"assign_signature_close",payload:{content_type:b.m_content_type,ts:(new Date()).getTime()}});
e()
});
d.append(p);
d.append('<p style="text-align: center;margin-top: 50px;font-size: 20px;font-weight: 600; font-family: \'Lato\', sans-serif;">Would you like to use this signature with<br><span class="wisestamp-assign-signature-popup-account">'+l+"</span>?</p>");
var j=wisestamp_jquery('<div class="wisestamp-assign-signature-carousel"></div>');
d.append(j);
d.append('<img data-direction="left" class="wisestamp-assign-signature-arrow" src="https://s3.amazonaws.com/landing.wisestamp.com/7942a8680adc20f3bf052571b234e5ec/1478725496_ChevronLeft.png">');
d.append('<img data-direction="right" class="wisestamp-assign-signature-arrow" src="https://s3.amazonaws.com/landing.wisestamp.com/7942a8680adc20f3bf052571b234e5ec/1478725496_ChevronRight.png">');
var g=wisestamp_jquery('<div class="wisestamp-assign-signatures-buttons-wrapper"></div>');
var m=wisestamp_jquery('<button class="wisestamp-assign-signatures-yes-button">Yes</button>');
var i=wisestamp_jquery('<span class="wisestamp-assign-signatures-no-thanks-button">No, thanks</span>');
m.click(h);
i.click(function(){wisestamp_utils.send_request({command:"ws_track",action:"assign_signature_no_thanks",payload:{content_type:b.m_content_type,ts:(new Date()).getTime()}});
e()
});
g.append(m).append("<br><br>").append(i);
d.append(g);
var c=wisestamp_jquery('<span class="wisestamp-assign-signature-advanced-settings">Signature insertion settings</span>');
c.click(function(){wisestamp_utils.send_request({command:"ws_track",action:"assign_signature_settings",payload:{content_type:b.m_content_type,ts:(new Date()).getTime()}});
b.open_link(b.urls.signature_settings_url,"popup","assign_signatures_popup")
});
d.append(c);
f.append(d);
function e(){o.show();
k(l,{composeSigId:"None",ignore:true,replySigId:"None"})
}function h(){o.show();
var q=wisestamp_jquery(".wisestamp-assign-signature-item-active").data().signatureId;
wisestamp_utils.send_request({command:"ws_track",action:"assign_signature_yes",payload:{sig_id:q,content_type:b.m_content_type,ts:(new Date()).getTime()}});
k(l,{composeSigId:q,ignore:true,replySigId:q})
}function k(r,q){wisestamp_utils.send_request({command:"load_param",param:"mappings"},function(u){if(wisestamp.sys.platform==="safari"){u=JSON.parse(u)
}var s={};
s[r]=q;
var t=Object.assign(u.mappings,s);
wisestamp_utils.send_request({command:"update_remote",type:"save_mappings",value:t},function(){if(n){b.refresh_all_data(function(){b.insert_mapped_signature(r,true);
wisestamp_jquery(".wisestamp-assign-signature-overlay").fadeOut(350)
})
}else{b.refresh_all_data(function(){window.location.reload()
})
}})
})
}return f
};
this.get_control_signature_insertion=function(h,g){var f=wisestamp_jquery("html > head #wisestamp-lato-font-element");
if(f.length===0){wisestamp_jquery("html > head").append('<link id="wisestamp-lato-font-element" href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" type="text/css">')
}var j=wisestamp_jquery('<div id="wisestamp-control-signature-insertion"></div>',g);
var e=wisestamp_jquery('<div class="wisestamp-control-signature-insertion-logo"><img src='+wisestamp_utils.get_url("content/img/wisestamp_logo_control.png",true)+"></div>");
j.append(e);
var i=wisestamp_jquery('<div class="wisestamp-control-signature-insertion-title">We are right here for you</div>');
j.append(i);
var d=wisestamp_jquery('<div class="wisestamp-control-signature-insertion-text">Here\'s your quick access icon. Use this icon to modify your signature and to decide what emails to insert your signature into.<br><br><span style="color: #1cb7eb;">Pro user?</span> You can setup multiple signatures, assign them to email address and remove WiseStamp promotion</div>');
j.append(d);
var c=wisestamp_jquery('<button class="wisestamp-control-signature-insertion-got-it-button">Got it</button>');
c.click(function(){wisestamp_jquery("#wisestamp-control-signature-insertion").fadeOut(200)
});
j.append(c);
switch(b.m_control_signature_insertion_direction){case"top":b.add_control_signature_insertion_bottom_triangle(j);
break;
case"right":b.add_control_signature_insertion_left_triangle(j);
break;
case"bottom":b.add_control_signature_insertion_top_triangle(j);
break
}return j
};
this.open_assign_signature_to_email_address_popup=function(d,c){if(wisestamp_utils.is_logged_in(b.wisestamp_uid)){wisestamp_utils.send_request({command:"ws_track",action:"assign_signature_impression",payload:{content_type:b.m_content_type,ts:(new Date()).getTime()}});
wisestamp_utils.send_request({command:"load_param",param:["assigned_signature"]},function(f){if(wisestamp.sys.platform==="safari"){f=JSON.parse(f)
}var e=[];
if(f.assigned_signature){e=f.assigned_signature
}e.push(d);
wisestamp_utils.send_request({command:"save_param",param:"assigned_signature",value:e},function(){});
b.assigned_signature=e
});
wisestamp_jquery("body").append(b.get_assign_signature_to_email_address_popup(d,c));
b.get_data("all",null,function(f){if(wisestamp.sys.platform==="safari"){f=JSON.parse(f)
}var g=[];
for(var e in f.data.signatures){if(f.data.signatures.hasOwnProperty(e)){g.push({id:e,html:f.data.signatures[e].html})
}}g.map(function(h,i){wisestamp_jquery(".wisestamp-assign-signature-overlay").find(".wisestamp-assign-signature-carousel").append('<div data-signature-id="'+h.id+'" data-index="'+i+'" class="wisestamp-assign-signature-item wisestamp-assign-signature-item-'+i+" wisestamp-assign-signature-item-"+(i==0?"active":"passive")+'">'+h.html+"</div>")
});
wisestamp_jquery(".wisestamp-assign-signature-overlay").fadeIn(350);
if(g.length>1){wisestamp_jquery(".wisestamp-assign-signature-overlay").find(".wisestamp-assign-signature-arrow").show().click(function(){var j=wisestamp_jquery(this).data().direction;
var h=wisestamp_jquery(".wisestamp-assign-signature-item-active").data().index;
wisestamp_jquery(".wisestamp-assign-signature-item-active").removeClass("wisestamp-assign-signature-item-active").addClass("wisestamp-assign-signature-item-passive");
var i;
if(j=="left"){if(h==0){i=g.length-1
}else{i=h-1
}}else{if(h==g.length-1){i=0
}else{i=h+1
}}wisestamp_jquery(".wisestamp-assign-signature-item-"+i).removeClass("wisestamp-assign-signature-item-passive").addClass("wisestamp-assign-signature-item-active")
})
}})
}};
this.open_control_signature_insertion=function(e){wisestamp_utils.log("[wisestamp_content_web::open_control_signature_insertion] >>>>>");
var d=e[0].ownerDocument;
wisestamp_jquery("#wisestamp-menu, #wisestamp-control-signature-insertion").remove();
var f=b.get_control_signature_insertion(b.m_data,d);
var c=wisestamp_jquery(d).find("body");
c.append(f);
f.show();
var g=e.offset();
f.css({display:"block",position:"absolute","z-index":"9999"});
switch(b.m_control_signature_insertion_direction){case"top":f.css({top:g.top-f.height()-151+b.m_control_signature_insertion_top_offset});
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){f.css({left:g.left+e.width()-104+b.m_control_signature_insertion_left_offset})
}else{f.css({left:g.left-f.width()+e.width()-37+b.m_control_signature_insertion_left_offset})
}break;
case"right":f.css({top:g.top+e.height()-50+b.m_control_signature_insertion_top_offset,left:g.left+34+b.m_control_signature_insertion_left_offset});
break;
case"bottom":f.css({top:g.top+36+b.m_control_signature_insertion_top_offset});
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){f.css({left:g.left+e.width()-44+b.m_control_signature_insertion_left_offset})
}else{f.css({left:g.left-f.width()+e.width()+7+b.m_control_signature_insertion_left_offset})
}break
}wisestamp_utils.log("[wisestamp_content_web::open_control_signature_insertion] <<<<<")
};
this.add_control_signature_insertion_bottom_triangle=function(c){c.append(b.create_control_signature_insertion_bottom_triangle())
};
this.add_control_signature_insertion_left_triangle=function(c){c.append(b.create_control_signature_insertion_left_triangle())
};
this.add_control_signature_insertion_top_triangle=function(c){c.append(b.create_control_signature_insertion_top_triangle())
};
this.create_control_signature_insertion_bottom_triangle=function(){var c;
c=wisestamp_jquery("<div></div>");
c.css({width:"35px",height:"61px","background-image":'url("'+wisestamp_utils.get_url("content/img/bottom_arrow_control.png",true)+'")',"background-position":"center center","background-repeat":"no-repeat",position:"absolute",bottom:"-75px"});
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){c.css({left:"-8px"})
}else{c.css({right:"-8px"})
}return c[0]
};
this.create_control_signature_insertion_left_triangle=function(){var c;
c=wisestamp_jquery("<div></div>");
c.css({width:"9px",height:"18px","background-image":'url("'+wisestamp_utils.get_url("content/img/control_signature_insertion_left_triangle.png",true)+'")',"background-position":"center center","background-repeat":"no-repeat",position:"absolute",top:"30px",left:"-8px"});
return c[0]
};
this.create_control_signature_insertion_top_triangle=function(){var c;
c=wisestamp_jquery("<div></div>");
c.css({width:"18px",height:"9px","background-image":'url("'+wisestamp_utils.get_url("content/img/control_signature_insertion_top_triangle.png",true)+'")',"background-position":"center center","background-repeat":"no-repeat",position:"absolute",top:"-8px"});
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){c.css({left:"42px"})
}else{c.css({right:"42px"})
}return c[0]
};
this.update_enabled_status=function(c){b.enabled=c;
b.update_wisestamp_top_image();
b.update_wisestamp_compose_image();
b.get_editor(document,function(d){if((!(d===null))&&(typeof(d)==="object")&&(d.length>0)){b.insert_mapped_signature(undefined,undefined,d)
}})
};
this.get_disabled_editor=function(c,d){};
this.disable_editor=function(c){};
this.after_add_top_menu=function(c){if((!(wisestamp_utils.is_logged_in(b.wisestamp_uid)))&&(!(b.dont_show_login_popup===true))){b.open_wisestamp_top_menu(c)
}};
var a=null;
this.set_super=function(c){a=c
};
this.construct=function(c){b=c;
a.construct(b)
}
};
var wisestamp_obj_base=new wisestamp_content_base();
wisestamp_content_web.prototype=wisestamp_obj_base;
var wisestamp_obj_web=new wisestamp_content_web();
wisestamp_obj_web.set_super(wisestamp_obj_base)
};