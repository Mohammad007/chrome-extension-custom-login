var wisestamp_controller=new function(){var d=this;
var b=null;
var c=null;
var a=false;
this.init=function(e){if(c!==null){c=null
}d.get_storage().init(function(){if(d.is_logged_in()===true){c.delete_param("upgraded_from_legacy")
}if(typeof c.load_param("installed")==="undefined"){c.save_param("installed",Math.round(new Date().getTime()/1000));
d.on_first_run(function(){d.refresh(e)
})
}else{if(wisestamp_utils.get_version()!==c.load_param("version")){var f=c.load_param("flags");
if((typeof(f)==="object")&&(!(f===null))&&(f.show_notification_enabled===true)){d.inject_show_notification_script()
}if((typeof(f)==="object")&&(!(f===null))&&(f.open_after_upgrade_page===true)){var j={};
j.from_extension=true;
j.platform=wisestamp.sys.platform;
j.version=wisestamp_utils.get_version();
var g=c.load_param("user");
if(g){var i=g.plan;
var h="";
if(Number(i)<2){h=wisestamp.config.urls.website.not_pro_after_upgrade
}else{h=wisestamp.config.urls.website.pro_after_upgrade
}if(h.length>0){var k;
switch(wisestamp.sys.platform){case"firefox":k="firefox";
break;
case"chrome":k="chrome";
break;
case"safari":k="safari";
break;
default:k="";
break
}h=h.replace(/\{browser_name\}/g,k);
wisestamp_utils.open_tab(h)
}}}}d.refresh(e)
}c.save_param("version",wisestamp_utils.get_version())
})
};
this.on_first_run=function(e){d.inject_first_time_script(false);
d.get_cookies_data(function(g){if(!g){if(typeof c.load_param("install_time")==="undefined"){d.save_param("from_gallery",true);
d.on_install_params();
var f;
switch(wisestamp.sys.platform){case"firefox":f="gallery_ff";
break;
case"chrome":f="gallery_cr";
break;
case"safari":f="gallery_sf";
break;
default:f="gallery_unknown";
break
}wisestamp_utils.open_tab(wisestamp.config.urls.website.editor+"?from_gallery="+f);
if(typeof(e)==="function"){e()
}}else{console.log("Upgrading from legacy - thus not opening editor");
c.save_param("upgraded_from_legacy",true);
if(typeof(e)==="function"){e()
}}}else{d.on_install_params();
if(typeof(e)==="function"){e()
}}switch(wisestamp.sys.platform){case"safari":d.reload_all_wisestamp_tabs();
break
}})
};
this.reload_all_wisestamp_tabs=function(){var k=/^([^\/\?]*\/){2}([^\.\/\?]+\.)*wisestamp\.com(:[0-9]+)?\//gi;
switch(wisestamp.sys.platform){case"firefox":case"chrome":chrome.tabs.query({},function(l){for(var j in l){if(l[j].url.match(k)!==null){chrome.tabs.reload(l[j].id)
}}});
break;
case"safari":var e=safari.application.browserWindows;
for(var g=0;
g<e.length;
g++){var h=e[g].tabs;
for(var f=0;
f<h.length;
f++){if(h[f].url.match(k)!==null){h[f].url=h[f].url
}}}break
}};
this.reload_active_tab=function(){switch(wisestamp.sys.platform){case"firefox":case"chrome":chrome.tabs.query({active:true},function(f){chrome.tabs.reload(f.id)
});
break;
case"safari":var e=safari.application.activeBrowserWindow.activeTab;
e.url=e.url;
break
}};
this.on_install_params=function(){tracker.ga_track("extension","install");
d.ws_track({e:"install"});
var e=Math.round(new Date().getTime()/1000);
c.save_param("installed",e);
c.save_param("last_notified",e);
c.save_param("version",wisestamp_utils.get_version());
c.save_param("first_run",true)
};
this.get_cookies_data=function(f){var e=undefined;
d.read_all_cookies(wisestamp.config.urls.website.editor,function(j){try{if(j!==null&&typeof j==="object"){for(var g in j){switch(j[g].name){case"ws_token":e=wisestamp_utils.get_wisestamp_uid_from_token(j[g].value);
if(e){c.save_param("wisestamp_uid",e)
}break;
case"wisestamp_uid":if(typeof(e)==="undefined"){e=j[g].value;
c.save_param("wisestamp_uid",e)
}break;
case"mp_active":c.save_param("mp_active",true);
break;
case"run_test":try{var h=JSON.parse(wisestamp_utils.atob(j[g].value));
c.save_param("ws_smg_currentTest",h)
}catch(k){console.error("Failed test store")
}break
}}}}catch(k){console.error("Exception in cookie reading: ",k)
}if(typeof(f)==="function"){f(e)
}})
};
this.is_fb_token_refresh_needed=function(){if(typeof c.load_param("fb_token_expiry")==="undefined"){return false
}var e=new Date().getTime();
if(typeof c.load_param("fb_token_expiry")*1000-e<1000*60*60*24*7){return true
}return false
};
this.refresh=function(f){d.refresh_ping();
var e=function(j){var n=j.signatures;
var l=function(){d.save_param("signatures",n,true)
};
d.save_param("mappings",j.mappings);
d.save_param("user",j.user);
d.save_param("prefs",j.prefs);
if(!(typeof(d.load_param("enabled"))==="boolean")){d.save_param("enabled",true)
}d.save_param("version",wisestamp_utils.get_version());
d.save_param("fb_token_expiry",j.fb_token_expiry);
d.save_param("created",j.created);
d.delete_param("first_run");
d.update_extension_icon();
var g=d.load_param("wisestamp_uid");
var i=0;
var h=0;
var k;
for(k in n){i++
}for(k in n){var m={signature_id:k};
m.from_extension=true;
m.platform=wisestamp.sys.platform;
m.version=wisestamp_utils.get_version();
if(g){m.wisestamp_uid=g
}wisestamp_utils.send_get_request(wisestamp.config.urls.apis.signatures,m,function(o){n[o.signature_id]=o;
h++;
if(h===i){l()
}},"json")
}if(typeof(f)==="function"){f()
}};
d.get_cookies_data(function(){if(!d.load_param("tester_config")){wisestamp_utils.send_get_request(wisestamp.config.urls.apis.flags,{},function(k){d.save_param("flags",k);
if((typeof(k)==="object")&&(!(k===null))&&(typeof(k.depending_on_counter)==="object")&&(k.depending_on_counter.length>0)){for(var l=0;
l<k.depending_on_counter.length;
l++){var j=k.depending_on_counter[l];
if(typeof(j)==="string"){d.check_feature_and_save_in_flags(j)
}}}},"json")
}var h={uid:c.load_param("wisestamp_uid")};
if(d.load_param("nopromo")){h.nopromo=true
}h.from_extension=true;
h.without_signatures=true;
h.platform=wisestamp.sys.platform;
h.version=wisestamp_utils.get_version();
var g=d.load_param("last_mail_service");
if(g){g=g.toLowerCase().replace(/ /g,"");
h.last_mail_service=g
}wisestamp_utils.send_get_request(wisestamp.config.urls.apis.data,h,e,"json");
wisestamp_utils.send_get_request(wisestamp.config.urls.apis.selectors,{},function(i){d.save_param("selectors",i,true)
},"json");
wisestamp_utils.send_get_request(wisestamp.config.urls.apis.urls,{},function(n){d.save_param("urls",n);
var l=n.uninstall_url;
var k=wisestamp_utils.get_version();
var j=wisestamp.sys.platform;
var i=d.load_param("wisestamp_uid");
l=l.replace(/<!-- wisestamp_uid -->/g,i);
l=l.replace(/<!-- version -->/g,k);
l=l.replace(/<!-- platform -->/g,j);
switch(wisestamp.sys.platform){case"chrome":try{chrome.runtime.setUninstallURL(l)
}catch(m){console.error(m)
}break
}},"json");
tracker.identify(c.load_param("wisestamp_uid"));
if(b!==null){wisestamp_utils.clearTimeout(b);
b=null
}b=wisestamp_utils.setTimeout(function(){d.refresh()
},12*60*60*1000)
})
};
this.refresh_ping=function(){tracker.ga_track("extension","ping");
switch(wisestamp.sys.platform){case"firefox":break;
case"chrome":case"safari":default:if(!c.load_param("wisestamp_uid")){var e;
if(!c.load_param("temp_uid")){e=(new Date().getTime()+"_"+Math.floor((Math.random()*900000000000000)+100000000000000));
c.save_param("temp_uid",e)
}else{e=c.load_param("temp_uid")
}d.ws_track({uping:true,temp_uid:e})
}else{d.ws_track({uping:true})
}break
}};
this.ready=function(e){if(typeof e==="undefined"){return a
}a=e
};
this.get_storage=function(){if(!c){switch(wisestamp.sys.platform){case"firefox":case"chrome":case"safari":c=new wisestamp_db_storage;
break
}}return c
};
this.get_signature_html=function(e,f){c.load_param("signatures",function(g){if(e!=="None"){f(g[e].html)
}else{f("")
}},true)
};
this.get_signatures_list=function(){var e={};
var f=c.load_param("signatures",true,true);
for(var g in f){e[g]=f[g].title
}return e
};
this.get_data=function(){wisestamp_utils.log("[wisestamp_controller::get_data] >>>>>");
return d.get_storage().get_data()
};
this.default_sig_id=function(){return wisestamp_utils.object_keys(c.load_param("signatures",true,true))[0]
};
this.save_param=function(f,g,e){if((f==="signatures")||(f==="selectors")){e=true
}wisestamp_utils.log("[wisestamp_controller::save_param] param_id = "+f+", value = "+JSON.stringify(g)+", async = "+e+" >>>>>");
d.get_storage().save_param(f,g,e);
wisestamp_utils.log("[wisestamp_controller::save_param] param_id = "+f+", value = "+JSON.stringify(g)+", async = "+e+" <<<<<")
};
this.load_param=function(f,h,e){if((f==="signatures")||(f==="selectors")){e=true
}wisestamp_utils.log("[wisestamp_controller::load_param] param_id = "+f+", async = "+e+" >>>>>");
var g=d.get_storage().load_param(f,h,e);
wisestamp_utils.log("[wisestamp_controller::load_param] param_id = "+f+", value = "+JSON.stringify(g)+", async = "+e+" <<<<<");
return g
};
this.delete_param=function(e){wisestamp_utils.log("[wisestamp_controller::delete_param] param_id = "+e+" >>>>>");
d.get_storage().delete_param(e)
};
this.inject_first_time_script=function(h){var n=/^([^\/\?]*\/){2}([^\.\/\?]+\.)*wisestamp\.com(:[\d]{4})?\//gi;
var p=["http://webapp.wisestamp.com/*","https://webapp.wisestamp.com/*","http://webapp-qa.wisestamp.com/*","https://webapp-qa.wisestamp.com/*","http://webapp-qa3.wisestamp.com/*","http://webapp-qa4.wisestamp.com/*","http://webapp-qa5.wisestamp.com/*","https://webapp-qa3.wisestamp.com/*","https://webapp-qa4.wisestamp.com/*","https://webapp-qa5.wisestamp.com/*","http://local.wisestamp.com/*","https://local.wisestamp.com/*"];
var f=wisestamp_utils.get_url("content/src/common/first_time_script.js");
var k=wisestamp_utils.get_relative_url("content/src/common/first_time_script.js");
switch(wisestamp.sys.platform){case"firefox":case"chrome":chrome.tabs.query({},function(q){for(var j in q){if(q[j].url.match(n)!==null){chrome.tabs.executeScript(q[j].id,{file:k})
}}});
break;
case"safari":var o=false;
var g=safari.application.browserWindows;
for(var m=0;
m<g.length;
m++){var e=g[m].tabs;
for(var l=0;
l<e.length;
l++){if(e[l].url.match(n)!==null){o=true
}}}if(o){safari.extension.addContentScriptFromURL(f,p,[],true);
if(h){d.reload_all_wisestamp_tabs()
}}break
}};
this.disable_inject_first_time_script=function(f){var e=wisestamp_utils.get_url("content/src/common/first_time_script.js");
switch(wisestamp.sys.platform){case"safari":safari.extension.removeContentScript(e);
if(f){d.reload_all_wisestamp_tabs()
}break
}};
this.inject_show_notification_script=function(){var h=/^([^\/\?]*\/){2}([^\.\/\?]+\.)*(mail\.google\.com|mail\.yahoo\.com|mail\.live\.com|mail\.aol\.com|webmail\.aol\.com|mail\.rambler\.ru|inbox\.google\.com|outlook\.office365\.com|outlook\.office\.com|outlook\.live\.com|outlook\.com|secureserver\.net|godaddy\.com)\//gi;
var f=["http://mail.google.com/*","https://mail.google.com/*","http://*.mail.yahoo.com/neo/*","https://*.mail.yahoo.com/neo/*","http://*.mail.yahoo.com/mc/*","https://*.mail.yahoo.com/mc/*","http://*.mail.yahoo.com/dc/*","https://*.mail.yahoo.com/dc/*","http://*.mail.live.com/*","https://*.mail.live.com/*","http://*.webmail.aol.com/*/Suite.aspx","http://*.webmail.aol.com/*/suite.aspx","http://*.mail.aol.com/*/suite.aspx","http://*.mail.aol.com/*/Suite.aspx","http://mail.aol.com/*/suite.aspx","http://mail.aol.com/*/Suite.aspx","https://*.webmail.aol.com/*/Suite.aspx","https://*.webmail.aol.com/*/suite.aspx","https://*.mail.aol.com/*/suite.aspx","https://*.mail.aol.com/*/Suite.aspx","https://mail.aol.com/*/suite.aspx","https://mail.aol.com/*/Suite.aspx","http://mail.rambler.ru/mail/compose.cgi*","http://inbox.google.com/*","https://inbox.google.com/*","http://outlook.office365.com/*","https://outlook.office365.com/*","http://outlook.office.com/*","https://outlook.office.com/*","http://outlook.live.com/*","https://outlook.live.com/*","http://*.outlook.com/*","https://*.outlook.com/*","http://*.secureserver.net/*","https://*.secureserver.net/*","http://*.godaddy.com/*","https://*.godaddy.com/*"];
var e=wisestamp_utils.get_url("content/src/common/show_notification_script.js");
var g=wisestamp_utils.get_relative_url("content/src/common/show_notification_script.js");
switch(wisestamp.sys.platform){case"firefox":case"chrome":chrome.tabs.query({},function(k){for(var j in k){if(k[j].url.match(h)!==null){chrome.tabs.executeScript(k[j].id,{file:g})
}}});
break;
case"safari":safari.extension.addContentScriptFromURL(e,f,[],true);
break
}};
this.disable_inject_show_notification_script=function(){var e=wisestamp_utils.get_url("content/src/common/show_notification_script.js");
switch(wisestamp.sys.platform){case"safari":safari.extension.removeContentScript(e);
break
}};
this.read_all_cookies=function(e,f){switch(wisestamp.sys.platform){case"firefox":case"chrome":chrome.cookies.getAll({url:e},function(g){if(typeof(f)==="function"){f(g)
}});
break;
case"safari":switch(e){case wisestamp.config.urls.website.editor:wisestamp_utils.send_get_request(wisestamp.config.urls.apis.get_cookies,undefined,function(g){if(typeof(f)==="function"){f(g)
}},"json");
break
}break
}};
this.check_feature_and_save_in_flags=function(f){var e=d.load_param(f);
if((typeof(e)==="boolean")&&(e===true)){d.save_feature_in_flags(f,e)
}else{wisestamp_utils.send_get_request(wisestamp.config.urls.apis.check_feature,{feature_name:f},function(h){if((typeof(h)==="object")&&(!(h===null))){var g=h[f];
if(typeof(g)==="boolean"){d.save_param(f,g);
d.save_feature_in_flags(f,g)
}}},"json")
}};
this.save_feature_in_flags=function(g,f){var e=d.load_param("flags");
e[g]=f;
d.save_param("flags",e)
};
this.is_logged_in=function(){return wisestamp_utils.is_logged_in(d.load_param("wisestamp_uid"))
};
this.ws_track=function(f,e){f.from_extension=true;
f.platform=wisestamp.sys.platform;
f.version=wisestamp_utils.get_version();
f.wisestamp_uid=d.load_param("wisestamp_uid");
f=Object.assign(f,e);
tracker.ws_track(f)
};
this.update_extension_icon=function(){switch(wisestamp.sys.platform){case"chrome":var f=c.load_param("enabled");
var e=c.load_param("wisestamp_uid");
if((wisestamp_utils.is_logged_in(e))&&(f)){chrome.browserAction.setIcon({path:"/content/img/logo/wisestamp_logo_64.png"})
}else{chrome.browserAction.setIcon({path:"/content/img/logo/wisestamp_logo_not_logged_in_or_disabled_64.png"})
}break
}}
};
wisestamp_controller.init();
if(typeof exports!=="undefined"){exports.wisestamp_controller=wisestamp_controller
};