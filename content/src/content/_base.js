var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/_base.js");
wisestamp_utils.log("_base.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){wisestamp_utils.log("[wisestamp_content_base] >>>>>");
var wisestamp_content_base=function(){this.m_content_type="unknown";
this.m_is_popup=false;
this.m_init_conduit=false;
this.m_wisestamp_inmail_promo_enabled=false;
this.m_wisestamp_personal_signature_enabled=false;
this.m_wisestamp_personal_promo_enabled=false;
this.m_top_menu_enabled=false;
this.m_top_menu_direction="default";
this.m_top_menu_top_offset=0;
this.m_top_menu_left_offset=0;
this.m_top_menu_right_offset=0;
this.m_notifications_top_offset=0;
this.m_notifications_left_offset=0;
this.m_notifications_right_offset=0;
this.m_data=null;
this.m_inmail_promo=false;
this.m_last_signature_id=null;
this.m_current_editor_body=null;
this.m_space_before_signature=1;
this.m_space_before_quote=1;
this.m_last_signature_dict={};
this.m_event_name_dict={};
this.m_menu_direction="right";
this.m_control_signature_insertion_direction="right";
this.m_control_signature_insertion_top_offset=0;
this.m_control_signature_insertion_left_offset=0;
this.m_new_mail=null;
this.m_news_notifications=null;
this.m_news_notified_id=null;
this.m_upgrade_promo_notifications=null;
this.m_wisestamp_ui=null;
this.m_delay_after_load=0;
var a="data-wisestamp-iframe";
this.wisestamp_uid=false;
this.enabled=true;
this.dont_show_login_popup=false;
this.urls={};
this.version=undefined;
this.circulate_site_id="wisestamp.com";
var c=this;
this.send_request=function(d,e){};
this.get_data=function(f,i,j,e,d){wisestamp_utils.log("[wisestamp_content_base::get_data] >>>>>");
var g={command:"get",webmail:c.m_content_type,param:i,type:f,content_type:e};
if(f==="signature"){var h=c.m_event_name_dict[d];
if(typeof(h)==="undefined"){h="compose"
}g.event_name=h
}c.send_request(g,function(k){wisestamp_utils.log("[wisestamp_content_base::get_data] received data >>>>>");
if(typeof(j)==="function"){j(k)
}})
};
this.refresh_all_data=function(d){wisestamp_utils.log("[wisestamp_content_base::refresh_all_data] >>>>>");
c.get_data("all",null,function(e){wisestamp_utils.log("[wisestamp_content_base::refresh_all_data] received data >>>>>");
if(wisestamp.sys.platform==="safari"){e=JSON.parse(e)
}c.m_data=e.data;
wisestamp_menu.set_data(c.m_data);
if(typeof(d)==="function"){d()
}})
};
this.init=function(){wisestamp_utils.log("[wisestamp_content_base::init] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
if(!c.m_is_popup){wisestamp_utils.send_request({command:"save_param",param:"last_mail_service",value:c.m_content_type},function(){})
}};
this.setup_mapping=function(){};
this.setup_wisestamp=function(){wisestamp_utils.log("[wisestamp_content_base::setup_wisestamp] >>>>>");
var d=c.add_top_menu();
c.show_new_notification();
if(wisestamp_utils.is_empty(d)){return false
}return true
};
this.add_top_menu=function(){};
this.after_add_top_menu=function(){};
this.generate_session_id=function(){return Math.floor((Math.random()*900000000000000)+100000000000000)
};
this.setup_wisestamp_compose=function(e,d){if(typeof d==="undefined"){d=true
}wisestamp_utils.log("[wisestamp_content_base::setup_wisestamp_compose] b_insert_signature="+d);
c.m_session_id=c.generate_session_id();
c.refresh_all_data(function(){c.init_email_mode(e);
c.m_last_signature_id="0";
c.insert_wisestamp_icon(c.m_data);
if(d){c.setup_mapping(e);
c.insert_mapped_signature(c.get_user_id(),undefined,e)
}})
};
this.remove_wisestamp_compose=function(d){wisestamp_utils.log("[wisestamp_content_base::remove_wisestamp_compose] >>>>>");
c.init_email_mode(d,false);
c.set_wisestamped(d,false);
d.attr("compose",false);
wisestamp_jquery("#wisestamp-icon").remove()
};
this.new_frames_found=function(f){var e;
if(typeof f==="undefined"){f=wisestamp_jquery
}var d=wisestamp_jquery(f.find("iframe"));
var g=d.filter(":not(["+a+"=true])").filter(":visible").length;
if(g>0){e=true
}else{e=false
}d.each(function(h,i){var k=wisestamp_jquery(i);
var j=k.is(":visible")?"true":"false";
if((e===true)||(j==="false")){k.attr(a,j)
}});
return e
};
this.conduit_setup_compose=function(){wisestamp_utils.log("[wisestamp_content_base::conduit_setup_compose] >>>>>");
c.try_setup_wisestamp_compose()
};
this.get_user_id=function(){wisestamp_utils.log("[wisestamp_content_base::get_user_id] >>>>>");
var d="";
wisestamp_utils.log('[wisestamp_content_base::get_user_id] user_id = "'+d+'" <<<<<');
return d
};
this.insert_mapped_signature=function(f,e){function i(k,j){if(k[j]!=null){return k[j]
}return k.composeSigId
}function h(){for(var j in c.m_data.signatures){if("premium" in c.m_data.signatures[j]){continue
}return j
}return null
}wisestamp_utils.log("[wisestamp_content_base::insert_mapped_signature] account = "+f+", manual = "+e+" >>>>>");
var d=true;
var g=null;
c.get_editor(document,function(o){var p=o.attr("data-wisestamp-editor-id");
var k=c.is_email_mode(o,"compose");
var m=k?"composeSigId":"replySigId";
var j=c.get_current_signature(o);
if(j.length&&k){return
}if(typeof f==="undefined"){f=c.get_user_id()
}var q=null;
if(f in c.m_data.mappings){q=i(c.m_data.mappings[f],m)
}if(q===null&&typeof c.m_data.mappings.all!=="undefined"){q=i(c.m_data.mappings.all,m)
}if(q==null){for(var n in c.m_data.signatures){q=n;
break
}}var l=wisestamp_utils.prop_by_path(c,"m_data.signatures."+q,{});
if(q!=null&&"premium" in l){q=h()
}c.insert_signature(q,false,p)
})
};
this.insert_signature=function(g,e,d){if(g==="None"){g="0"
}wisestamp_utils.log("[wisestamp_content_base::insert_signature] signature_id = "+g+" >>>>>");
if(g==null){return
}c.m_last_signature_id=g;
if(wisestamp_menu){wisestamp_menu.set_last_signature_id(c.m_last_signature_id)
}if(!(typeof(d)==="undefined")){if(typeof(c.m_last_signature_dict[d])==="undefined"){c.m_event_name_dict[d]="compose"
}else{c.m_event_name_dict[d]="change_sig"
}c.m_last_signature_dict[d]=g
}wisestamp_utils.log("[wisestamp_content_base::insert_signature] signature_id = "+g);
if(g==="0"){c.get_current_editor(function(h){c.insert_signature_html(h,"","",e)
});
if(!(typeof(d)==="undefined")){var f={command:"ws_track",action:c.m_event_name_dict[d]+"_no_sig"}
}else{var f={command:"ws_track",action:"compose_no_sig"}
}wisestamp_utils.send_request(f,function(){})
}else{c.get_data("signature",g,function(i){if(wisestamp.sys.platform==="safari"){i=JSON.parse(i)
}var j=i.data.html;
var k=i.data.vertical_html;
var h=i.promo_id;
c.get_current_editor(function(l){if(j!=""){c.track_event("insert_content",undefined,g);
if(typeof h!=="undefined"&&h!=null){c.track_event("insert_promo","promo_"+h)
}else{c.track_event("insert_no_promo","promo_"+h)
}}c.insert_signature_html(l,j,k,e)
})
},c.m_content_type,d)
}};
this.is_insert_above_quote=function(){return c.m_data.prefs.insertAboveQuote
};
this.get_current_signature=function(e){var g=c.get_quote_element(e);
if(g.length>0){var d=g.find('div[style*="color:WISESTAMP_SIG_'+c.m_session_id+'"]:not(.in-quote-element), div[style*="color:WISESTAMP_SIG_'+c.m_session_id+'"]:not(.in-quote-element)');
while(d.length>0){d.addClass("in-quote-element");
d=g.find('div[style*="color:WISESTAMP_SIG_'+c.m_session_id+'"]:not(.in-quote-element), div[style*="color:WISESTAMP_SIG_'+c.m_session_id+'"]:not(.in-quote-element)')
}}var f=wisestamp_jquery(e).find('div[style*="color:WISESTAMP_SIG_'+c.m_session_id+'"]:not(.in-quote-element), div[style*="color:WISESTAMP_SIG_'+c.m_session_id+'"]:not(.in-quote-element)');
return f
};
this.insert_signature_html=function(q,u,f,e){wisestamp_utils.log("[wisestamp_content_base::insert_signature_html] manual = "+e+" >>>>>");
var r;
var n;
if(wisestamp_jquery(q).attr("data-space-before-signature")==="0"){r=0;
n=0
}else{wisestamp_jquery(q).attr("data-space-before-signature","0");
r=c.m_space_before_quote;
n=c.m_space_before_signature
}function v(B,z,y){wisestamp_utils.log("[wisestamp_content_base::insert_signature_html::move_caret] >>>>>");
if(typeof B.getSelection!="function"){return false
}var A=B.getSelection();
var x=A.getRangeAt(0);
x.selectNode(z);
x.collapse(y)
}function w(A){wisestamp_utils.log("[wisestamp_content_base::insert_signature_html::insert_at_cursor] >>>>>");
if(typeof get_current_editor==="function"){var B=get_current_editor();
B.insertHTML(A)
}else{wisestamp_utils.log("[wisestamp_content_base::insert_signature_html::insert_at_cursor] trying execCommand.");
q[0].focus();
try{q.context.execCommand("inserthtml",false,A)
}catch(C){wisestamp_utils.log("[wisestamp_content_base::insert_signature_html::insert_at_cursor] editor_body.context.execCommand - exception!")
}if(c.get_current_signature(q).length===0){wisestamp_utils.log("[wisestamp_content_base::insert_signature_html::insert_at_cursor] execCommand didn't work, trying insertBefore.");
var z=k[0];
var D=z.firstChild;
z.insertBefore(document.createElement("br"),D);
z.insertBefore(document.createElement("br"),D);
var x=wisestamp_jquery(A);
for(var y=0;
y<x.length;
y++){z.insertBefore(x[y],D)
}}}}function j(y,x){wisestamp_utils.log("[wisestamp_content_base::insert_signature_html::replace_footer] >>>>>");
if(x===""){y[0].parentNode.removeChild(y[0]);
return
}if(typeof get_current_editor==="function"){y[0].innerHTML=x
}else{y[0].parentNode.replaceChild(wisestamp_jquery(x)[0],y[0])
}}function m(x,A,z){wisestamp_utils.log("[wisestamp_content_base::insert_signature_html::replace_layout] >>>>>");
var y;
if(typeof get_current_editor==="function"){y=x.find(".ws-user-content");
y.prepend(z)
}else{y=x.find(".ws-user-content");
A.find(".ws-user-content").html(y.html());
x[0].parentNode.replaceChild(A[0],x[0])
}return y
}function s(z){wisestamp_utils.log("[wisestamp_content_base::insert_signature_html::remove_layout] >>>>>");
var A;
var y=h.find(".ws-user-content");
var x=y.find("[id=WISESTAMP_CONTENT_"+c.m_session_id+"]");
if(x.length>0){A=x
}else{A=wisestamp_jquery('<div id="WISESTAMP_CONTENT_'+c.m_session_id+'">');
A.html(y.html())
}h.after(A);
h.remove();
return y
}function d(A,D,z){wisestamp_utils.log("[wisestamp_content_base::insert_signature_html::insert_before] >>>>>");
if(l){z.append(A);
for(var y=0;
y<r;
y++){z.append("<br />")
}}else{var B=D[0].parentNode;
var x=wisestamp_jquery(A);
try{for(var y=0;
y<x.length;
y++){B.insertBefore(x[y],D[0])
}for(var y=0;
y<r;
y++){B.insertBefore(document.createElement("br"),D[0])
}}catch(C){for(var y=0;
y<x.length;
y++){B.insertBefore(x[y],z[0].firstChild)
}}}}function g(y,H,I){wisestamp_utils.log("[wisestamp_content_base::insert_signature_html::insert_footer] >>>>>");
var B=(y==="");
if((c.m_wisestamp_personal_promo_enabled)||(c.m_wisestamp_personal_signature_enabled)){if(!B){wisestamp_utils.setTimeout(function(){c.update_promo(q[0],true)
},50)
}}if(!B){wisestamp_utils.setTimeout(function(){c.update_promo_link(q[0])
},50)
}if(c.m_wisestamp_inmail_promo_enabled){if(typeof wisestamp_inmail_promo!=="undefined"){if(B){wisestamp_utils.setTimeout(function(){wisestamp_inmail_promo.ws_remove_all(q[0])
},150)
}else{wisestamp_utils.setTimeout(function(){wisestamp_inmail_promo.insert_promo(q[0]);
wisestamp_inmail_promo.observe_editor(q[0])
},150)
}}}if(!!c.urls.circulate){y+='<span data-circulate="'+c.urls.circulate+'" data-site-id="['+c.circulate_site_id+']" style="display:none;"></span><img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" style="display:none;"/>'
}var x="WISESTAMP_SIG_"+c.m_session_id;
var E="<div>"+y+"</div>";
E='<div style="color:'+x+';" >'+E+"</div>";
var G=c.get_current_signature(q);
wisestamp_utils.log("[wisestamp_content_base::insert_signature_html] current_sig.length = "+G.length+", footer_html_is_empty = "+B+".");
if(G.length!==0){if(B){return j(G,"")
}else{return j(G,E)
}}if(B){return
}var F=c.is_email_mode(q,"compose");
wisestamp_utils.log("[wisestamp_content_base::insert_signature_html] is_new_mail = "+F);
var A="";
for(var C=0;
C<n;
C++){A+="<br />"
}E=A+E;
if(F){wisestamp_utils.log("[wisestamp_content_base::insert_signature_html] inserting on new");
H.append(E);
return
}H.append("<br />");
wisestamp_utils.log("[wisestamp_content_base::insert_signature_html] inserting on reply");
var z=c.get_quote_element(q);
if(z.length>0){d(E,z,H)
}else{try{H[0].appendChild(E)
}catch(D){H.append(E)
}}}var o=wisestamp_jquery(q).find("[id=WISESTAMP_CONTENT_"+c.m_session_id+"]");
var h=wisestamp_jquery(q).find("[id=WISESTAMP_LAYOUT_"+c.m_session_id+"]");
var i=wisestamp_jquery();
var k=wisestamp_jquery();
if(wisestamp_utils.is_empty(f)){if(h.length){s(h)
}h=undefined
}else{i=wisestamp_jquery("<div>");
i.attr("id","WISESTAMP_LAYOUT_"+c.m_session_id);
i.html(f);
if(h.length===1){m(h,i,o)
}else{var t=c.get_quote_element(q);
var p=(t.length>0)?t.prevAll():wisestamp_jquery(q).children();
k=i.find(".ws-user-content");
k.append(p.clone());
p.remove();
wisestamp_jquery(q).prepend(i[0])
}}var l=true;
if(k.length===0){l=false;
k=q
}g(u,k,l)
};
this.on_menu_switch_signature=function(e,d){wisestamp_utils.log("[wisestamp_content_base::on_menu_switch_signature] signature_id = "+e);
c.refresh_all_data(function(){c.track_event("switch");
c.insert_signature(e,true,d)
})
};
this.get_current_editor=function(d){c.get_editor(null,function(e){if(e){d(e)
}else{d(c.m_current_editor_body)
}})
};
this.open_link=function(h,f,e,d,g){window.open(c.get_tracked_link(h,f,e,d,g))
};
this.feature_supported=function(d,e){e(true);
return
};
this.track_event=function(g,d,f){if(typeof d==="undefined"){d=c.m_content_type
}if(typeof f==="undefined"){f=0
}var e={command:"track",param:{action:g,label:d,value:f}};
c.send_request(e)
};
this.notified=function(g,e,f){wisestamp_utils.log("[wisestamp_content_base::notified] id="+g+", value="+e);
var d={command:"notified",param:{id:g,value:e}};
c.send_request(d,function(h){wisestamp_utils.log("[wisestamp_content_base::notified] response="+JSON.stringify(h));
if(typeof(f)==="function"){f(h.value)
}})
};
this.get_notifications=function(e){wisestamp_utils.log("[wisestamp_content_base::get_notifications]");
var d={command:"get_notifications"};
c.send_request(d,function(g){if(wisestamp.sys.platform==="safari"){g=JSON.parse(g)
}var f=g.items;
var h=g.notified_id;
wisestamp_utils.log("[wisestamp_content_base::get_notifications] items.length = "+f.length+", notified_id = "+h+".");
if(h==="news_notifications"){if(c.m_top_menu_enabled){c.m_news_notifications=f;
c.m_news_notified_id=h
}else{c.m_news_notifications=null;
c.m_news_notified_id=null
}f=[]
}else{c.m_news_notifications=null;
c.m_news_notified_id=null
}c.update_wisestamp_top_image();
e(f,h)
})
};
this.get_upgrade_promo_notifications=function(e){wisestamp_utils.log("[wisestamp_content_base::get_upgrade_promo_notifications]");
if(c.m_top_menu_enabled){var d={command:"get_upgrade_promo_notifications"};
c.send_request(d,function(g){if(wisestamp.sys.platform==="safari"){g=JSON.parse(g)
}var f=g.items;
var h=g.notified_id;
wisestamp_utils.log("[wisestamp_content_base::get_upgrade_promo_notifications] items.length = "+f.length+", notified_id = "+h+".");
if(h==="upgrade_promo_notifications"){c.m_upgrade_promo_notifications=f
}else{c.m_upgrade_promo_notifications=null
}c.update_wisestamp_top_image();
e(f,h)
})
}};
this.get_tracked_link=function(k,i,h,g,j){if(typeof h==="undefined"){h="general"
}k+=(k.indexOf("?")==-1)?"?":"&";
k+="utm_source=extension&utm_medium=webmail&utm_campaign="+i+"&utm_term="+h;
if(typeof(g)==="string"){k+="&referring_feature="+g
}if(typeof(j)==="string"){k+="&ws_ncid="+j
}k+="&from_extension=true";
var f=c.version;
var e=wisestamp.sys.platform;
var d=c.wisestamp_uid;
if(k.indexOf("<!-- platform -->")==-1){k+="&platform=<!-- platform -->"
}k=k.replace(/<!-- wisestamp_uid -->/g,d);
k=k.replace(/<!-- version -->/g,f);
k=k.replace(/<!-- platform -->/g,e);
return k
};
this.getwisestamp_jquery=function(){return wisestamp_jquery
};
this.position_bubble=function(){};
this.show_bubble=function(f){var e=null;
function d(g){wisestamp_utils.log("[wisestamp_content_base::show_bubble::remove_bubble] >>>>>");
if(!e.is(":visible")||e.attr("removing")==="true"){return
}e.attr("removing","true");
e.fadeOut("fast",function(){wisestamp_utils.log("[wisestamp_content_base::show_bubble::remove_bubble] is:visible = "+e.is(":visible"));
e.remove();
if(f.popup){f.popup.hidePopup()
}if(g!=false){f.callback()
}});
wisestamp_ui.remove_event_recursively(document,".wisestamp-bubble");
c.close_wisestamp_menu_event(".wisestamp-bubble",undefined)
}wisestamp_utils.setTimeout(function(){var m=wisestamp_jquery;
var g=m("body");
var k=window;
f.popup=null;
var l;
var h;
switch(f.type){case"minor":if(!(f.width)){f.width=285
}var j={arrow_size:5,width:f.width,height:f.height};
j.arrow_off_set=(Math.round((j.width/2)-j.arrow_size));
h=m('<div id="psst_cont" style="text-align: center; border: 1px solid #c9c9c9; color: black; background: white; white-space: normal; line-height: 16px;"><div id="psst_arrow_up" style="width: 0px; height: 0px; border-left: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 5px solid #fa7d7f; margin: -5px auto 0px auto;"></div><div id="pink_bar" style="height: 4px; background: #fa7d7f;"></div><div id="psst" style="padding: 15px 36px; font-size: 13px;">'+f.content.html()+"</div></div>");
h.find("a").click(function(){c.track_notification(f.title,"_click")
});
e=c.m_wisestamp_ui.get_minor_bubble({wisestamp_jquery:m,window:window,body:k.document.body,style:j,content:h});
break;
case"major":var j={border_width:1,border_color:"#0b5d65",background_color:"white",arrow_size:15,border_radius:3,width:f.width,height:f.height};
j.arrow_off_set=(Math.round((j.width/2)-j.arrow_size));
h=m("<div></div>");
h.css({padding:"7px"});
h.append(f.content);
l={remind:{title:"Show me later",action:function(n){d(false)
}},close:{title:"Close",action:function(n){d()
}}};
if(!(f.notified_id==="irh_notifications")){f.content.find("a").click(function(){c.track_notification(f.title,"_click");
d()
});
f.content.find("input[type=submit]").click(function(){d()
})
}e=c.m_wisestamp_ui.get_bubble({wisestamp_jquery:m,window:window,body:k.document.body,style:j,content:h,popup:f.popup},l);
break
}g.find(".wisestamp-bubble").remove();
g.append(e);
e.css({display:"none",position:"absolute",direction:"ltr"});
c.position_bubble(e,f,j);
e.fadeIn("fast");
if(f.type=="minor"){wisestamp_ui.add_event_recursively(document,"click.wisestamp-bubble",d);
wisestamp_ui.add_event_recursively(document,"keypress.wisestamp-bubble",d);
c.close_wisestamp_menu_event("click.wisestamp-bubble",d);
e.click(d)
}if(f.notified_id==="irh_notifications"){g.append("<style>#wisestamp-irh-notification-click-button:hover {opacity: 0.8;}</style>");
var i=wisestamp_jquery("<div></div>");
i.css({width:"7px",height:"6px","background-image":'url("'+wisestamp_utils.get_url("content/img/irh_notifications/x.png",true)+'")',"background-position":"center center","background-repeat":"no-repeat",position:"absolute",top:"10px",right:"10px",cursor:"pointer"});
i.click(function(){d()
});
e.append(i);
e.find("#wisestamp-irh-notification-click-button").click(function(){c.track_notification(f.title,"_click_button");
wisestamp_utils.send_request({command:"set_irh_enabled",value:true,closePanel:true},function(){e.find("#wisestamp-irh-notification").html('<img style="margin: 15px auto 0px; display: table;" src="'+wisestamp_utils.get_url("content/img/irh_notifications/heart-logo.png",true)+'" /><div style="color: #323b43; font-size: 21px; font-weight: bold; margin: 20px 0px 0px 51px;">Thank you you are awesome!</div><img style="margin: 20px auto 0px; display: table;" src="'+wisestamp_utils.get_url("content/img/irh_notifications/banner.png",true)+'" /><div style="color: #323b43; font-size: 14px; margin: 20px auto 0px; display: table; text-align: center; line-height: 1.4;">You’ll now see the iRobinHood support badge on participating partner sites. Just continue your regular online shopping activity, and you’ll automatically generate funds for charity. You can disable the badge at any time.</div><div style="color: #323b43; font-size: 14px; margin: 0px auto; display: table; line-height: 1.4;">Thank you for giving.</div><img style="margin: 25px 15px 5px 245px; display: table;" src="'+wisestamp_utils.get_url("content/img/irh_notifications/team-sig.png",true)+'" />');
e.find("#remind").remove();
e.css({height:"385px"})
})
})
}},f.delay)
};
this.show_new_notification=function(){wisestamp_utils.log("[wisestamp_content_base::show_new_notification] >>>>>");
if(!c.m_is_popup){var d;
if(c.m_top_menu_enabled){d=(wisestamp_jquery("#wisestamp-top").length===1)
}else{d=true
}if(d){c.get_notifications(function(e,f){wisestamp_utils.log("[wisestamp_content_base::show_new_notification::get_notifications::callback] items.length = "+e.length+", notified_id = "+f+".");
if(e.length===0){return
}c.notified(f,undefined,function(i){var h=e[0];
if(i>=h.date){return
}if(h.description.length===0){return
}if(h.type!=="minor"&&h.type!=="major"){return
}c.track_notification(h.title,"");
var j=c.getwisestamp_jquery();
var g=j("<span>"+h.description+"</span>");
c.show_bubble({title:h.title,type:h.type,width:h.width,height:h.height,content:g,delay:3000,notified_id:f,position_bubble_selector:"#wisestamp-top",callback:function(){c.notified(f,h.date)
}})
})
});
c.get_upgrade_promo_notifications(function(f,h){wisestamp_utils.log("[wisestamp_content_base::show_new_notification::get_upgrade_promo_notifications::callback] items.length = "+f.length+", notified_id = "+h+".");
if(h==="upgrade_promo_notifications"){if(f.length>0){var g=f[0];
var e=wisestamp_jquery('<div class="wisestamp-temp-upgrade-promo-div" style="display: none;"></div>');
e.html(g.description);
wisestamp_jquery("body").append(e);
wisestamp_utils.setTimeout(function(){wisestamp_jquery(".wisestamp-temp-upgrade-promo-div").remove()
},30*1000)
}}});
wisestamp_utils.setTimeout(function(){c.show_new_notification()
},60*60*1000)
}else{wisestamp_utils.log("[wisestamp_content_base::show_new_notification] not ready for notifications, waiting...");
wisestamp_utils.setTimeout(function(){c.show_new_notification()
},1000)
}}};
this.is_new_mail=function(e,d){if(typeof d!=="undefined"){c.m_new_mail=d
}if(c.m_new_mail!=null){return c.m_new_mail
}else{return c.get_quote_element(e).length===0
}};
this.init_email_mode=function(d,f){var e=wisestamp_jquery(d);
if(typeof f==="undefined"){f=((c.get_quote_element(d).length===0)?"compose":"reply")
}e.attr("wsmode",f)
};
this.is_email_mode=function(d,e){return(wisestamp_jquery(d).attr("wsmode")===e)
};
this.get_quote_element=function(d){return[]
};
this.get_editor_parent_quote_element=function(d){return[]
};
this.track_notification=function(g,f){var e="ext_notification_"+g.toLowerCase().replace(/ /g,"_");
switch(wisestamp.sys.platform){case"firefox":e+="_ff";
break;
case"chrome":e+="_cr";
break;
case"safari":e+="_sf";
break;
default:e+="_unknown";
break
}e+=f;
switch(wisestamp.sys.platform){case"firefox":break;
case"chrome":case"safari":default:var d={command:"ws_track",action:e};
wisestamp_utils.send_request(d,function(){});
d={command:"ga",action:e};
wisestamp_utils.send_request(d,function(){});
break
}};
this.close_wisestamp_menu_event=function(e,d){};
this.update_wisestamp_top_image=function(){};
this.default_promo_text=function(){return"Get a signature like this:"
};
this.personal_promo_text=function(d){return"Hello "+d+"! Get a signature like this:"
};
this.default_promo_link=function(){return wisestamp.config.urls.apis.default_promo_link
};
this.personal_promo_link=function(e){var f={rurl:wisestamp.config.urls.apis.create_auto_signature+"?"+wisestamp_jquery.param({data:wisestamp_utils.btoa(e),utm_source:"extension",utm_medium:"email",utm_campaign:"personal_promo"}),e:"personal_promo_click"};
var d=wisestamp.config.urls.apis.ws_stats_redirect+"?"+wisestamp_jquery.param({rdata:wisestamp_utils.btoa(JSON.stringify(f))});
return d
};
this.default_promo_pixel=function(){return wisestamp.config.urls.apis.default_promo_pixel
};
this.personal_promo_pixel=function(){return wisestamp.config.urls.apis.personal_promo_pixel
};
this.handle_update_promo=function(f,i,e,h,k,g,d){wisestamp_utils.log("[wisestamp_content_base::handle_update_promo] m_wisestamp_personal_promo_enabled = "+c.m_wisestamp_personal_promo_enabled+", m_wisestamp_personal_signature_enabled = "+c.m_wisestamp_personal_signature_enabled+", one_to_recipient = "+h+", recipient_name_is_known = "+k+", always_update_promo = "+f+", + >>>>>");
if(!h){g=""
}if(!k){d=""
}var j=f;
if(!((i.attr("data-recipient-email")===g)&&(i.attr("data-recipient-name")===d))){i.attr("data-recipient-email",g);
i.attr("data-recipient-name",d);
j=true
}if(j){if(h){wisestamp_utils.send_request({command:"get_person",email:g},function(l){if((typeof(l.email)==="string")&&(typeof(l.given_name)==="string")&&(l.email===g)&&(l.given_name.length>0)){d=l.given_name;
k=true
}if((k)&&(c.m_wisestamp_personal_promo_enabled)){e.find("div.promo-placeholder span").html(c.personal_promo_text(d))
}else{e.find("div.promo-placeholder span").html(c.default_promo_text())
}if(c.m_wisestamp_personal_signature_enabled){e.find("a").attr("href",c.personal_promo_link(g));
e.find('img[src*="http://ws-stats.appspot.com/ga/pixel.png?"], img[src*="https://ws-stats.appspot.com/ga/pixel.png?"]').attr("src",c.personal_promo_pixel())
}else{e.find("a").attr("href",c.default_promo_link());
e.find('img[src*="http://ws-stats.appspot.com/ga/pixel.png?"], img[src*="https://ws-stats.appspot.com/ga/pixel.png?"]').attr("src",c.default_promo_pixel())
}})
}else{e.find("div.promo-placeholder span").html(c.default_promo_text());
e.find("a").attr("href",c.default_promo_link());
e.find('img[src*="http://ws-stats.appspot.com/ga/pixel.png?"], img[src*="https://ws-stats.appspot.com/ga/pixel.png?"]').attr("src",c.default_promo_pixel())
}}};
this.update_all_promos=function(){};
this.update_promo=function(e,d){};
this.get_signature_id=function(d){return c.m_last_signature_id
};
this.update_promo_link=function(e){var g=wisestamp_jquery(e);
var d=g.find('div[href="http://WS_promo"]');
if(d.length>=1){var f=d.find('a[href*="ws_random_number="]');
if(f.length>=1){f.each(function(){var i=wisestamp_jquery(this);
var j=i.attr("href");
var h=Math.floor((Math.random()*900000000000000)+100000000000000);
j=j.replace(/ws_random_number\=/g,"u="+h);
i.attr("href",j)
})
}}};
var b=null;
this.set_super=function(d){b=d
};
this.construct=function(d){c=d
}
};
window.addEventListener("message",function(b){try{if(b.origin!==window.document.location.origin){return
}if(b.data&&b.data.type){switch(b.data.type){case"EMAIL_SENT":switch(wisestamp.sys.platform){case"firefox":break;
case"chrome":case"safari":default:var a={command:"ws_track",action:"email_sent"};
wisestamp_utils.send_request({command:"load_param",param:["wisestamp_uid","temp_uid"]},function(d){if(!d.wisestamp_uid){var e;
if(!d.temp_uid){e=Math.floor((new Date()).getTime()/1000)+"_"+Math.floor((Math.random()*900000000000000)+100000000000000);
wisestamp_utils.send_request({command:"save_param",param:"temp_uid",value:e},function(){});
a.payload={temp_uid:e};
wisestamp_utils.send_request(a,function(){});
a={command:"ga",action:"email_sent"};
wisestamp_utils.send_request(a,function(){})
}else{a.payload={temp_uid:d.temp_uid};
wisestamp_utils.send_request(a,function(){});
a={command:"ga",action:"email_sent"};
wisestamp_utils.send_request(a,function(){})
}}else{wisestamp_utils.send_request(a,function(){});
a={command:"ga",action:"email_sent"};
wisestamp_utils.send_request(a,function(){})
}});
break
}break;
case"EMAIL_SENT_NO_SIG":switch(wisestamp.sys.platform){case"firefox":break;
case"chrome":case"safari":default:var a={command:"ws_track",action:"email_sent",payload:{no_sig:true}};
wisestamp_utils.send_request({command:"load_param",param:["wisestamp_uid","temp_uid"]},function(d){if(!d.wisestamp_uid){var e;
if(!d.temp_uid){e=Math.floor((new Date()).getTime()/1000)+"_"+Math.floor((Math.random()*900000000000000)+100000000000000);
wisestamp_utils.send_request({command:"save_param",param:"temp_uid",value:e},function(){});
a.payload=Object.assign(a.payload,{temp_uid:e});
wisestamp_utils.send_request(a,function(){});
a={command:"ga",action:"email_sent"};
wisestamp_utils.send_request(a,function(){})
}else{a.payload=Object.assign(a.payload,{temp_uid:d.temp_uid});
wisestamp_utils.send_request(a,function(){});
a={command:"ga",action:"email_sent"};
wisestamp_utils.send_request(a,function(){})
}}else{wisestamp_utils.send_request(a,function(){});
a={command:"ga",action:"email_sent"};
wisestamp_utils.send_request(a,function(){})
}});
break
}break;
case"CIO_ES":wisestamp_utils.send_request({command:"load_param",param:["wisestamp_uid","cio_es"]},function(d){if(d){if(!d.cio_es){if(d.wisestamp_uid){wisestamp_utils.send_request({command:"save_param",param:"cio_es",value:true});
wisestamp_utils.cio.es(d.wisestamp_uid)
}}}});
break
}}}catch(c){}},false)
};