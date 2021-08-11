var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/go_daddy.js");
wisestamp_utils.log("go_daddy.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){wisestamp_utils.log("[wisestamp_content_go_daddy] >>>>>");
var wisestamp_content_go_daddy=function(){this.m_content_type="GoDaddy";
this.m_init_conduit=true;
this.m_wisestamp_inmail_promo_enabled=true;
this.m_space_before_signature=2;
this.m_space_before_quote=0;
this.m_thread_timeout=250;
this.m_delay_after_load=300;
this.m_menu_direction="bottom";
this.m_control_signature_insertion_direction="bottom";
this.m_control_signature_insertion_top_offset=0;
switch(wisestamp.sys.platform){case"chrome":case"safari":this.m_control_signature_insertion_left_offset=-10;
break;
case"firefox":this.m_control_signature_insertion_left_offset=-3;
break;
default:this.m_control_signature_insertion_left_offset=0;
break
}this.check_action_conduit_setup_compose=0;
this.wisestamp_uid=false;
this.enabled=true;
this.assigned_signature=[];
var d=this;
var a=false;
var b={};
this.init=function(){wisestamp_utils.log("[wisestamp_content_go_daddy::init] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
wisestamp_utils.send_request({command:"load_param",param:["selectors","urls","version","wisestamp_uid","enabled","control_signature_insertion_done","dont_show_login_popup","flags","installed","assigned_signature"]},function(g){if(wisestamp.sys.platform==="safari"){g=JSON.parse(g)
}if(g.selectors&&g.selectors.godaddy){b=g.selectors.godaddy
}d.urls=g.urls;
d.version=g.version;
d.wisestamp_uid=g.wisestamp_uid;
d.enabled=g.enabled;
d.assigned_signature=g.assigned_signature||[];
a=g.control_signature_insertion_done;
d.dont_show_login_popup=g.dont_show_login_popup;
flags=g.flags;
if((typeof(flags)==="object")&&(!(flags===null))&&(flags.personal_promo_enabled===true)){d.m_wisestamp_personal_promo_enabled=true
}if((typeof(flags)==="object")&&(!(flags===null))&&(flags.personal_signature_enabled===true)){d.m_wisestamp_personal_signature_enabled=true
}c.init();
if(typeof wisestamp_inmail_promo!=="undefined"){wisestamp_inmail_promo.init(d)
}wisestamp_utils.setTimeout(function(){if(!wisestamp_jquery(".wisestamp-login").length){d.after_add_top_menu()
}},1500);
wisestamp_utils.setTimeout(function(){var e=d.get_user_id().trim().toLowerCase();
if(wisestamp_utils.validate_email(e)){if(g.installed>1488876527&&d.assigned_signature.indexOf(e)==-1){d.open_assign_signature_to_email_address_popup(e,true)
}}},1500);
function f(){wisestamp_utils.log("[wisestamp_content_go_daddy::init::listen] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
d.listen({editor:{location:"https://*.mail.live.com/*RteFrame*",selector:{tagName:"iframe",className:"RichText"},reply_indicator:/SkyDrivePlaceholder/}})
}if(wisestamp.sys.platform==="firefox"){try{document.createEvent("CustomEvent");
f()
}catch(h){window.addEventListener("DOMNodeInserted",function(e){d.on_dom_node_inserted(e)
},false)
}}else{f()
}wisestamp_utils.log("[wisestamp_content_go_daddy::init] <<<<<")
})
};
this.setup_wisestamp_compose=function(g,f){function e(h){d.m_current_editor_body=h;
wisestamp_utils.setTimeout(function(){c.setup_wisestamp_compose(h,true)
},1000)
}if(typeof g==="undefined"){d.get_editor(null,e)
}else{e(g)
}};
this.get_editor=function(e,j){wisestamp_utils.log("[wisestamp_content_go_daddy::get_editor] >>>>>");
var h=null;
for(var f in b.editor_iframe){h=wisestamp_ui.find_element_recursively(b.editor_iframe[f],e);
if(!(h==null||h.length===0)){break
}}if(h==null||h.length===0){wisestamp_utils.log("[wisestamp_content_go_daddy::get_editor] didn't find visible editor iframe >>>>>");
return null
}var g=wisestamp_jquery(wisestamp_ui.get_iframe_document(h[0])).find(b.editor.join(", "));
if(g==null||g.length===0){wisestamp_utils.log("[wisestamp_content_go_daddy::get_editor] didn't find editor in iframe >>>>>");
return null
}wisestamp_utils.log("[wisestamp_content_go_daddy::get_editor] found visible editor >>>>>");
if(typeof(j)==="function"){wisestamp_utils.setTimeout(function(){j(g)
},500)
}};
this.get_disabled_editor=function(e,j){wisestamp_utils.log("[wisestamp_content_go_daddy::get_disabled_editor] >>>>>");
var h=null;
for(var f in b.editor_iframe){h=wisestamp_ui.find_element_recursively(b.disabled_editor_iframe[f],e);
if(!(h==null||h.length===0)){var g=wisestamp_jquery(wisestamp_ui.get_iframe_document(h[0])).find(b.disabled_editor.join(", "));
g.each(function(){wisestamp_utils.log("[wisestamp_content_go_daddy::get_editor] found disabled editor >>>>>");
if(typeof(j)==="function"){j(wisestamp_jquery(this))
}})
}}};
this.disable_editor=function(e){wisestamp_utils.log("[wisestamp_content_go_daddy::disable_editor] >>>>>");
d.remove_wisestamp_compose(e)
};
this.insert_wisestamp_icon=function(){wisestamp_utils.log("[wisestamp_content_go_daddy::insert_wisestamp_icon] >>>>>");
if(!wisestamp_utils.is_logged_in(d.wisestamp_uid)){wisestamp_utils.log("[wisestamp_content_go_daddy::insert_wisestamp_icon] User is not logged in. <<<<<");
return
}if(wisestamp_jquery("#wisestamp-icon").length>0){wisestamp_utils.log("[wisestamp_content_go_daddy::insert_wisestamp_icon] Already added. <<<<<");
return
}var g=wisestamp_ui.find_element_recursively(b.toolbar.join(", "),document);
if(g===null){wisestamp_utils.log("[wisestamp_content_go_daddy::insert_wisestamp_icon] toolbar = null <<<<<");
return
}wisestamp_utils.log("[wisestamp_content_go_daddy::insert_wisestamp_icon] adding icon...");
var f=g[0].ownerDocument;
var e=wisestamp_jquery('<td id="wisestamp-icon" />',f);
e.css({display:"table",padding:"0px",margin:"0px",position:"relative",left:"0px",top:"3px"});
e.append(d.get_wisestamp_compose_icon(f));
g.append(e);
d.update_wisestamp_compose_image();
if(typeof(a)==="undefined"){a=true;
wisestamp_utils.send_request({command:"save_param",param:"control_signature_insertion_done",value:true},function(){});
d.open_control_signature_insertion(e,f)
}};
this.get_user_id=function(){wisestamp_utils.log("[wisestamp_content_go_daddy::get_user_id] >>>>>");
var e=null;
for(var g in b.user_id){e=wisestamp_ui.find_element_recursively(b.user_id[g],document);
if((!(e==null))&&(e.length===1)){break
}}if((!(e==null))&&(e.length===1)){var f=e.text();
f=wisestamp_jquery.trim(f);
if((f.indexOf("<")>=0)&&(f.indexOf(">")>=0)){f=f.substring(f.indexOf("<")+1,f.indexOf(">"))
}f=f.toLowerCase();
if(wisestamp_utils.validate_email(f)){wisestamp_utils.log('[wisestamp_content_go_daddy::get_user_id] selectors.user_id, user_id = "'+f+'" <<<<<');
return f
}}var f="";
wisestamp_utils.log('[wisestamp_content_go_daddy::get_user_id] user_id = "'+f+'" <<<<<');
return f
};
this.get_quote_element=function(e){return e.find(b.quote_element.join(", "))
};
this.generate_session_id=function(){return wisestamp_utils.md5("--- "+d.wisestamp_uid+" ---")
};
this.get_editor_parent_div=function(f){var h=wisestamp_jquery(f);
var g=h[0].ownerDocument.defaultView.frameElement;
var e=((g===null)?h:wisestamp_jquery(g)).parents(b.editor_parent_div.join(", "));
return e
};
this.update_all_promos=function(){d.get_editor(document,function(e){if((!(e===null))&&(typeof(e)==="object")&&(e.length>0)){d.update_promo(e[0],false)
}})
};
this.update_promo=function(k,r){if(!(typeof(k)==="undefined")){var e=wisestamp_jquery(k);
var j=e.find('div[href="http://WS_promo"]');
if(j.length>=1){var p=false;
var l=false;
var o;
var h;
var m=d.get_editor_parent_div(k);
var n=m.find(b.recipients_div.join(", "));
var f=n.find(b.total_recipients_email_elements.join(", "));
var i=n.find(b.to_recipients_email_elements.join(", "));
var g=n.find(b.to_recipients_name_elements.join(", "));
if((f.length===1)&&(i.length===1)&&(g.length===1)){var q=wisestamp_utils.trim_spaces_and_commas(f.text());
o=wisestamp_utils.trim_spaces_and_commas(i.text());
h=wisestamp_utils.trim_spaces_and_commas(g.text());
if((q===o)&&(q===h)){if((typeof(h)==="string")&&(h.length>0)&&(!(h.indexOf(",")>=0))&&(!(h.indexOf(";")>=0))){h=wisestamp_utils.trim_recipient_name(h);
if((typeof(h)==="string")&&(h.length>0)&&(!(h.indexOf("@")>=0))){l=true
}}if((typeof(o)==="string")&&(o.length>0)&&(!(o.indexOf(",")>=0))&&(!(o.indexOf(";")>=0))){o=wisestamp_utils.trim_recipient_email(o);
if((typeof(o)==="string")&&(o.length>0)){if(wisestamp_utils.validate_email(o)){p=true
}}}}}d.handle_update_promo(r,e,j,p,l,o,h)
}}};
var c=null;
this.set_super=function(e){c=e;
c.construct(this)
}
};
wisestamp_content_go_daddy.prototype=wisestamp_obj_web;
var wisestamp_obj_godaddy=new wisestamp_content_go_daddy();
wisestamp_obj_godaddy.set_super(wisestamp_obj_web);
wisestamp_obj_godaddy.init();
wisestamp_content=wisestamp_obj_godaddy
};