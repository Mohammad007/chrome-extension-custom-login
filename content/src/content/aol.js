var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/aol.js");
wisestamp_utils.log("aol.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){wisestamp_utils.log("[wisestamp_content_aol] >>>>>");
var wisestamp_content_aol=function(){this.m_content_type="AOL";
this.m_init_conduit=true;
this.m_wisestamp_inmail_promo_enabled=true;
this.m_space_before_signature=2;
this.m_space_before_quote=1;
this.m_delay_after_load=1000;
this.m_control_signature_insertion_top_offset=-2;
this.m_control_signature_insertion_left_offset=2;
this.wisestamp_uid=false;
this.enabled=true;
this.assigned_signature=[];
var e=this;
var a=false;
var c={};
var b={};
this.init=function(){wisestamp_utils.log("[wisestamp_content_aol::init] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
wisestamp_utils.send_request({command:"load_param",param:["selectors","urls","version","wisestamp_uid","enabled","control_signature_insertion_done","dont_show_login_popup","flags","installed","assigned_signature"]},function(f){if(wisestamp.sys.platform==="safari"){f=JSON.parse(f)
}if(f.selectors&&f.selectors.aol){c=f.selectors.aol
}e.urls=f.urls;
e.version=f.version;
e.installed=f.installed;
e.wisestamp_uid=f.wisestamp_uid;
e.enabled=f.enabled;
a=f.control_signature_insertion_done;
e.assigned_signature=f.assigned_signature||[];
e.dont_show_login_popup=f.dont_show_login_popup;
b=f.flags;
if((typeof(b)==="object")&&(!(b===null))&&(b.personal_promo_enabled===true)){e.m_wisestamp_personal_promo_enabled=true
}if((typeof(b)==="object")&&(!(b===null))&&(b.personal_signature_enabled===true)){e.m_wisestamp_personal_signature_enabled=true
}d.init();
if(typeof wisestamp_inmail_promo!=="undefined"){wisestamp_inmail_promo.init(e)
}e.run_thread();
wisestamp_utils.log("[wisestamp_content_aol::init] <<<<<")
})
};
this.get_editor=function(f,h){wisestamp_utils.log("[wisestamp_content_aol::get_editor] >>>>>");
var g=null;
c.editor.forEach(function(i){g=wisestamp_ui.find_element_recursively(i,f);
if((!(g===null))&&(typeof(g)==="object")&&(g.length>0)&&wisestamp_jquery(g).is(":visible")){g.each(function(){wisestamp_utils.log("[wisestamp_content_aol::get_editor] found editor >>>>>");
if(typeof(h)==="function"){h(wisestamp_jquery(this))
}})
}});
if(g===null||g.length===0||!wisestamp_jquery(g).is(":visible")){if(typeof(h)==="function"){h(g)
}return null
}if(wisestamp_jquery(".contentEditDiv").closest("#composeMessage").parent().hasClass("dijitHidden")){wisestamp_utils.log("[wisestamp_content_aol::get_editor] not in compose");
e.set_wisestamped(g,false);
if(typeof(h)==="function"){h(g)
}return null
}wisestamp_utils.log("[wisestamp_content_aol::get_editor] found visible editor >>>>>");
if(typeof(h)==="function"){wisestamp_utils.setTimeout(function(){h(g)
},500)
}};
this.insert_wisestamp_icon=function(){wisestamp_utils.log("[wisestamp_content_aol::insert_wisestamp_icon] >>>>>");
if(!wisestamp_utils.is_logged_in(e.wisestamp_uid)){wisestamp_utils.log("[wisestamp_content_aol::insert_wisestamp_icon] User is not logged in. <<<<<");
return
}var h=wisestamp_ui.find_element_recursively(c.toolbar.join(", "),document);
if(h===null){wisestamp_utils.log("[wisestamp_content_aol::insert_wisestamp_icon] toolbar = null <<<<<");
return
}var g=h[0].ownerDocument;
if(wisestamp_jquery(g).find("#wisestamp-icon").length>0){return
}wisestamp_utils.log("[wisestamp_content_aol::insert_wisestamp_icon] adding icon...");
var j=document.getElementById(c.older_toolbar_id);
if(j){var f=wisestamp_jquery('<div id="wisestamp-icon"></div>',g);
f.css({padding:"4px 0px 0px 2px"});
f.append(e.get_wisestamp_compose_icon(g));
h.css({overflow:"visible"});
f.insertBefore(h.find(c.older_toolbar_last.join(", ")))
}else{var f=wisestamp_jquery('<a id="wisestamp-icon" href="#">&nbsp;</a>',g);
f.css({padding:"4px 0px 0px 2px","background-position":"9999px 9999px"});
f.append(e.get_wisestamp_compose_icon(g));
h.css({overflow:"visible"});
h.append(f)
}e.update_wisestamp_compose_image();
if(typeof(a)==="undefined"){a=true;
wisestamp_utils.send_request({command:"save_param",param:"control_signature_insertion_done",value:true},function(){});
e.open_control_signature_insertion(f,g)
}var i=e.get_user_id().trim().toLowerCase();
if(wisestamp_utils.validate_email(i)){if(e.installed>1488876527&&e.assigned_signature.indexOf(i)==-1){e.open_assign_signature_to_email_address_popup(i,true)
}}};
this.get_quote_element=function(f){return f.find(c.quote_element.join(", "))
};
this.get_user_id=function(){wisestamp_utils.log("[wisestamp_content_aol::get_user_id] >>>>>");
var f=wisestamp_jquery(c.user_id.join(", "));
for(var j in f){if(typeof f[j].innerHTML!=="undefined"){var h=f[j].innerHTML.match(/\b[^\s]+@[^\s]+\b/g);
if(h&&h[0]){var g=h[0].toLowerCase();
if(wisestamp_utils.validate_email(g)){wisestamp_utils.log('[wisestamp_content_aol::get_user_id] selectors.user_id, user_id = "'+g+'" <<<<<');
return g
}}}}var g="";
wisestamp_utils.log('[wisestamp_content_aol::get_user_id] user_id = "'+g+'" <<<<<');
return g
};
this.setup_mapping=function(){var h=document.querySelector("#appContent");
var f=new MutationObserver(function(i){i.forEach(function(j){for(var k in j.addedNodes){if(typeof j.addedNodes[k].data!=="undefined"){e.insert_mapped_signature(undefined,true)
}}})
});
var g={childList:true,subtree:true,characterData:true};
f.observe(h,g)
};
this.generate_session_id=function(){return wisestamp_utils.md5("--- "+e.wisestamp_uid+" ---")
};
this.update_all_promos=function(){e.get_editor(document,function(f){if((!(f===null))&&(typeof(f)==="object")&&(f.length>0)){e.update_promo(f[0],false)
}})
};
this.update_promo=function(l,q){if(!(typeof(l)==="undefined")){var f=wisestamp_jquery(l);
var k=f.find('div[href="http://WS_promo"]');
if(k.length>=1){var o=false;
var m=false;
var n;
var i;
var g=wisestamp_jquery(c.total_recipients_email_elements.join(", "));
var j=wisestamp_jquery(c.to_recipients_email_elements.join(", "));
var h=wisestamp_jquery(c.to_recipients_name_elements.join(", "));
if((g.length===3)&&(j.length===1)&&(h.length===1)){var p=wisestamp_utils.trim_spaces_and_commas(g.text());
n=wisestamp_utils.trim_spaces_and_commas(j.text());
i=wisestamp_utils.trim_spaces_and_commas(h.text());
if((p===n)&&(p===i)){if((typeof(i)==="string")&&(i.length>0)&&(!(i.indexOf(",")>=0))&&(!(i.indexOf(";")>=0))){i=wisestamp_utils.trim_recipient_name(i);
if((typeof(i)==="string")&&(i.length>0)&&(!(i.indexOf("@")>=0))){m=true
}}if((typeof(n)==="string")&&(n.length>0)&&(!(n.indexOf(",")>=0))&&(!(n.indexOf(";")>=0))){n=wisestamp_utils.trim_recipient_email(n);
if((typeof(n)==="string")&&(n.length>0)){if(wisestamp_utils.validate_email(n)){o=true
}}}}}e.handle_update_promo(q,f,k,o,m,n,i)
}}};
var d=null;
this.set_super=function(f){d=f;
d.construct(this)
}
};
wisestamp_content_aol.prototype=wisestamp_obj_web;
var wisestamp_obj_aol=new wisestamp_content_aol();
wisestamp_obj_aol.set_super(wisestamp_obj_web);
wisestamp_obj_aol.init();
wisestamp_content=wisestamp_obj_aol
};