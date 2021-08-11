var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/live.js");
wisestamp_utils.log("live.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){wisestamp_utils.log("[wisestamp_content_live] >>>>>");
var wisestamp_content_live=function(){this.m_content_type="Live";
this.m_init_conduit=true;
this.m_wisestamp_inmail_promo_enabled=true;
this.m_space_before_signature=2;
this.m_space_before_quote=0;
this.m_thread_timeout=250;
this.m_delay_after_load=300;
this.m_control_signature_insertion_top_offset=-2;
this.m_control_signature_insertion_left_offset=0;
this.wisestamp_uid=false;
this.enabled=true;
var e=this;
var a=false;
var c={};
var b={};
this.init=function(){wisestamp_utils.log("[wisestamp_content_live::init] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
wisestamp_utils.send_request({command:"load_param",param:["selectors","urls","version","wisestamp_uid","enabled","control_signature_insertion_done","dont_show_login_popup","flags"]},function(g){if(wisestamp.sys.platform==="safari"){g=JSON.parse(g)
}if(g.selectors&&g.selectors.live){c=g.selectors.live
}e.urls=g.urls;
e.version=g.version;
e.wisestamp_uid=g.wisestamp_uid;
e.enabled=g.enabled;
a=g.control_signature_insertion_done;
e.dont_show_login_popup=g.dont_show_login_popup;
b=g.flags;
if((typeof(b)==="object")&&(!(b===null))&&(b.personal_promo_enabled===true)){e.m_wisestamp_personal_promo_enabled=true
}if((typeof(b)==="object")&&(!(b===null))&&(b.personal_signature_enabled===true)){e.m_wisestamp_personal_signature_enabled=true
}d.init();
if(typeof wisestamp_inmail_promo!=="undefined"){wisestamp_inmail_promo.init(e)
}function f(){wisestamp_utils.log("[wisestamp_content_live::init::listen] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
e.listen({editor:{location:"https://*.mail.live.com/*RteFrame*",selector:{tagName:"iframe",className:"RichText"},reply_indicator:/SkyDrivePlaceholder/}})
}if(wisestamp.sys.platform==="firefox"){try{document.createEvent("CustomEvent");
f()
}catch(h){window.addEventListener("DOMNodeInserted",function(i){e.on_dom_node_inserted(i)
},false)
}}else{f()
}wisestamp_utils.log("[wisestamp_content_live::init] <<<<<")
})
};
this.setup_wisestamp_compose=function(h,g){function f(i){e.m_current_editor_body=i;
wisestamp_utils.setTimeout(function(){d.setup_wisestamp_compose(i,true)
},1000)
}if(typeof h==="undefined"){e.get_editor(null,f)
}else{f(h)
}};
this.get_editor=function(f,k){wisestamp_utils.log("[wisestamp_content_live::get_editor] >>>>>");
var j=null;
for(var g in c.editor_iframe){j=wisestamp_ui.find_element_recursively(c.editor_iframe[g],f);
if(!(j==null||j.length===0)){break
}}if(j==null||j.length===0){wisestamp_utils.log("[wisestamp_content_live::get_editor] didn't find visible editor iframe >>>>>");
return null
}var h=wisestamp_jquery(wisestamp_ui.get_iframe_document(j[0])).find(c.editor.join(", "));
if(h==null||h.length===0){wisestamp_utils.log("[wisestamp_content_live::get_editor] didn't find editor in iframe >>>>>");
return null
}wisestamp_utils.log("[wisestamp_content_live::get_editor] found visible editor >>>>>");
if(typeof(k)==="function"){k(h)
}};
this.insert_wisestamp_icon=function(){wisestamp_utils.log("[wisestamp_content_live::insert_wisestamp_icon] >>>>>");
if(!wisestamp_utils.is_logged_in(e.wisestamp_uid)){wisestamp_utils.log("[wisestamp_content_live::insert_wisestamp_icon] User is not logged in. <<<<<");
return
}var h=wisestamp_ui.find_element_recursively(c.toolbar.join(", "),document);
if(h===null){wisestamp_utils.log("[wisestamp_content_live::insert_wisestamp_icon] toolbar = null <<<<<");
return
}wisestamp_utils.log("[wisestamp_content_live::insert_wisestamp_icon] adding icon...");
var g=h[0].ownerDocument;
var f=wisestamp_jquery('<li id="wisestamp-icon"></li>',g);
f.css({padding:"3px 0px 0px 2px",margin:"0px",position:"relative",left:"3px",top:"0px"});
f.append(e.get_wisestamp_compose_icon(g));
h.css({overflow:"visible"});
h.find(c.toolbar_list.join(", ")).append(f);
e.update_wisestamp_compose_image();
if(typeof(a)==="undefined"){a=true;
wisestamp_utils.send_request({command:"save_param",param:"control_signature_insertion_done",value:true},function(){});
e.open_control_signature_insertion(f,g)
}};
this.get_user_id=function(){wisestamp_utils.log("[wisestamp_content_live::get_user_id] >>>>>");
var f=null;
for(var h in c.user_id){f=wisestamp_ui.find_element_recursively(c.user_id[h],document);
if((!(f==null))&&(f.length===1)){break
}}if((!(f==null))&&(f.length===1)){var g=f.html().toLowerCase();
if(wisestamp_utils.validate_email(g)){wisestamp_utils.log('[wisestamp_content_live::get_user_id] selectors.user_id, user_id = "'+g+'" <<<<<');
return g
}}var g="";
wisestamp_utils.log('[wisestamp_content_live::get_user_id] user_id = "'+g+'" <<<<<');
return g
};
this.setup_mapping=function(){var g=wisestamp_ui.find_element_recursively(c.senders_elements.join(", "),document);
if(g==null||g.length===0){return
}for(var f=0;
f<g.length;
f++){wisestamp_jquery(g[f]).click(function(){e.insert_mapped_signature(wisestamp_jquery(this).html(),true)
})
}};
this.get_quote_element=function(f){return f.find(c.quote_element.join(", "))
};
this.generate_session_id=function(){return wisestamp_utils.md5("--- "+e.wisestamp_uid+" ---")
};
this.close_wisestamp_menu_event=function(h,g){var f=wisestamp_jquery(c.close_wisestamp_menu_event.join(", "));
if(f.length>0){f.unbind(h);
if(typeof(g)==="function"){f.bind(h,g)
}}};
this.get_editor_parent_div=function(g){var i=wisestamp_jquery(g);
var h=i[0].ownerDocument.defaultView.frameElement;
var f=((h===null)?i:wisestamp_jquery(h)).parents(c.editor_parent_div.join(", "));
return f
};
this.update_all_promos=function(){e.get_editor(document,function(f){if((!(f===null))&&(typeof(f)==="object")&&(f.length>0)){e.update_promo(f[0],false)
}})
};
this.update_promo=function(l,r){if(!(typeof(l)==="undefined")){var f=wisestamp_jquery(l);
var k=f.find('div[href="http://WS_promo"]');
if(k.length>=1){var q=false;
var m=false;
var p;
var i;
var n=e.get_editor_parent_div(l);
var o=n.find(c.recipients_div.join(", "));
var g=o.find(c.total_recipients_email_elements.join(", "));
var j=o.find(c.to_recipients_email_elements.join(", "));
var h=j.find(c.to_recipients_name_elements.join(", "));
if((g.length===1)&&(j.length===1)&&(h.length===1)){p=j.attr(c.recipient_email_attr);
i=h.text();
i=wisestamp_utils.trim_recipient_name(i);
if((typeof(i)==="string")&&(i.length>0)&&(!(i.indexOf("@")>=0))){m=true
}p=wisestamp_utils.trim_recipient_email(p);
if((typeof(p)==="string")&&(p.length>0)){if(wisestamp_utils.validate_email(p)){q=true
}}}e.handle_update_promo(r,f,k,q,m,p,i)
}}};
var d=null;
this.set_super=function(f){d=f;
d.construct(this)
}
};
wisestamp_content_live.prototype=wisestamp_obj_web;
var wisestamp_obj_live=new wisestamp_content_live();
wisestamp_obj_live.set_super(wisestamp_obj_web);
wisestamp_obj_live.init();
wisestamp_content=wisestamp_obj_live
};