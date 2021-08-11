var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/inbox.js");
wisestamp_utils.log("inbox.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){wisestamp_utils.log("[wisestamp_content_inbox] >>>>>");
var wisestamp_content_inbox=function(){this.m_content_type="Inbox";
this.m_init_conduit=true;
this.m_wisestamp_inmail_promo_enabled=true;
this.m_top_menu_enabled=true;
this.m_top_menu_direction="bottom-right";
this.m_top_menu_top_offset=-13;
this.m_top_menu_left_offset=-7;
this.m_top_menu_right_offset=-6;
this.m_notifications_top_offset=-13;
this.m_notifications_left_offset=-2;
this.m_notifications_right_offset=-8;
this.toolbar_retries=120;
this.m_ads_banner=false;
this.m_last_signature_dict={};
this.m_event_name_dict={};
this.m_menu_direction="top";
this.m_control_signature_insertion_direction="top";
this.m_control_signature_insertion_top_offset=12;
this.m_control_signature_insertion_left_offset=0;
this.check_action_conduit_setup_compose=0;
this.assigned_signature=[];
this.wisestamp_uid=false;
this.enabled=true;
var f=this;
var a=false;
var d={};
var b={};
var c=0;
this.init=function(){wisestamp_utils.log("[wisestamp_content_inbox::init] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
wisestamp_utils.send_request({command:"load_param",param:["selectors","urls","version","wisestamp_uid","enabled","control_signature_insertion_done","dont_show_login_popup","flags","installed","assigned_signature"]},function(h){if(wisestamp.sys.platform==="safari"){h=JSON.parse(h)
}if(h.selectors&&h.selectors.inbox){d=h.selectors.inbox
}f.urls=h.urls;
f.version=h.version;
f.wisestamp_uid=h.wisestamp_uid;
f.enabled=h.enabled;
f.assigned_signature=h.assigned_signature||[];
a=h.control_signature_insertion_done;
f.dont_show_login_popup=h.dont_show_login_popup;
b=h.flags;
if((typeof(b)==="object")&&(!(b===null))&&(b.personal_promo_enabled===true)){f.m_wisestamp_personal_promo_enabled=true
}if((typeof(b)==="object")&&(!(b===null))&&(b.personal_signature_enabled===true)){f.m_wisestamp_personal_signature_enabled=true
}if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){f.m_top_menu_direction="default"
}else{f.m_top_menu_direction="bottom-right"
}var g=function(){if(f.toolbar_retries>0){f.add_top_menu();
f.toolbar_retries--;
wisestamp_utils.setTimeout(g,500)
}};
wisestamp_utils.setTimeout(g,500);
e.init();
wisestamp_utils.setTimeout(function(){var i=f.get_user_id().trim().toLowerCase();
if(wisestamp_utils.validate_email(i)){if(h.installed>1488876527&&f.assigned_signature.indexOf(i)==-1){f.open_assign_signature_to_email_address_popup(i,true)
}}},1500);
if(typeof wisestamp_inmail_promo!=="undefined"){wisestamp_inmail_promo.init(f)
}f.listen({main:{selector:{tagName:"ol",className:"gbtc"}},editor:{selector:{tagName:"iframe",className:"editable"}}});
wisestamp_utils.log("[wisestamp_content_inbox::init] <<<<<")
})
};
this.generate_session_id=function(){return wisestamp_utils.md5("--- "+f.wisestamp_uid+" ---")
};
this.conduit_setup_compose=function(){wisestamp_utils.log("[wisestamp_content_inbox::conduit_setup_compose] >>>>>");
function g(i){i.click(function(){wisestamp_utils.log("[wisestamp_content_inbox::conduit_setup_compose] click detected");
if(!f.new_frames_found(wisestamp_jquery(this))){return
}wisestamp_utils.setTimeout(function(){f.try_setup_wisestamp_compose()
},0)
})
}f.try_setup_wisestamp_compose();
var k=wisestamp_jquery("iframe");
for(var h=0;
h<k.length;
h++){var l;
try{l=wisestamp_jquery(k[h].contentDocument.body);
g(l);
wisestamp_utils.log("[wisestamp_content_inbox::conduit_setup_compose] iframe success")
}catch(j){wisestamp_utils.log("[wisestamp_content_inbox::conduit_setup_compose] iframe exception")
}}};
this.add_top_menu=function(){wisestamp_utils.log("[wisestamp_content_inbox::add_top_menu] >>>>>");
if(wisestamp_jquery("#wisestamp-top").length>0){wisestamp_utils.log("[wisestamp_content_inbox::add_top_menu] Already added. <<<<<");
return null
}var k=null;
var j=null;
for(var i=0;
i<d.new_menus.length;
i++){var h=wisestamp_ui.find_element_recursively(d.new_menus[i],document);
if(!wisestamp_utils.is_empty(h)){k=h;
break
}}if(k===null){wisestamp_utils.log("[wisestamp_content_inbox::add_top_menu] menu = "+k+". <<<<<");
return null
}var g;
wisestamp_utils.log("[wisestamp_content_inbox::add_top_menu] i_menu_ver = "+i+".");
switch(i){case 0:g=wisestamp_jquery(['<div class="gbt" id="wisestamp-top" style="margin: 18px 0px 0px 15px;">','<a class="gbgt" aria-haspopup="true" aria-owns="gbd4">','<span id="gbgs4" class="gbts" style="padding: 0px 10px;">','<span id="gbi4">','<span><img style="padding-bottom: 3px; vertical-align: middle;" class="wisestamp-top-img" /></span>','<span style="position: relative; top: -1px; border-style: solid dashed dashed; border-color: transparent; border-top-color: #c0c0c0; display: -moz-inline-box; display: inline-block; font-size: 0px; height: 0px; line-height: 0; width: 0px; border-width: 3px 3px 0px; padding-top: 1px; left: 4px;"></span>',"</span>","</span>","</a>","</div>"].join(""));
k.after(g);
j=g.find("a");
break
}j.click(function(){f.open_wisestamp_top_menu(wisestamp_jquery(this),document)
});
f.update_wisestamp_top_image();
wisestamp_utils.setTimeout(function(){f.after_add_top_menu(j)
},0);
return g
};
this.get_editor=function(g,j){var i=false;
var h=wisestamp_ui.find_element_recursively(d.editor.join(", "),g);
if((!(h===null))&&(typeof(h)==="object")&&(h.length>0)){h.each(function(){i=true;
wisestamp_utils.log("[wisestamp_content_inbox::get_editor] found editor >>>>>");
if(typeof(j)==="function"){j(wisestamp_jquery(this))
}})
}if((h===null)&&(!i)){wisestamp_utils.log("[wisestamp_content_inbox::get_editor] didn't find editor >>>>>");
if(typeof(j)==="function"){j(h)
}}};
this.insert_wisestamp_icon=function(){wisestamp_utils.log("[wisestamp_content_inbox::insert_wisestamp_icon] >>>>>");
if(!wisestamp_utils.is_logged_in(f.wisestamp_uid)){wisestamp_utils.log("[wisestamp_content_inbox::insert_wisestamp_icon] User is not logged in. <<<<<");
return
}var g=null;
g=wisestamp_ui.find_element_recursively(d.insert_neighbour.join(", "),document);
if(g===null){return
}wisestamp_utils.log("[wisestamp_content_inbox::insert_wisestamp_icon] adding icon...");
g.each(function(){var h=wisestamp_jquery(this);
if(h.parent().find(".wisestamp-icon-container").length===0){var j=h[0].ownerDocument;
var k=f.get_wisestamp_compose_icon(j);
var i;
i=h.clone();
i.addClass("wisestamp-icon-container");
i.attr("title","WiseStamp");
i.removeAttr("tabindex");
i.removeAttr("jsaction");
i.removeAttr("jsan");
i.removeAttr("jstcache");
i.removeAttr("role");
i.empty();
i.append(k);
k.css("margin-top","2px");
i.css("background-image","initial");
i.click(function(l){f.open_wisestamp_compose_menu(wisestamp_jquery(this),j);
l.stopImmediatePropagation();
l.stopPropagation()
});
h.prev().before(i);
f.update_wisestamp_compose_image();
if(h.is(d.insert_neighbour_reply.join(", "))){i.addClass("wisestamp-icon-container-reply");
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){i.css({left:"8px"})
}else{i.css({right:"8px"})
}}else{i.addClass("wisestamp-icon-container-compose");
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){i.css({left:"8px"})
}else{i.css({right:"8px"})
}if(typeof(a)==="undefined"){a=true;
wisestamp_utils.send_request({command:"save_param",param:"control_signature_insertion_done",value:true},function(){});
f.open_control_signature_insertion(i,j)
}}}})
};
this.get_user_id=function(m){var j=undefined;
if(!(typeof(m)==="undefined")){j=m.attr("data-wisestamp-editor-id")
}wisestamp_utils.log("[wisestamp_content_inbox::get_user_id] wisestamp_editor_id = "+j+" >>>>>");
if(!(typeof(m)==="undefined")){var n=f.get_compose_editor_parent_div(m);
if(n.length>0){var k=n.find(d.for_compose.join(", "));
if(k.length>0){var h=k.html();
if(h){h=h.toLowerCase();
if(wisestamp_utils.validate_email(h)){wisestamp_utils.log('[wisestamp_content_inbox::get_user_id] selectors.for_compose, user_id = "'+h+'" <<<<<');
return h
}}}}}for(var l in d.default_user_id){var g=wisestamp_jquery(d.default_user_id[l]);
if(g.length>0){var h=g.text();
if(h){h=h.toLowerCase();
if(wisestamp_utils.validate_email(h)){wisestamp_utils.log('[wisestamp_content_inbox::get_user_id] selectors.default_user_id, user_id = "'+h+'" <<<<<');
return h
}}}}var h="";
wisestamp_utils.log('[wisestamp_content_inbox::get_user_id] user_id = "'+h+'" <<<<<');
return h
};
this.setup_mapping=function(j){var h=undefined;
if(!(typeof(j)==="undefined")){h=j.attr("data-wisestamp-editor-id")
}wisestamp_utils.log("[wisestamp_content_inbox::setup_mapping] wisestamp_editor_id = "+h+" >>>>>");
if(!(typeof(j)==="undefined")){var l=f.get_compose_editor_parent_div(j);
if(l.length>0){var k=l.find(d.select_new_sender_address.join(", "));
if(k.length>0){k.unbind("click.wisestamp-mapping");
k.bind("click.wisestamp-mapping",function(){wisestamp_utils.setTimeout(function(){f.setup_mapping(j)
},0)
})
}var g=wisestamp_jquery(d.change_sender_address.join(", "));
if(g.length>0){g.unbind("click.wisestamp-mapping")
}var i=wisestamp_jquery(d.change_sender_address_visible.join(", "));
if(i.length>0){i.unbind("click.wisestamp-mapping");
i.bind("click.wisestamp-mapping",function(){f.insert_mapped_signature(undefined,true,j)
})
}}}};
this.init_email_mode=function(h,k){var j=wisestamp_jquery(h);
if(typeof k==="undefined"){var i=j[0].ownerDocument.defaultView.frameElement;
var g=((i===null)?j:wisestamp_jquery(i)).parents(d.reply_editor_parent_div.join(", "));
k=(((g.length===0)&&(f.get_quote_element(h).length===0))?"compose":"reply")
}j.attr("wsmode",k)
};
this.get_quote_element=function(g){return g.find(d.quote_element.join(", "))
};
this.is_black_listed_view=function(){return(window.top||window).location.hash.split("/")[0]==="#settings"
};
this.insert_mapped_signature=function(k,i,j){function n(p,o){if(p[o]!=null){return p[o]
}return p.composeSigId
}function m(){for(var o in f.m_data.signatures){if("premium" in f.m_data.signatures[o]){continue
}return o
}return null
}var g=undefined;
if(!(typeof(j)==="undefined")){g=j.attr("data-wisestamp-editor-id")
}wisestamp_utils.log("[wisestamp_content_inbox::insert_mapped_signature] account = "+k+", manual = "+i+", wisestamp_editor_id = "+g+" >>>>>");
var h=true;
var l=null;
f.get_editor(document,function(t){if(!(t===null)){if((typeof(g)==="undefined")||(t.attr("data-wisestamp-editor-id")===g)){var u=t.attr("data-wisestamp-editor-id");
var p=f.is_email_mode(t,"compose");
var r=p?"composeSigId":"replySigId";
var o=f.get_current_signature(t);
if(o.length&&p&&!i){return
}if(typeof k==="undefined"){k=f.get_user_id(t)
}var v=null;
if(k in f.m_data.mappings){v=n(f.m_data.mappings[k],r)
}if(v===null&&typeof f.m_data.mappings.all!=="undefined"){v=n(f.m_data.mappings.all,r)
}if(v==null){for(var s in f.m_data.signatures){v=s;
break
}}var q=wisestamp_utils.prop_by_path(f,"m_data.signatures."+v,{});
if(v!=null&&"premium" in q){v=m()
}f.insert_signature(v,false,u)
}}})
};
this.insert_signature=function(j,h,g){f.clear_no_extension_signature();
if(j==="None"){j="0"
}wisestamp_utils.log("[wisestamp_content_inbox::insert_signature] signature_id = "+j+", wisestamp_editor_id = "+g+" >>>>>");
e.m_wisestamp_ui=wisestamp_ui;
if(j==null){return
}f.m_last_signature_id=j;
if(wisestamp_menu){wisestamp_menu.set_last_signature_id(f.m_last_signature_id)
}if(!(typeof(g)==="undefined")){if(typeof(f.m_last_signature_dict[g])==="undefined"){f.m_event_name_dict[g]="compose"
}else{f.m_event_name_dict[g]="change_sig"
}f.m_last_signature_dict[g]=j
}wisestamp_utils.log("[wisestamp_content_inbox::insert_signature] signature_id = "+j+", wisestamp_editor_id = "+g);
if(j==="0"){f.get_current_editor(function(k){if((typeof(g)==="undefined")||(k.attr("data-wisestamp-editor-id")===g)){f.insert_signature_html(k,"","",h)
}});
if(!(typeof(g)==="undefined")){var i={command:"ws_track",action:f.m_event_name_dict[g]+"_no_sig"}
}else{var i={command:"ws_track",action:"compose_no_sig"}
}wisestamp_utils.send_request(i,function(){})
}else{f.get_data("signature",j,function(l){if(wisestamp.sys.platform==="safari"){l=JSON.parse(l)
}var m=l.data.html;
var n=l.data.vertical_html;
var k=l.promo_id;
f.get_current_editor(function(o){if((typeof(g)==="undefined")||(o.attr("data-wisestamp-editor-id")===g)){if(m!=""){f.track_event("insert_content",undefined,j);
if(typeof k!=="undefined"&&k!=null){f.track_event("insert_promo","promo_"+k)
}else{f.track_event("insert_no_promo","promo_"+k)
}}f.insert_signature_html(o,m,n,h)
}})
},f.m_content_type,g)
}};
this.clear_no_extension_signature=function(){if(d.no_extension_signature){wisestamp_jquery(d.no_extension_signature.join(", ")).remove()
}};
this.on_menu_switch_signature=function(h,g){wisestamp_utils.log("[wisestamp_content_inbox::on_menu_switch_signature] signature_id = "+h+", wisestamp_editor_id = "+g);
f.refresh_all_data(function(){f.track_event("switch");
f.insert_signature(h,true,g)
})
};
this.get_wisestamp_compose_menu=function(j,o,m,r){if(f.enabled){var i=wisestamp_jquery('<div id="wisestamp-menu"></div>',o);
var l=wisestamp_jquery("<div></div>",o);
l.css({"-webkit-box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)","-moz-box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)","box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)","-webkit-border-radius":"4px","-moz-border-radius":"4px","border-radius":"4px",background:"white","font-size":"90%",width:"262px","font-family":"arial, sans-serif",display:"block",overflow:"hidden"});
f.add_menu_top_header(l,{label:"Choose the signature<br>you want to use"});
for(var g in j.signatures){if(g==="__exposedProps__"||g==="result"){continue
}var n=j.signatures[g].title;
var k=function(t){var s=wisestamp_jquery(this).parents("[data-wisestamp-editor-id]").attr("data-wisestamp-editor-id");
f.on_menu_switch_signature(t.target.parentNode.id,s)
};
f.add_menu_item(l,{id:g,label:n,command:k,type:"radio",name:"switch-signature","text-color":"#333",imageURI:wisestamp_utils.get_url("content/img/checkbox_empty.png",true)},r)
}f.add_menu_item(l,{id:"0",label:"No signature",command:function(t){var s=wisestamp_jquery(this).parents("[data-wisestamp-editor-id]").attr("data-wisestamp-editor-id");
f.on_menu_switch_signature(t.target.parentNode.id,s)
},type:"radio",name:"switch-signature","text-color":"#333",imageURI:wisestamp_utils.get_url("content/img/checkbox_empty.png",true)},r);
if(m){f.add_menu_item(l,{label:"Add another signature",command:function(s){f.open_link(f.urls.upgrade_url,"compose","add_another_signature")
},type:"radio",name:"add-another-signature","text-color":"#333",imageURI:wisestamp_utils.get_url("content/img/checkbox_empty.png",true)},r)
}l.append('<div style="margin-top: 15px;"></div>');
f.add_menu_bottom_footer(l,m);
if(typeof f.m_update_details==="object"&&f.m_update_details!==null&&typeof f.m_update_details.url==="string"){f.add_menu_item(l,{label:"Update available!",command:function(){f.open_link(f.m_update_details.url,"update","compose")
},imageURI:wisestamp_utils.get_url("content/img/exclamation.png"),"background-color":"#f0f0f0","background-color-hover":"#e0e0e0","text-color":"#777777"},r)
}i.css({display:"none",position:"absolute",direction:"ltr"});
i.attr("data-wisestamp-editor-id",r);
i.html(l[0]);
switch(f.m_menu_direction){case"top":f.add_menu_bottom_triangle(i);
break;
case"right":f.add_menu_left_triangle(i);
break;
case"bottom":f.add_menu_top_triangle(i);
break
}return i
}else{var i=wisestamp_jquery('<div id="wisestamp-menu"></div>',o);
var q=wisestamp_jquery('<div>Your WiseStamp is disabled,<br /><span class="enable">Click to Enable</span></div>');
i.css({width:"193px",height:"59px","-moz-border-radius":"7px","-webkit-border-radius":"2px","border-radius":"2px","-moz-background-clip":"padding","-webkit-background-clip":"padding-box","background-clip":"padding-box","background-color":"#fff",color:"#323b43","font-family":"'Lato', sans-serif","font-size":"12px","line-height":"1.6",display:"none",position:"absolute",direction:"ltr","-webkit-box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)","-moz-box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)","box-shadow":"0px 0px 17px 1px rgba(0,0,0,0.5)"});
q.css({display:"table",margin:"10px auto"});
i.append(q);
var h=i.find("span.enable");
h.css({cursor:"pointer",color:"#323b43","text-decoration":"underline"});
if(f.enabled){var p=false
}else{var p=true
}h.click(function(){wisestamp_utils.send_request({command:"set_enabled",value:p,closePanel:true},function(){f.update_enabled_status(p)
})
});
switch(f.m_menu_direction){case"top":f.add_menu_bottom_disabled_triangle(i);
break;
case"right":f.add_menu_left_disabled_triangle(i);
break;
case"bottom":f.add_menu_top_disabled_triangle(i);
break
}return i
}};
this.open_wisestamp_compose_menu=function(l){var r=l.parents(d.editor_parent_div.join(", "));
var p=r.find("[wisestamped][data-wisestamp-editor-id]");
var t;
if(!(p.length===1)){var o;
try{o=r.find("iframe")
}catch(q){wisestamp_utils.log("[wisestamp_content_inbox::open_wisestamp_compose_menu] iframes exception!");
o=[]
}var u=[];
for(var m=0;
m<o.length;
m++){var h=wisestamp_ui.get_iframe_document(o[m]);
if(!(typeof(h)==="undefined")){var g=wisestamp_ui.find_element_recursively("[wisestamped][data-wisestamp-editor-id]",h);
if(g!=null){for(var k=0;
k<g.length;
k++){u.push(g[k])
}}}}if(u.length===1){p=wisestamp_jquery(u)
}else{p=[]
}}if(p.length===1){t=p.attr("data-wisestamp-editor-id")
}else{t=undefined
}var s=l[0].ownerDocument;
wisestamp_jquery("#wisestamp-menu, #wisestamp-control-signature-insertion").remove();
var n=false;
wisestamp_utils.send_request({command:"get",type:"user_plan"},function(i){wisestamp_utils.send_request({command:"load_param",param:["enabled"]},function(x){if(wisestamp.sys.platform==="safari"){x=JSON.parse(x)
}f.enabled=x.enabled;
var v=f.get_wisestamp_compose_menu(f.m_data,s,i,t);
var w=wisestamp_jquery(s).find("body");
w.append(v);
v.show();
var z=l.offset();
v.css({display:"block",position:"absolute","z-index":"9999"});
switch(f.m_menu_direction){case"top":if(l.is(d.icon_container_reply.join(", "))){v.css({top:z.top-v.height()-33})
}else{v.css({top:z.top-v.height()-20})
}if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){v.css({left:z.left+l.width()-65})
}else{v.css({left:z.left-v.width()+l.width()+37})
}break;
case"right":v.css({top:z.top+l.height()-50,left:z.left+34});
break;
case"bottom":v.css({top:z.top+31});
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){v.css({left:z.left+l.width()-65})
}else{v.css({left:z.left-v.width()+l.width()+37})
}break
}wisestamp_utils.setTimeout(function(){n=true
},500);
var j=function(){v.remove();
n=false;
wisestamp_ui.remove_event_recursively(document,".wisestamp-compose-menu");
f.close_wisestamp_menu_event(".wisestamp-compose-menu",undefined)
};
var y=function(A){if(n&&!wisestamp_jquery(A.target).hasClass("wisestamp-always-do")&&!wisestamp_jquery(A.target).hasClass("wisestamp-always-do-label")){j()
}};
wisestamp_ui.add_event_recursively(document,"click.wisestamp-compose-menu",y);
wisestamp_ui.add_event_recursively(document,"keyup.wisestamp-compose-menu",function(A){if(A.keyCode===27){j()
}});
f.close_wisestamp_menu_event("click.wisestamp-compose-menu",y)
})
})
};
this.add_always_do_button=function(i){var k=wisestamp_jquery('<div class="wisestamp-always-do-wrapper" style="margin: 20px 30px;"></div>');
var h=wisestamp_jquery('<input type="checkbox" id="wisestamp-always-do" class="wisestamp-always-do"/>');
var j=wisestamp_jquery('<label for="wisestamp-always-do" class="wisestamp-always-do-label">&nbsp;&nbsp;Always do this for this email</label>');
var g="<style>";
g+='.wisestamp-always-do + label:before {background: url("'+wisestamp_utils.get_url("content/img/checkbox_unchecked.png",true)+'");}';
g+='.wisestamp-always-do:checked + label:before {background: url("'+wisestamp_utils.get_url("content/img/checkbox_checked.png",true)+'");}';
g+="</style>";
k.append(h);
k.append(j);
i.append(g);
i.append(k)
};
this.add_menu_bottom_footer=function(i,h){var j=wisestamp_jquery('<div class="wisestamp-menu-bottom-footer"></div>');
j.css({padding:"12px 20px 15px 20px",background:"#f2f2f2"});
var g=wisestamp_jquery('<div style="float: left;"></div>');
f.add_footer_link(g,{label:"Edit Signature",command:function(){f.open_link(wisestamp.config.urls.website.editor,"compose","edit_signature")
}});
f.add_footer_link(g,{label:"Signature insertion settings",command:function(){f.open_link(wisestamp.config.urls.website.signature_settings,"compose","manage_signature_insertion")
}});
if(h){f.add_footer_link(g,{label:"Upgrade",command:function(){f.open_link(f.urls.upgrade_url,"compose","upgrade_compose","upgrade_compose")
}})
}j.append(g);
j.append('<div style="clear: both;"></div>');
i.append(j)
};
this.add_footer_link=function(j,i){var g=i.label;
var h=wisestamp_jquery('<div><span class="arrow-menu-link">&gt;</span>'+g+"</div>");
h.css({cursor:"pointer",color:"#1CB7EB","line-height":"180%","font-family":"'Lato', sans-serif","font-size":"13px","font-weight":"600"});
h.hover(function(){wisestamp_jquery(this).css({color:"#333"})
},function(){wisestamp_jquery(this).css({color:"#1CB7EB"})
});
h.click(i.command);
j.append(h)
};
this.add_menu_top_header=function(h,g){var j=wisestamp_jquery('<div class="wisestamp-menu-top-header"></div>');
var i=wisestamp_jquery("<span>"+g.label+"</span>");
j.append(i);
j.css({background:"#fff",color:"#333",padding:"25px 0px 0px 20px","font-family":"'Lato', sans-serif","font-weight":"600","margin-bottom":"7px","font-size":"17px"});
h.append(j)
};
this.add_menu_item=function(i,h,g){i.append(f.create_menu_item(h,false,g))
};
this.new_frames_found=function(h){if(e.new_frames_found(h)){return true
}if(typeof h==="undefined"){h=wisestamp_jquery
}var k=wisestamp_jquery(h.find(d.insert_neighbour.join(", "))).length;
var i=wisestamp_jquery(h.find(d.editor_not_wisestamped.join(", "))).length;
var j=wisestamp_jquery(h.find(d.disabled_editor.join(", ")));
var l=0;
j.each(function(){if(wisestamp_jquery(this).html()==="<br>"){l++
}});
var g=false;
if((k>c)||(i>0)||(l>0)){g=true
}c=k;
return g
};
this.create_menu_item=function(k,i,h){var g,m;
var j=f.is_selected_signature(k,h);
if(i){g=wisestamp_jquery("<menuitem />");
g.attr("type",k.type);
g.attr("label",k.label);
m="command";
if(j){g.attr("checked",true)
}else{if(typeof k.imageURI==="string"){g.attr("image",k.imageURI)
}}}else{g=wisestamp_jquery("<div></div>");
var l=wisestamp_jquery('<div class="wisestamp-signature-switch '+(j?"signature-active":"")+'"></div>');
l.html(k.label);
m="click";
if(j){l.css({"background-image":'url("'+wisestamp_utils.get_url("content/img/checkbox.png",true)+'")'})
}else{if(typeof k.imageURI==="string"){l.css({"background-image":'url("'+k.imageURI+'")'})
}}g.css({cursor:((typeof(k.command)==="function")?"pointer":"default"),color:(((typeof(k["text-color"])==="string")&&(!j))?k["text-color"]:"#333"),border:"none","background-color":((typeof(k["background-color"])==="string")?k["background-color"]:"white"),"text-decoration":((typeof(k["text-decoration"])==="string")?k["text-decoration"]:"none"),width:"100%",display:"block"});
l.css({display:"block",margin:"0px 1px 0px 0px",padding:"7px 6px 7px 50px","font-size":"15px","line-height":"normal","background-position":"30px center","background-repeat":"no-repeat","font-family":"'Lato', sans-serif"});
if(typeof(k["text-align"])==="string"){l.css({"text-align":k["text-align"]})
}if(typeof(k["background-color-hover"])==="string"){l.hover(function(){wisestamp_jquery(this).css("background-color",k["background-color-hover"])
},function(){wisestamp_jquery(this).css("background-color",((typeof(k["background-color"])==="string")?k["background-color"]:"white"))
})
}if(k.name==="switch-signature"||k.name==="add-another-signature"){l.hover(function(){if(!wisestamp_jquery(this).hasClass("signature-active")){wisestamp_jquery(this).css({"background-image":'url("'+wisestamp_utils.get_url("content/img/checkbox.png",true)+'")'});
wisestamp_jquery(".signature-active").css({"background-image":'url("'+wisestamp_utils.get_url("content/img/checkbox_empty.png",true)+'")'})
}},function(){if(!wisestamp_jquery(this).hasClass("signature-active")){wisestamp_jquery(this).css({"background-image":'url("'+wisestamp_utils.get_url("content/img/checkbox_empty.png",true)+'")'});
wisestamp_jquery(".signature-active").css({"background-image":'url("'+wisestamp_utils.get_url("content/img/checkbox.png",true)+'")'})
}})
}if(k.name==="add-another-signature"){l.append('<span style="position: relative; bottom: 1px; left: 5px; font-size: 10px; background: #FF6009; padding: 2px 5px; border-radius: 2px; color: #fff;">PRO</span>')
}g.append(l)
}if(typeof k.disabled==="boolean"){g.attr("disabled",k.disabled)
}if(typeof k.command==="function"){g.bind(m,k.command)
}if(typeof k.class_name==="string"){g.attr("class",k.class_name)
}if(typeof k.id==="string"){g.attr("id",k.id)
}return g[0]
};
this.is_selected_signature=function(h,g){if((!(typeof(h.type)==="undefined"))&&(!(typeof(h.id)==="undefined"))&&(h.type.toString()==="radio")&&(h.id.toString()!=="")&&(!(typeof(g)==="undefined"))&&(!(typeof(f.m_last_signature_dict[g])==="undefined"))&&(h.id.toString()===f.m_last_signature_dict[g].toString())){return true
}return false
};
this.get_signature_id=function(g){return f.m_last_signature_dict[g]
};
this.get_editor_parent_div=function(h){var j=wisestamp_jquery(h);
var i=j[0].ownerDocument.defaultView.frameElement;
var g=((i===null)?j:wisestamp_jquery(i)).parents(d.editor_parent_div.join(", "));
return g
};
this.get_compose_editor_parent_div=function(g){var i=wisestamp_jquery(g);
var h=i[0].ownerDocument.defaultView.frameElement;
var j=((h===null)?i:wisestamp_jquery(h)).parents(d.compose_editor_parent_div.join(", "));
return j
};
this.get_disabled_editor=function(g,k){var j=null;
for(var h in d.disabled_editor){j=wisestamp_ui.find_element_recursively(d.disabled_editor[h],g);
if((!(j===null))&&(j.length>0)){j.each(function(){if(wisestamp_jquery(this).html()==="<br>"){wisestamp_utils.log("[wisestamp_content_inbox::get_editor] found disabled editor >>>>>");
if(typeof(k)==="function"){k(wisestamp_jquery(this))
}}})
}}};
this.disable_editor=function(g){wisestamp_utils.log("[wisestamp_content_inbox::disable_editor] >>>>>");
f.remove_wisestamp_compose(g)
};
this.close_wisestamp_menu_event=function(i,h){var g=wisestamp_jquery(d.close_wisestamp_menu_event.join(", "));
if(g.length>0){g.unbind(i);
if(typeof(h)==="function"){g.bind(i,h)
}}};
this.update_wisestamp_top_image=function(){if((wisestamp_jquery("#wisestamp-top").length===1)&&(wisestamp_jquery("#wisestamp-top img.wisestamp-top-img").length===1)){if(wisestamp_utils.is_logged_in(f.wisestamp_uid)){if(f.m_news_notifications==null||f.m_news_notifications.length==0){if(f.m_upgrade_promo_notifications==null||f.m_upgrade_promo_notifications.length==0){if(f.enabled){wisestamp_jquery("#wisestamp-top img.wisestamp-top-img").attr("src",wisestamp_utils.get_url("content/img/wisestamp_top_icon_inbox.png",true))
}else{wisestamp_jquery("#wisestamp-top img.wisestamp-top-img").attr("src",wisestamp_utils.get_url("content/img/wisestamp_top_disabled_icon_inbox.png",true))
}}else{var g=f.m_upgrade_promo_notifications;
(function(h){if(h.length===0){return
}var i=h[0];
if(i.type!=="upgrade-promo"){return
}if(f.enabled){if((i["ws:enabled-top-icon-inbox-src"])&&(i["ws:enabled-top-icon-inbox-src"].length>0)){wisestamp_jquery("#wisestamp-top img.wisestamp-top-img").attr("src",i["ws:enabled-top-icon-inbox-src"])
}}else{if((i["ws:disabled-top-icon-inbox-src"])&&(i["ws:disabled-top-icon-inbox-src"].length>0)){wisestamp_jquery("#wisestamp-top img.wisestamp-top-img").attr("src",i["ws:disabled-top-icon-inbox-src"])
}}})(g)
}}else{if(f.enabled){wisestamp_jquery("#wisestamp-top img.wisestamp-top-img").attr("src",wisestamp_utils.get_url("content/img/wisestamp_top_icon_news_inbox.png",true))
}else{wisestamp_jquery("#wisestamp-top img.wisestamp-top-img").attr("src",wisestamp_utils.get_url("content/img/wisestamp_top_disabled_icon_news_inbox.png",true))
}}}else{if(f.enabled){wisestamp_jquery("#wisestamp-top img.wisestamp-top-img").attr("src",wisestamp_utils.get_url("content/img/wisestamp_top_icon_not_logged_in_inbox.png",true))
}else{wisestamp_jquery("#wisestamp-top img.wisestamp-top-img").attr("src",wisestamp_utils.get_url("content/img/wisestamp_top_disabled_icon_not_logged_in_inbox.png",true))
}}}};
this.update_all_promos=function(){f.get_editor(document,function(g){if((!(g===null))&&(typeof(g)==="object")&&(g.length>0)){f.update_promo(g[0],false)
}})
};
this.update_promo=function(m,r){if(!(typeof(m)==="undefined")){var g=wisestamp_jquery(m);
var l=g.find('div[href="http://WS_promo"]');
if(l.length>=1){var q=false;
var n=false;
var p;
var j;
var o=f.get_editor_parent_div(m);
var h=o.find(d.total_recipients_email_elements.join(", "));
var k=o.find(d.to_recipients_email_elements.join(", "));
var i=o.find(d.to_recipients_name_elements.join(", "));
if((h.length===1)&&(k.length===1)&&(i.length===1)){p=k.attr(d.recipient_email_attr);
j=i.text();
j=wisestamp_utils.trim_recipient_name(j);
if((typeof(j)==="string")&&(j.length>0)&&(!(j.indexOf("@")>=0))){n=true
}p=wisestamp_utils.trim_recipient_email(p);
if((typeof(p)==="string")&&(p.length>0)){if(wisestamp_utils.validate_email(p)){q=true
}}}f.handle_update_promo(r,g,l,q,n,p,j)
}}};
var e=null;
this.set_super=function(g){e=g;
e.construct(this)
}
};
wisestamp_content_inbox.prototype=wisestamp_obj_web;
var wisestamp_obj_inbox=new wisestamp_content_inbox();
wisestamp_obj_inbox.set_super(wisestamp_obj_web);
wisestamp_obj_inbox.init();
wisestamp_content=wisestamp_obj_inbox
};