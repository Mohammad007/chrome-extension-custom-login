var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/yahoo.js");
wisestamp_utils.log("yahoo.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){wisestamp_utils.log("[wisestamp_content_yahoo] >>>>>");
var wisestamp_content_yahoo=function(){this.m_content_type="Yahoo";
this.m_init_conduit=true;
this.m_wisestamp_inmail_promo_enabled=true;
this.editor=null;
this.m_space_before_quote=0;
this.m_last_signature_dict={};
this.m_event_name_dict={};
this.m_menu_direction="top";
this.m_control_signature_insertion_direction="top";
this.m_control_signature_insertion_top_offset=0;
this.m_control_signature_insertion_left_offset=28;
this.wisestamp_uid=false;
this.enabled=true;
this.assigned_signature=[];
var e=this;
var a=false;
var c={};
var b={};
this.init=function(){wisestamp_utils.log("[wisestamp_content_yahoo::init] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
wisestamp_utils.send_request({command:"load_param",param:["selectors","urls","version","wisestamp_uid","enabled","control_signature_insertion_done","dont_show_login_popup","flags","installed","assigned_signature"]},function(j){if(wisestamp.sys.platform==="safari"){j=JSON.parse(j)
}if(j.selectors&&j.selectors.yahoo){c=j.selectors.yahoo
}e.urls=j.urls;
e.version=j.version;
e.wisestamp_uid=j.wisestamp_uid;
e.enabled=j.enabled;
e.assigned_signature=j.assigned_signature||[];
a=j.control_signature_insertion_done;
e.dont_show_login_popup=j.dont_show_login_popup;
b=j.flags;
if((typeof(b)==="object")&&(!(b===null))&&(b.personal_promo_enabled===true)){e.m_wisestamp_personal_promo_enabled=true
}if((typeof(b)==="object")&&(!(b===null))&&(b.personal_signature_enabled===true)){e.m_wisestamp_personal_signature_enabled=true
}d.init();
if(typeof wisestamp_inmail_promo!=="undefined"){wisestamp_inmail_promo.init(e)
}wisestamp_utils.setTimeout(function(){var i=e.get_user_id().trim().toLowerCase();
if(wisestamp_utils.validate_email(i)){if(j.installed>1488876527&&e.assigned_signature.indexOf(i)==-1){e.open_assign_signature_to_email_address_popup(i,true)
}}},1500);
var k=[];
for(var h in c.observe_target){k=wisestamp_jquery(c.observe_target[h]);
if(k.length>0){break
}}var l=document.querySelector(c.observe_target[h]);
var f=new MutationObserver(function(i){i.forEach(function(m){var o=[];
for(var n in c.editor){o=wisestamp_jquery(c.editor[n]);
if(o.length>0){break
}}if(o.length>0){e.get_editor(null,function(p){e.setup_wisestamp_compose(p)
})
}})
});
var g={childList:true,subtree:true};
if(l!==null){f.observe(l,g)
}wisestamp_utils.log("[wisestamp_content_yahoo::init] <<<<<")
})
};
this.init_email_mode=function(g,i){function f(){return(document.location.href.indexOf("messages")>-1)
}var h=wisestamp_jquery(g);
if(typeof i==="undefined"){i=(((e.get_editor_parent_quote_element(g).length===0)&&(e.get_quote_element(g).length===0)&&!f())?"compose":"reply")
}h.attr("wsmode",i)
};
this.get_quote_element=function(g){for(var f in c.quote_element){var j=g.find(c.quote_element[f]);
if(j.length>0){return j
}}for(var f in c.quote_grandchild_element){var h=g.find(c.quote_grandchild_element[f]);
if(h.length>0){var j=h.parent(c.quote_grandchild_element_parent.join(", ")).parent(c.quote_grandchild_element_grandparent.join(", "));
if(j.length>0){return j
}}}return[]
};
this.get_editor_parent_quote_element=function(g){for(var f in c.quote_element){var h=g.parent().parent().parent().find(c.quote_element[f]);
if(h.length>0){return h
}}return[]
};
this.get_editor=function(j,k){var h=null;
var g=false;
for(var f in c.editor){h=wisestamp_jquery(c.editor[f]);
if(h.length>0){h.each(function(){g=true;
wisestamp_utils.log("[wisestamp_content_yahoo::get_editor] found editor >>>>>");
if(typeof(k)==="function"){var i=wisestamp_jquery(this);
wisestamp_utils.setTimeout(function(){k(i)
},500)
}})
}else{h=null
}}if((h===null)&&(!g)){wisestamp_utils.log("[wisestamp_content_yahoo::get_editor] didn't find editor >>>>>");
if(typeof(k)==="function"){k(h)
}}};
this.insert_wisestamp_icon=function(){wisestamp_utils.log("[wisestamp_content_yahoo::insert_wisestamp_icon] >>>>>");
if(!wisestamp_utils.is_logged_in(e.wisestamp_uid)){wisestamp_utils.log("[wisestamp_content_yahoo::insert_wisestamp_icon] User is not logged in. <<<<<");
return
}wisestamp_jquery("#wisestamp-icon").remove();
var f=null;
for(var k in c.before_last_tool){f=wisestamp_ui.find_element_recursively(c.before_last_tool[k],document);
if(f!==null){break
}}if(f===null){wisestamp_utils.log("[wisestamp_content_yahoo::insert_wisestamp_icon] before_last_tool = null <<<<<");
return
}var l=f.parent();
if(l===null){wisestamp_utils.log("[wisestamp_content_yahoo::insert_wisestamp_icon] toolbar = null <<<<<");
return
}wisestamp_utils.log("[wisestamp_content_yahoo::insert_wisestamp_icon] adding icon...");
var h=l[0].ownerDocument;
f.removeClass("last");
var j="icon s-tp btnpress";
if(document.location.href.indexOf("https://mg.mail.yahoo.com/neo/")===-1){j="D_X M_3gIMd V_GI O_cMu O4_N I4_2iedUU O0_N I0_7l9bL ir3_2d4VCo it3_dRA"
}var g=wisestamp_jquery('<span class="'+j+'" style="padding: 0px 8px; position: relative; top: 4px;" id="wisestamp-icon" role="button" title="WiseStamp"></span>',h).append(wisestamp_jquery('<span style="cursor: pointer;"></span>').append(e.get_wisestamp_compose_icon(h)));
g.insertAfter(f);
e.update_wisestamp_compose_image();
if(typeof(a)==="undefined"){if(g.offset().left>=300){a=true;
wisestamp_utils.send_request({command:"save_param",param:"control_signature_insertion_done",value:true},function(){});
e.open_control_signature_insertion(g,h)
}}};
this.get_user_id=function(){wisestamp_utils.log("[wisestamp_content_yahoo::get_user_id] >>>>>");
var f=null;
for(var g in c.user_id_meta_div){f=wisestamp_jquery(c.user_id_meta_div[g]).attr(c.user_id_meta_div_attr);
if((f)&&(f.length>0)){if(f.indexOf("@")<0){f=f+"@yahoo.com"
}f=f.toLowerCase();
if(wisestamp_utils.validate_email(f)){wisestamp_utils.log('[wisestamp_content_yahoo::get_user_id] selectors.user_id_meta_div, user_id = "'+f+'" <<<<<');
return f
}}}var f=null;
for(var g in c.user_id){f=wisestamp_jquery(c.user_id[g]).text();
if(f.length>0){if(f.indexOf("@")<0){f=f+"@yahoo.com"
}f=f.toLowerCase();
if(wisestamp_utils.validate_email(f)){wisestamp_utils.log('[wisestamp_content_yahoo::get_user_id] selectors.user_id, user_id = "'+f+'" <<<<<');
return f
}}}var f="";
wisestamp_utils.log('[wisestamp_content_yahoo::get_user_id] user_id = "'+f+'" <<<<<');
return f
};
this.insert_mapped_signature=function(j,h,i){function m(o,n){if(o[n]!=null){return o[n]
}return o.composeSigId
}function l(){for(var n in e.m_data.signatures){if("premium" in e.m_data.signatures[n]){continue
}return n
}return null
}var f=undefined;
if(!(typeof(i)==="undefined")){f=i.attr("data-wisestamp-editor-id")
}wisestamp_utils.log("[wisestamp_content_yahoo::insert_mapped_signature] account = "+j+", manual = "+h+", wisestamp_editor_id = "+f+" >>>>>");
var g=true;
var k=null;
e.get_editor(document,function(s){if(!(s===null)){if((typeof(f)==="undefined")||(s.attr("data-wisestamp-editor-id")===f)){var t=s.attr("data-wisestamp-editor-id");
var o=e.is_email_mode(s,"compose");
var q=o?"composeSigId":"replySigId";
var n=e.get_current_signature(s);
if(n.length&&o){return
}if(typeof j==="undefined"){j=e.get_user_id()
}var u=null;
if(j in e.m_data.mappings){u=m(e.m_data.mappings[j],q)
}if(u===null&&typeof e.m_data.mappings.all!=="undefined"){u=m(e.m_data.mappings.all,q)
}if(u==null){for(var r in e.m_data.signatures){u=r;
break
}}var p=wisestamp_utils.prop_by_path(e,"m_data.signatures."+u,{});
if(u!=null&&"premium" in p){u=l()
}e.insert_signature(u,false,t)
}}})
};
this.insert_signature=function(i,g,f){if(i==="None"){i="0"
}wisestamp_utils.log("[wisestamp_content_yahoo::insert_signature] signature_id = "+i+", wisestamp_editor_id = "+f+" >>>>>");
d.m_wisestamp_ui=wisestamp_ui;
if(i==null){return
}e.m_last_signature_id=i;
if(wisestamp_menu){wisestamp_menu.set_last_signature_id(e.m_last_signature_id)
}if(!(typeof(f)==="undefined")){if(typeof(e.m_last_signature_dict[f])==="undefined"){e.m_event_name_dict[f]="compose"
}else{e.m_event_name_dict[f]="change_sig"
}e.m_last_signature_dict[f]=i
}wisestamp_utils.log("[wisestamp_content_yahoo::insert_signature] signature_id = "+i+", wisestamp_editor_id = "+f);
if(i==="0"){e.get_current_editor(function(j){if((typeof(f)==="undefined")||(j.attr("data-wisestamp-editor-id")===f)){e.insert_signature_html(j,"","",g)
}});
if(!(typeof(f)==="undefined")){var h={command:"ws_track",action:e.m_event_name_dict[f]+"_no_sig"}
}else{var h={command:"ws_track",action:"compose_no_sig"}
}wisestamp_utils.send_request(h,function(){})
}else{e.get_data("signature",i,function(k){if(wisestamp.sys.platform==="safari"){k=JSON.parse(k)
}var l=k.data.html;
var m=k.data.vertical_html;
var j=k.promo_id;
e.get_current_editor(function(n){if((typeof(f)==="undefined")||(n.attr("data-wisestamp-editor-id")===f)){if(l!=""){e.track_event("insert_content",undefined,i);
if(typeof j!=="undefined"&&j!=null){e.track_event("insert_promo","promo_"+j)
}else{e.track_event("insert_no_promo","promo_"+j)
}}e.insert_signature_html(n,l,m,g)
}})
},e.m_content_type,f)
}};
this.get_current_signature=function(f){var g=wisestamp_jquery(f).find('div[style*="color:WISESTAMP_SIG_'+e.m_session_id+'"]:not(.in-quote-element), div[style*="color:WISESTAMP_SIG_'+e.m_session_id+'"]:not(.in-quote-element)');
return g
};
this.generate_session_id=function(){return wisestamp_utils.md5("--- "+e.wisestamp_uid+" ---")
};
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
var h=o.find(c.to_recipients_name_elements.join(", "));
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
wisestamp_content_yahoo.prototype=wisestamp_obj_web;
var wisestamp_obj_yahoo=new wisestamp_content_yahoo();
wisestamp_obj_yahoo.set_super(wisestamp_obj_web);
wisestamp_obj_yahoo.init();
wisestamp_content=wisestamp_obj_yahoo
};