var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/extras/inmail.js");
wisestamp_utils.log("inmail.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){var wisestamp_inmail_promo=new function(){var a=this;
this.size_factor=1;
this.wisestamp_uid=null;
this.caller=null;
this.timeouts={};
this.init=function(b){a.caller=b
};
this.add_li_ctrl=function(){var b=document.createElement("script");
b.src="https://code.jquery.com/jquery-2.1.0.min.js";
document.head.appendChild(b)
};
this.ws_remove_all=function(c){var f=wisestamp_jquery(c);
var e=f[0].ownerDocument.defaultView.frameElement;
var d=((e===null)?f:wisestamp_jquery(e)).parent();
d.find(".WS_x_i, .WS_li_overlay").remove();
var b=f.find('div[href="http://WS_promo"]');
if((b.length>=1)){b.remove()
}};
this.insert_promo=function(c){var d=wisestamp_jquery(c);
var b=d.find('div[href="http://WS_promo"]');
if(b.length>=1){wisestamp_utils.setTimeout(function(){a.position_xi(c)
},500)
}};
this.position_xi=function(i){var c=wisestamp_jquery(i);
var o=undefined;
if(!(typeof(c)==="undefined")){o=c.attr("data-wisestamp-editor-id")
}var h=c.find('div[href="http://WS_promo"]');
if(h.length>=1){var l=c[0].ownerDocument.defaultView.frameElement;
var f=((l===null)?c:wisestamp_jquery(l)).parent();
switch(a.caller.m_content_type){case"Yahoo":case"Live":case"AOL":var j=h.position();
var g=Math.round(j.left);
var e=Math.round(j.top)+8;
break;
case"Gmail":case"Inbox":case"GoDaddy":f.css({position:"relative"});
var j=h.position();
var g=Math.round(j.left);
var e=Math.round(j.top)+8;
break;
case"Outlook":var j=h.position();
var g=Math.round(j.left);
var e=Math.round(j.top)+8;
break;
default:var n=h.offset();
var d=f.offset();
var g=Math.round(n.left-d.left);
var e=Math.round(n.top-d.top);
break
}switch(a.caller.m_content_type){case"Gmail":switch(wisestamp.sys.platform){case"firefox":a.mXImageTopOffset=-2;
a.mXImageLeftOffset=0;
break;
case"chrome":case"safari":default:if(c.attr("wsmode")==="reply"){a.mXImageTopOffset=-2
}else{a.mXImageTopOffset=0
}a.mXImageLeftOffset=0;
break
}break;
case"Yahoo":switch(wisestamp.sys.platform){case"chrome":a.mXImageTopOffset=-2;
a.mXImageLeftOffset=0;
break;
case"safari":a.mXImageTopOffset=-1;
a.mXImageLeftOffset=0;
break;
case"firefox":default:a.mXImageTopOffset=0;
a.mXImageLeftOffset=0;
break
}break;
case"Live":a.mXImageTopOffset=1;
a.mXImageLeftOffset=0;
break;
case"AOL":switch(wisestamp.sys.platform){case"firefox":a.mXImageTopOffset=2;
a.mXImageLeftOffset=0;
break;
case"chrome":case"safari":default:a.mXImageTopOffset=0;
a.mXImageLeftOffset=0;
break
}break;
case"Inbox":a.mXImageTopOffset=-2;
a.mXImageLeftOffset=0;
break;
default:a.mXImageTopOffset=0;
a.mXImageLeftOffset=0;
break
}var b=Math.round(h.width());
var m=Math.round(h.height());
if(m<14){m=14
}if(f.find(".WS_x_i").length<1){var k='<div class="WS_li_overlay" style="display: none; border-radius: 3px; position: absolute; z-index: 14; height: '+(m)+'px; background: none; "><div class="WS_overlay_button" style="cursor: pointer; border-radius: 3px; font-size: '+(12*a.size_factor)+'px; float: left; padding: 5px 2px; margin: 0px; background-color: #b3ba2d; color: white; position: relative;"><div style="display: table; margin: -1px auto;">Remove this branding</div><img style="position: absolute; display: table; width: 9px; height: 9px; top: 8px; right: 5px;" src="'+wisestamp.get_url("content/img/x-close-hover.png",true)+'" /></div></div>';
f.prepend(k+'<img class="WS_x_i" style="position: absolute; cursor: pointer; z-index: 13; display: none; width: 9px; height: 9px;" src="'+wisestamp.get_url("content/img/x-close.png",true)+'" />');
f.find(".WS_overlay_button").on("click",function(){var t;
var p;
var q;
try{t=a.caller.get_signature_id(o);
p=a.caller.m_data.signatures[t].promo_id;
q=a.caller.m_data.signatures[t].promo_cid
}catch(s){console.error("wisestamp_inmail_promo::position_xi::click, exception!",s)
}switch(wisestamp.sys.platform){case"firefox":break;
case"chrome":case"safari":default:var r={command:"ws_track",action:"remove_promo_"+p};
wisestamp_utils.send_request(r,function(){});
break
}a.caller.open_link(a.caller.urls.upgrade_url,"upgrade_promotional","promotional_link","upgrade_promo",q)
})
}h.add(f.find(".WS_x_i")).off("mouseenter.wisestamp-promo").on("mouseenter.wisestamp-promo",function(){f.find(".WS_li_overlay").css("display","block")
});
f.find(".WS_li_overlay, .WS_overlay_button").off("mouseleave.wisestamp-promo").on("mouseleave.wisestamp-promo",function(){f.find(".WS_li_overlay").css("display","none")
});
f.find(".WS_x_i").off("dragstart.wisestamp-promo").on("dragstart.wisestamp-promo",function(p){p.preventDefault()
});
f.find(".WS_x_i").css({left:(g+b+6+a.mXImageLeftOffset)+"px",top:(e+9+a.mXImageTopOffset)+"px",display:"block"});
f.find(".WS_li_overlay").css({top:(e+1)+"px",left:(g)+"px",height:(m+4)+"px",width:(b+18)+"px"});
f.find(".WS_overlay_button").css({height:(m+1)+"px",width:(b+16)+"px"})
}};
this.observe_editor=function(d){var e=d;
var b=new MutationObserver(function(f){f.forEach(function(g){a.position_xi(d)
})
});
var c={childList:true,characterData:true,subtree:true};
b.observe(e,c)
}
}
};