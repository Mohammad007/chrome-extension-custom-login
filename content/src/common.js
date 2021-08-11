if(typeof wisestamp==="undefined"){wisestamp={}
}var LOCALHOST_DEPLOY=false;
var LOCALHOST_HTTPS_PORT=9081;
var LOCALHOST_PROTOCOL="http";
var REMOTE_QA_DEPLOY=false;
var REMOTE_QA_URL="webapp-qa.wisestamp.com/";
wisestamp.get_platform=function(){if(wisestamp.sys&&typeof wisestamp.sys.platform!=="undefined"){return wisestamp.sys.platform
}if(navigator.userAgent.indexOf("Firefox")!==-1){return"firefox"
}if(typeof chrome!=="undefined"){return"chrome"
}if(typeof safari!=="undefined"){return"safari"
}if(typeof document!=="undefined"){switch(document.location.protocol){case"http:":case"https:":if(typeof IsConduitApp!=="undefined"){return"conduit"
}else{if(typeof EBCallBackMessageReceived!=="undefined"){return"conduit"
}else{return"web"
}}case"chrome:":return"firefox";
case"chrome-extension:":return"chrome";
case"safari-extension:":return"safari";
default:return"unknown"
}}return"unknown"
};
wisestamp.get_debug=function(){switch(wisestamp.sys.platform){case"conduit":return true;
case"firefox":return false;
case"chrome":case"safari":return(typeof localStorage.debug!=="undefined")&&localStorage.debug;
case"web":return true;
default:return false
}};
wisestamp.get_url=function(a,b){if(typeof a!=="string"){a=""
}else{if(a.substr(0,1)==="/"){a=a.substr(1)
}}switch(wisestamp.sys.platform){case"firefox":case"chrome":return chrome.extension.getURL(a);
case"safari":return safari.extension.baseURI+a;
case"web":case"conduit":if(b&&"remote_secure" in wisestamp.config.urls.apis){return wisestamp.config.urls.apis.remote_secure+a
}return wisestamp.config.urls.apis.remote+a;
default:return"../"+a
}};
wisestamp.get_relative_url=function(a){if(typeof a!=="string"){a=""
}else{if(a.substr(0,1)==="/"){a=a.substr(1)
}}switch(wisestamp.sys.platform){case"chrome":return"/"+a
}};
wisestamp.cfg=function(b,a){return wisestamp_utils.prop_by_path(wisestamp.config,b,a)
};
wisestamp.context=(typeof wisestamp_context!=="undefined")?wisestamp_context:"unknown";
wisestamp.sys={};
wisestamp.sys["platform"]=wisestamp.get_platform();
wisestamp.version={};
wisestamp.config={debug:wisestamp.get_debug(),support:{mapping:false,after_upgrade_page:true,apps:true,premium:true,new_apps:false,offline:true,free_sig_assign:true,redirect_links:false},urls:{website:{home:"https://www.wisestamp.com/",editor:"https://webapp.wisestamp.com/",editor_user:"https://webapp.wisestamp.com/user/",login:"https://webapp.wisestamp.com/login",signup:"https://webapp.wisestamp.com/login?signup",help:"https://webapp.wisestamp.com/help",spread_the_word:"https://www.wisestamp.com/spread-the-word",signature_examples:"https://branding.wisestamp.com",uninstall:"https://www.wisestamp.com/after-uninstall",signature_settings:"https://webapp.wisestamp.com/signature_settings",settings:"https://webapp.wisestamp.com/settings",repair:"https://www.wisestamp.com/download",app_brand:"https://www.wisestamp.com/apps",manage:"https://www.wisestamp.com/manage",terms:"https://www.wisestamp.com/terms",privacy:"https://www.wisestamp.com/privacy-policy",help_switch:"https://help.wisestamp.com/knowledge-base/how-can-i-assign-my-signature-to-a-specific-email-address/",need_help:"https://help.wisestamp.com/knowledge-base/i-cant-login-to-my-account-what-should-i-do/",only_facebook_login:"https://webapp.wisestamp.com/login?only_facebook_login=true",only_google_login:"https://webapp.wisestamp.com/login?only_google_login=true",forgot_password:"https://webapp.wisestamp.com/forgot_password",pro_after_upgrade:"",not_pro_after_upgrade:""},apis:{data:"https://webapp.wisestamp.com/api/users/get",signatures:"https://webapp.wisestamp.com/api/signatures/render",authorize:"https://webapp.wisestamp.com/api/users/authorization",sync_user:"https://webapp.wisestamp.com/api/data/sync_user",secure:"https://webapp.wisestamp.com/",regular_notifications:"http://n.wisestamp.com",after_install_notifications:"http://n.wisestamp.com/after-install",news_notifications:"http://n.wisestamp.com/news",upgrade_promo_notifications:"http://n.wisestamp.com/upgrade-promo",user:"http://u.wisestamp.com",userFb:"http://u.wisestamp.com","static":"http://static.wisestamp.com",templates_page:"http://u.wisestamp.com/templates",promo_page:"http://static.wisestamp.com/promo/promo.html",help:"http://static.wisestamp.com/help_"+wisestamp.sys.platform+".html",stats:"http://s.wisestamp.com",pixel:"http://p1.wisestamp.com",promo:"http://pr1.wisestamp.com",redirect:"http://r1.wisestamp.com",update:"http://updates.wisestamp.com/version/",upload:"http://u.wisestamp.com/imageUpload",upload_preview:"http://u.wisestamp.com/previewUpload",preview_page:"http://wisestamp.com/preview?path=",images:"http://images.wisestamp.com/",share_facebook:"http://www.facebook.com/sharer.php?u=",share_twitter:"https://twitter.com/intent/tweet?text=",app_update_default:"http://updates.wisestamp.com/test/<id>.update.json",app_default:"http://apps.wisestamp.com/emailapps/<id>/?format=json",link_redirection_format:"http://s.wisestamp.com/links?url=<link>",redirect_flag:"http://s.wisestamp.com/api/client/get_client_cfg",extras:"http://ws-extras.appspot.com/api/extended_tests",wisestamp_ads:"http://ws-extras.appspot.com/ads/get_all",ad_inserted:"http://ws-extras.appspot.com/ads/insert",compose_pixel:"https://ws-stats.appspot.com/ga/pixel.png?dont_count=true",wstrack:"https://ws-stats.appspot.com/api/event",get_cookies:"https://webapp.wisestamp.com/api/users/get_cookies",create_user:"https://webapp.wisestamp.com/api/users/create",set_mappings:"https://webapp.wisestamp.com/api/data/set_mappings",update_settings:"https://webapp.wisestamp.com/api/users/update_settings",selectors:"https://s3.amazonaws.com/jsons.wisestamp.com/selectors.json",urls:"https://s3.amazonaws.com/jsons.wisestamp.com/urls.json",flags:"http://ws-flags.appspot.com/api/flags",check_feature:"http://ws-flags.appspot.com/api/check_feature",get_person:"http://ws-peeps.appspot.com/api/gp",default_promo_link:"http://ws-stats.appspot.com/r?rdata=eyJydXJsIjogImh0dHA6Ly93d3cud2lzZXN0YW1wLmNvbS8/dXRtX3NvdXJjZT1leHRlbnNpb24mdXRtX21lZGl1bT1lbWFpbCZ1dG1fY2FtcGFpZ249cHJvbW9fNDUiLCAiZSI6ICJwcm9tb180NV9jbGljayJ9",default_promo_pixel:"https://ws-stats.appspot.com/ga/pixel.png?dont_count=1&e=promo_45",personal_promo_pixel:"https://ws-stats.appspot.com/ga/pixel.png?dont_count=1&e=personal_promo",ws_stats_redirect:"http://ws-stats.appspot.com/r",create_auto_signature:"https://webapp.wisestamp.com/api/users/create_auto_signature",logout:"https://webapp.wisestamp.com/logout"},share_facebook:"http://www.facebook.com/sharer.php?u=http://www.wisestamp.com",share_twitter:"https://twitter.com/intent/tweet?text=I%20just%20created%20an%20Email%20Signature%20that%20really%20%E2%9C%94STANDS%20OUT%20with%20%E2%98%9B%20http%3A%2F%2Fwww.wisestamp.com.%20Thanks%20%40wisestamp!"},pro_marker:'<sup class="pro">pro</sup>'};
if(LOCALHOST_DEPLOY){wisestamp.config.urls.website.editor=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/";
wisestamp.config.urls.website.editor_user=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/user/";
wisestamp.config.urls.website.login=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/login";
wisestamp.config.urls.website.signup=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/login?signup";
wisestamp.config.urls.website.signature_settings=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/signature_settings";
wisestamp.config.urls.website.settings=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/settings";
wisestamp.config.urls.website.only_facebook_login=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/login?only_facebook_login=true";
wisestamp.config.urls.website.only_google_login=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/login?only_google_login=true";
wisestamp.config.urls.website.forgot_password=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/forgot_password";
wisestamp.config.urls.apis.data=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/api/users/get";
wisestamp.config.urls.apis.signatures=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/api/signatures/render";
wisestamp.config.urls.apis.secure=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/";
wisestamp.config.urls.apis.authorize=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/api/users/authorization";
wisestamp.config.urls.apis.sync_user=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/api/data/sync_user";
wisestamp.config.urls.apis.get_cookies=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/api/users/get_cookies";
wisestamp.config.urls.apis.create_user=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/api/users/create";
wisestamp.config.urls.apis.set_mappings=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/api/data/set_mappings";
wisestamp.config.urls.apis.update_settings=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/api/users/update_settings";
wisestamp.config.urls.apis.logout=LOCALHOST_PROTOCOL+"://local.wisestamp.com:"+LOCALHOST_HTTPS_PORT+"/logout";
wisestamp.config.urls.apis.selectors="https://s3.amazonaws.com/jsons.wisestamp.com/selectors-qa.json"
}if(REMOTE_QA_DEPLOY){wisestamp.config.urls.website.editor="https://"+REMOTE_QA_URL;
wisestamp.config.urls.website.editor_user="https://"+REMOTE_QA_URL+"user/";
wisestamp.config.urls.website.login="https://"+REMOTE_QA_URL+"login";
wisestamp.config.urls.website.signup="https://"+REMOTE_QA_URL+"login?signup";
wisestamp.config.urls.website.signature_settings="https://"+REMOTE_QA_URL+"signature_settings";
wisestamp.config.urls.website.settings="https://"+REMOTE_QA_URL+"settings";
wisestamp.config.urls.website.only_facebook_login="https://"+REMOTE_QA_URL+"login?only_facebook_login=true";
wisestamp.config.urls.website.only_google_login="https://"+REMOTE_QA_URL+"login?only_google_login=true";
wisestamp.config.urls.website.forgot_password="https://"+REMOTE_QA_URL+"forgot_password";
wisestamp.config.urls.apis.data="https://"+REMOTE_QA_URL+"api/users/get";
wisestamp.config.urls.apis.signatures="https://"+REMOTE_QA_URL+"api/signatures/render";
wisestamp.config.urls.apis.secure="https://"+REMOTE_QA_URL;
wisestamp.config.urls.apis.authorize="https://"+REMOTE_QA_URL+"api/users/authorization";
wisestamp.config.urls.apis.sync_user="https://"+REMOTE_QA_URL+"api/data/sync_user";
wisestamp.config.urls.apis.get_cookies="https://"+REMOTE_QA_URL+"api/users/get_cookies";
wisestamp.config.urls.apis.create_user="https://"+REMOTE_QA_URL+"api/users/create";
wisestamp.config.urls.apis.set_mappings="https://"+REMOTE_QA_URL+"api/data/set_mappings";
wisestamp.config.urls.apis.update_settings="https://"+REMOTE_QA_URL+"api/users/update_settings";
wisestamp.config.urls.apis.logout="https://"+REMOTE_QA_URL+"logout";
wisestamp.config.urls.apis.create_auto_signature="https://"+REMOTE_QA_URL+"api/users/create_auto_signature";
wisestamp.config.urls.apis.urls="https://s3.amazonaws.com/jsons.wisestamp.com/urls_qa.json";
wisestamp.config.urls.apis.selectors="https://s3.amazonaws.com/jsons.wisestamp.com/selectors-qa.json"
}wisestamp.tester_config=JSON.parse(JSON.stringify(wisestamp.config));
wisestamp.tester_config.urls.apis.regular_notifications="https://www.wisestamp.com/n/";
wisestamp.tester_config.urls.apis.after_install_notifications="https://www.wisestamp.com/n/after-install";
wisestamp.tester_config.urls.apis.news_notifications="https://www.wisestamp.com/n/news";
wisestamp.tester_config.urls.apis.upgrade_promo_notifications="https://www.wisestamp.com/n/upgrade-promo";
wisestamp.content_scripts=[{matches:["http://mail.google.com/*","https://mail.google.com/*"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/ui.js","content/src/menus.js","content/src/extras/inmail.js","content/src/content/_base.js","content/src/content/_web.js","content/src/content/gmail.js","content/src/extras/request_proxy.js","content/src/content/fb_token_refresh.js"],css:["content/css/web.css"]},{matches:["http://*.mail.yahoo.com/neo/*","https://*.mail.yahoo.com/neo/*","http://*.mail.yahoo.com/mc/*","https://*.mail.yahoo.com/mc/*","http://*.mail.yahoo.com/dc/*","https://*.mail.yahoo.com/dc/*"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/ui.js","content/src/menus.js","content/src/extras/inmail.js","content/src/content/_base.js","content/src/content/_web.js","content/src/content/yahoo.js","content/src/extras/request_proxy.js","content/src/content/fb_token_refresh.js"],css:["content/css/web.css"]},{matches:["http://*.mail.live.com/*","https://*.mail.live.com/*"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/ui.js","content/src/menus.js","content/src/extras/inmail.js","content/src/content/_base.js","content/src/content/_web.js","content/src/content/live.js","content/src/extras/request_proxy.js","content/src/content/fb_token_refresh.js"],css:["content/css/web.css"]},{matches:["http://*.webmail.aol.com/*","https://*.webmail.aol.com/*","http://*.mail.aol.com/*","https://*.mail.aol.com/*","http://mail.aol.com/*","https://mail.aol.com/*"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/ui.js","content/src/menus.js","content/src/extras/inmail.js","content/src/content/_base.js","content/src/content/_web.js","content/src/content/aol.js","content/src/extras/request_proxy.js","content/src/content/fb_token_refresh.js"],css:["content/css/web.css"]},{matches:["http://mail.rambler.ru/mail/compose.cgi*"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/ui.js","content/src/menus.js","content/src/content/_base.js","content/src/content/_web.js","content/src/content/rambler.js","content/src/content/fb_token_refresh.js"],css:["content/css/web.css"]},{matches:["http://inbox.google.com/*","https://inbox.google.com/*"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/ui.js","content/src/menus.js","content/src/extras/inmail.js","content/src/content/_base.js","content/src/content/_web.js","content/src/content/inbox.js","content/src/content/fb_token_refresh.js"],css:["content/css/web.css"]},{matches:["http://outlook.office365.com/*","https://outlook.office365.com/*","http://outlook.office.com/*","https://outlook.office.com/*","http://outlook.live.com/*","https://outlook.live.com/*","http://*.outlook.com/*","https://*.outlook.com/*"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/ui.js","content/src/menus.js","content/src/content/_base.js","content/src/content/_web.js","content/src/content/outlook.js","content/src/content/fb_token_refresh.js"],css:["content/css/web.css"]},{matches:["http://*.secureserver.net/*","https://*.secureserver.net/*","http://*.godaddy.com/*","https://*.godaddy.com/*"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/ui.js","content/src/menus.js","content/src/content/_base.js","content/src/content/_web.js","content/src/content/go_daddy.js","content/src/content/fb_token_refresh.js"],css:["content/css/web.css"]},{matches:["http://*.wisestamp.com/*","https://apps.wisestamp.com/*","http://appstest.wisestamp.com/*","http://local.wiseapps/*","http://www.give2gether.com/*","https://www.give2gether.com/*","http://give2gether.com/*","https://give2gether.com/*"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/ui.js","content/src/menus.js","content/src/content/_base.js","content/src/content/_web.js"]},{matches:["http://ws-web.appspot.com/*","http://ws-web-qa.appspot.com/*","http://ws-web-qa3.appspot.com/*","http://ws-web-qa4.appspot.com/*","http://ws-web-qa5.appspot.com/*","http://webapp.wisestamp.com/*","http://webapp-qa.wisestamp.com/*","http://webapp-qa3.wisestamp.com/*","http://webapp-qa4.wisestamp.com/*","http://webapp-qa5.wisestamp.com/*","https://ws-web.appspot.com/*","https://ws-web-qa.appspot.com/*","https://ws-web-qa3.appspot.com/*","https://ws-web-qa4.appspot.com/*","https://ws-web-qa5.appspot.com/*","https://webapp.wisestamp.com/*","https://webapp-qa.wisestamp.com/*","https://webapp-qa3.wisestamp.com/*","https://webapp-qa4.wisestamp.com/*","https://webapp-qa5.wisestamp.com/*","http://local.wisestamp.com:9081/*","https://local.wisestamp.com:8080/*"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/content/web_editor.js"]},{matches:["https://www.wisestamp.com/myinfo/*"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/ui.js","content/src/menus.js","content/src/content/myinfo.js"]},{matches:["safari-extension://*/*/background.html"],js:["content/src/third_party/jquery.js","content/src/common.js","content/src/utils.js","content/src/controller.js","content/src/message_handler.js","background.js"]}];
var wisestamp_is_active=function(){var a=this;
this.match=function(d,c){for(var b=0;
b<d.length;
b++){var e=d[b];
if(e==c){return true
}if(c.match(wisestamp_utils.wildcard_to_regex(e))!==null){return true
}}return false
};
this.is_script_active=function(f,b){switch(wisestamp.sys.platform){case"safari":for(var e=0;
e<wisestamp.content_scripts.length;
e++){var d=wisestamp.content_scripts[e];
if(a.match(d.matches,f)){for(name in d){if(name=="js"){var g=d.js;
for(var c=0;
c<g.length;
c++){if(b===g[c]){return true
}}}}}}return false;
default:return true
}}
};
wisestamp.is_active=new wisestamp_is_active;
if((typeof(wisestamp_jquery)==="undefined")&&(typeof(jQuery)!=="undefined")){wisestamp_jquery=jQuery
}if(typeof exports!=="undefined"){exports.wisestamp=wisestamp
};