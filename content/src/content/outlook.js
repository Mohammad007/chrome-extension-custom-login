var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/outlook.js");
wisestamp_utils.log("outlook.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){wisestamp_utils.log("[wisestamp_content_outlook] >>>>>");
var wisestamp_content_outlook=function(){this.m_content_type="Outlook";
this.m_init_conduit=true;
this.m_space_before_signature=2;
this.m_wisestamp_inmail_promo_enabled=true;
this.m_space_before_quote=0;
this.m_thread_timeout=250;
this.m_delay_after_load=300;
this.m_menu_direction="bottom";
this.m_control_signature_insertion_direction="bottom";
this.m_control_signature_insertion_top_offset=0;
switch(wisestamp.sys.platform){case"chrome":case"safari":this.m_control_signature_insertion_left_offset=-11;
break;
case"firefox":default:this.m_control_signature_insertion_left_offset=0;
break
}this.save_user_id_retries=30;
this.wisestamp_uid=false;
this.enabled=true;
this.user_id="";
this.assigned_signature=[];
var d=this;
var a=false;
var b={};
this.init=function(){wisestamp_utils.log("[wisestamp_content_outlook::init] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
wisestamp_utils.send_request({command:"load_param",param:["selectors","urls","version","wisestamp_uid","enabled","control_signature_insertion_done","dont_show_login_popup","flags","installed","assigned_signature"]},function(h){if(wisestamp.sys.platform==="safari"){h=JSON.parse(h)
}if(h.selectors&&h.selectors.outlook){b=h.selectors.outlook
}d.urls=h.urls;
d.version=h.version;
d.wisestamp_uid=h.wisestamp_uid;
d.enabled=h.enabled;
d.installed=h.installed;
d.assigned_signature=h.assigned_signature||[];
a=h.control_signature_insertion_done;
d.dont_show_login_popup=h.dont_show_login_popup;
var f=h.flags;
if((typeof(f)==="object")&&(!(f===null))&&(f.personal_promo_enabled===true)){d.m_wisestamp_personal_promo_enabled=true
}if((typeof(f)==="object")&&(!(f===null))&&(f.personal_signature_enabled===true)){d.m_wisestamp_personal_signature_enabled=true
}var j=function(){if(d.save_user_id_retries>0){d.save_user_id();
d.save_user_id_retries--;
wisestamp_utils.setTimeout(j,1000)
}};
wisestamp_utils.setTimeout(j,5000);
c.init();
if(typeof wisestamp_inmail_promo!=="undefined"){wisestamp_inmail_promo.init(d)
}function g(){wisestamp_utils.log("[wisestamp_content_outlook::init::listen] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
d.listen({editor:{location:"https://*.mail.live.com/*RteFrame*",selector:{tagName:"iframe",className:"RichText"},reply_indicator:/SkyDrivePlaceholder/}})
}if(wisestamp.sys.platform==="firefox"){try{document.createEvent("CustomEvent");
g()
}catch(i){window.addEventListener("DOMNodeInserted",function(e){d.on_dom_node_inserted(e)
},false)
}}else{g()
}wisestamp_utils.log("[wisestamp_content_outlook::init] <<<<<")
})
};
this.assign_signature_to_email=function(){var e=d.get_user_id().trim().toLowerCase();
if(wisestamp_utils.validate_email(e)){if(d.installed>1488876527&&d.assigned_signature.indexOf(e)==-1){d.assigned_signature.push(e);
d.open_assign_signature_to_email_address_popup(e)
}}};
this.setup_wisestamp_compose=function(g,f){function e(h){d.m_current_editor_body=h;
wisestamp_utils.setTimeout(function(){c.setup_wisestamp_compose(h,true)
},1000)
}if(typeof g==="undefined"){d.get_editor(null,e)
}else{e(g)
}};
this.get_editor=function(e,j){var g=null;
var h=false;
for(var f in b.editor){g=wisestamp_ui.find_element_recursively(b.editor[f],e);
if((!(g===null))&&(typeof(g)==="object")&&(g.length>0)){g.each(function(){h=true;
wisestamp_utils.log("[wisestamp_content_outlook::get_editor] found editor >>>>>");
if(typeof(j)==="function"){j(wisestamp_jquery(this))
}})
}}if((g===null)&&(!h)){wisestamp_utils.log("[wisestamp_content_outlook::get_editor] didn't find editor >>>>>");
if(typeof(j)==="function"){j(g)
}}};
this.new_frames_found=function(f){if(c.new_frames_found(f)){return true
}if(typeof f==="undefined"){f=wisestamp_jquery
}var g=wisestamp_jquery(f.find(b.editor_not_wisestamped.join(", "))).length;
var e=false;
if(g>0){e=true
}return e
};
this.insert_wisestamp_icon=function(){wisestamp_utils.log("[wisestamp_content_outlook::insert_wisestamp_icon] >>>>>");
if(!wisestamp_utils.is_logged_in(d.wisestamp_uid)){wisestamp_utils.log("[wisestamp_content_outlook::insert_wisestamp_icon] User is not logged in. <<<<<");
return
}if(wisestamp_jquery("#wisestamp-icon").length>0){wisestamp_utils.log("[wisestamp_content_outlook::insert_wisestamp_icon] Already added. <<<<<");
return
}var g=wisestamp_ui.find_element_recursively(b.toolbar.join(", "),document);
if(g===null){wisestamp_utils.log("[wisestamp_content_outlook::insert_wisestamp_icon] toolbar = null <<<<<");
return
}wisestamp_utils.log("[wisestamp_content_outlook::insert_wisestamp_icon] adding icon...");
var f=g[0].ownerDocument;
var e=wisestamp_jquery('<div id="wisestamp-icon" />',f);
e.css({padding:"2px 5px 4px 5px",margin:"0px",position:"relative",left:"0px",top:"0px",display:"table",cursor:"pointer"});
e.hover(function(){wisestamp_jquery(this).css({background:"#eaeaea"})
},function(){wisestamp_jquery(this).css({background:"transparent"})
});
e.append(d.get_wisestamp_compose_icon(f));
g.parent().append(e);
d.update_wisestamp_compose_image();
if(typeof(a)==="undefined"){a=true;
wisestamp_utils.send_request({command:"save_param",param:"control_signature_insertion_done",value:true},function(){});
setTimeout(function(){d.open_control_signature_insertion(e,f)
},1500)
}};
this.get_wisestamp_compose_icon=function(f){var e=wisestamp_jquery('<img id="wisestamp-icon-compose" class="wisestamp-compose-img" src="'+wisestamp_utils.get_url("content/img/webmail_icon.png",true)+'" />');
e.css({"vertical-align":"middle"});
e.click(function(g){d.open_wisestamp_compose_menu(wisestamp_jquery(this),f);
g.stopImmediatePropagation();
g.stopPropagation()
});
return e
};
this.save_user_id=function(){wisestamp_utils.log("[wisestamp_content_outlook::save_user_id] >>>>>");
if(!(d.user_id==="")){d.assign_signature_to_email();
wisestamp_utils.log("[wisestamp_content_outlook::save_user_id] Already saved. <<<<<");
return
}function h(){var j=wisestamp_jquery(b.new_user_id.join(", "));
if((!(j==null))&&(j.length===1)){var i=j.html().toLowerCase();
if(wisestamp_utils.validate_email(i)){d.assign_signature_to_email();
return i
}}return""
}var f=wisestamp_jquery(b.user_id.join(", "));
if((!(f==null))&&(f.length===1)){var g=f.attr("src");
if(g){if(g.indexOf("?email=")>=0){g=g.substring(g.indexOf("?email=")+"?email=".length,g.length);
if(g.indexOf("&")>=0){g=g.substring(0,g.indexOf("&"));
if(g.indexOf("%40")>=0){g=g.replace(/\%40/g,"@");
g=g.toLowerCase();
if(wisestamp_utils.validate_email(g)){wisestamp_utils.log('[wisestamp_content_outlook::save_user_id] selectors.user_id, user_id = "'+g+'" <<<<<');
d.user_id=g;
d.assign_signature_to_email();
return
}}}}}}var g=h();
if(g===""){var e=wisestamp_jquery(b.open_new_user_id.join(", "));
if((!(e==null))&&(e.length===1)){wisestamp_utils.log('[wisestamp_content_outlook::save_user_id] user_id = "'+g+'", opening user_id menu <<<<<');
e.click();
wisestamp_utils.setTimeout(function(){g=h();
wisestamp_utils.log('[wisestamp_content_outlook::save_user_id] user_id = "'+g+'", removing user_id menu <<<<<');
e.click();
wisestamp_utils.log('[wisestamp_content_outlook::save_user_id] selectors.new_user_id, user_id = "'+g+'" <<<<<');
d.user_id=g;
return
},500);
return
}}else{wisestamp_utils.log('[wisestamp_content_outlook::save_user_id] selectors.new_user_id, user_id = "'+g+'" <<<<<');
d.user_id=g;
return
}var g="";
wisestamp_utils.log('[wisestamp_content_outlook::save_user_id] user_id = "'+g+'" <<<<<');
d.user_id=g;
return
};
this.get_user_id=function(){return d.user_id
};
this.init_email_mode=function(f,i){var g=wisestamp_jquery(f);
if(typeof i==="undefined"){var e=d.get_editor_parent_div(f);
var h=e.find(b.reply_div.join(", "));
i=(((h.length===0)&&(d.get_quote_element(f).length===0))?"compose":"reply")
}g.attr("wsmode",i)
};
this.get_quote_element=function(e){return e.find(b.quote_element.join(", "))
};
this.generate_session_id=function(){return wisestamp_utils.md5("--- "+d.wisestamp_uid+" ---")
};
this.close_wisestamp_menu_event=function(g,f){var e=wisestamp_jquery(b.close_wisestamp_menu_event.join(", "));
if(e.length>0){e.unbind(g);
if(typeof(f)==="function"){e.bind(g,f)
}}d.get_editor(document,function(h){if(h!=null){h.unbind(g);
if(typeof(f)==="function"){h.bind(g,f)
}}})
};
this.get_current_signature=function(e){var f=wisestamp_jquery(e).find('div[style*="color:WISESTAMP_SIG_'+d.m_session_id+'"]:not(.in-quote-element), div[style*="color:WISESTAMP_SIG_'+d.m_session_id+'"]:not(.in-quote-element)');
return f
};
this.get_editor_parent_div=function(f){var h=wisestamp_jquery(f);
var g=h[0].ownerDocument.defaultView.frameElement;
var e=((g===null)?h:wisestamp_jquery(g)).parents(b.editor_parent_div.join(", "));
return e
};
this.update_all_promos=function(){d.get_editor(document,function(e){if((!(e===null))&&(typeof(e)==="object")&&(e.length>0)){d.update_promo(e[0],false)
}})
};
this.update_promo=function(k,q){if(!(typeof(k)==="undefined")){var e=wisestamp_jquery(k);
var j=e.find('div[href="http://WS_promo"]');
if(j.length>=1){var o=false;
var l=false;
var n;
var h;
var m=d.get_editor_parent_div(k);
var f=m.find(b.total_recipients_email_elements.join(", "));
var i=m.find(b.to_recipients_email_elements.join(", "));
var g=m.find(b.to_recipients_name_elements.join(", "));
if((f.length===1)&&(i.length===1)&&(g.length===1)){var p=wisestamp_utils.trim_spaces_and_commas(f.text());
n=wisestamp_utils.trim_spaces_and_commas(i.text());
h=wisestamp_utils.trim_spaces_and_commas(g.text());
if((p===n)&&(p===h)){if((typeof(h)==="string")&&(h.length>0)&&(!(h.indexOf(",")>=0))&&(!(h.indexOf(";")>=0))){h=wisestamp_utils.trim_recipient_name(h);
if((typeof(h)==="string")&&(h.length>0)&&(!(h.indexOf("@")>=0))){l=true
}}if((typeof(n)==="string")&&(n.length>0)&&(!(n.indexOf(",")>=0))&&(!(n.indexOf(";")>=0))){n=wisestamp_utils.trim_recipient_email(n);
if((typeof(n)==="string")&&(n.length>0)){if(wisestamp_utils.validate_email(n)){o=true
}}}}}d.handle_update_promo(q,e,j,o,l,n,h)
}}};
var c=null;
this.set_super=function(e){c=e;
c.construct(this)
}
};
wisestamp_content_outlook.prototype=wisestamp_obj_web;
var wisestamp_obj_outlook=new wisestamp_content_outlook();
wisestamp_obj_outlook.set_super(wisestamp_obj_web);
wisestamp_obj_outlook.init();
wisestamp_content=wisestamp_obj_outlook
};