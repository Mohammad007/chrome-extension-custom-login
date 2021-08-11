var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/menus.js");
wisestamp_utils.log("menus.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){var wisestamp_menu=new function(){this.m_last_signature_id=null;
this.m_window=null;
this.m_data=null;
this.m_campaign="";
this.m_medium="";
var a=this;
this.create_menu_item=function(e,c){var b,g;
var d=a.is_selected_signature(e);
if(c){b=wisestamp_jquery("<menuitem />");
b.attr("type",e.type);
b.attr("label",e.label);
g="command";
if(d){b.attr("checked",true)
}else{if(typeof e.imageURI==="string"){b.attr("image",e.imageURI)
}}}else{b=wisestamp_jquery("<div></div>");
var f=wisestamp_jquery('<div class="wisestamp-signature-switch '+(d?"signature-active":"")+'"></div>');
f.html(e.label);
g="click";
if(d){f.css({"background-image":'url("'+wisestamp_utils.get_url("content/img/checkbox.png",true)+'")'})
}else{if(typeof e.imageURI==="string"){f.css({"background-image":'url("'+e.imageURI+'")'})
}}b.css({cursor:((typeof(e.command)==="function")?"pointer":"default"),color:(((typeof(e["text-color"])==="string")&&(!d))?e["text-color"]:"#333"),border:"none","background-color":((typeof(e["background-color"])==="string")?e["background-color"]:"white"),"text-decoration":((typeof(e["text-decoration"])==="string")?e["text-decoration"]:"none"),width:"100%",display:"block"});
f.css({display:"block",margin:"0px 1px 0px 0px",padding:"7px 6px 7px 50px","font-size":"15px","line-height":"normal","background-position":"30px center","background-repeat":"no-repeat","font-family":"'Lato', sans-serif"});
if(typeof(e["text-align"])==="string"){f.css({"text-align":e["text-align"]})
}if(typeof(e["background-color-hover"])==="string"){f.hover(function(){wisestamp_jquery(this).css("background-color",e["background-color-hover"])
},function(){wisestamp_jquery(this).css("background-color",((typeof(e["background-color"])==="string")?e["background-color"]:"white"))
})
}if(e.name==="switch-signature"||e.name==="add-another-signature"){f.hover(function(){if(!wisestamp_jquery(this).hasClass("signature-active")){wisestamp_jquery(this).css({"background-image":'url("'+wisestamp_utils.get_url("content/img/checkbox.png",true)+'")'});
wisestamp_jquery(".signature-active").css({"background-image":'url("'+wisestamp_utils.get_url("content/img/checkbox_empty.png",true)+'")'})
}},function(){if(!wisestamp_jquery(this).hasClass("signature-active")){wisestamp_jquery(this).css({"background-image":'url("'+wisestamp_utils.get_url("content/img/checkbox_empty.png",true)+'")'});
wisestamp_jquery(".signature-active").css({"background-image":'url("'+wisestamp_utils.get_url("content/img/checkbox.png",true)+'")'})
}})
}if(e.name==="add-another-signature"){f.append('<span style="position: relative; bottom: 1px; left: 5px; font-size: 10px; background: #FF6009; padding: 2px 5px; border-radius: 2px; color: #fff;">PRO</span>')
}b.append(f)
}if(typeof e.disabled==="boolean"){b.attr("disabled",e.disabled)
}if(typeof e.command==="function"){b.bind(g,e.command)
}if(typeof e.class_name==="string"){b.attr("class",e.class_name)
}if(typeof e.id==="string"){b.attr("id",e.id)
}return b[0]
};
this.create_menu_separator=function(d){var f;
if(d){f=wisestamp_jquery("<menuseparator />")
}else{var e=wisestamp_jquery("<div></div>");
var c=wisestamp_jquery("<div></div>");
var b=wisestamp_jquery("<div></div>");
e.css({width:"100%",height:"3px","background-color":"white",margin:"0px",padding:"0px"});
c.css({width:"100%",height:"2px","background-color":"#d7d7d7",margin:"0px",padding:"0px"});
b.css({width:"100%",height:"3px","background-color":"#f0f0f0",margin:"0px",padding:"0px"});
f=wisestamp_jquery("<div></div>");
f.append(e[0]);
f.append(c[0]);
f.append(b[0]);
return f.html()
}return f[0]
};
this.create_menu_bottom_div=function(){var b;
b=wisestamp_jquery("<div></div>");
b.css({width:"100%",height:"5px","background-color":"#f0f0f0",margin:"0px",padding:"0px"});
return b[0]
};
this.create_menu_bottom_triangle=function(){var b;
b=wisestamp_jquery("<div></div>");
b.css({width:"18px",height:"9px","background-image":'url("'+wisestamp_utils.get_url("content/img/menu_bottom_triangle.png",true)+'")',"background-position":"center center","background-repeat":"no-repeat",position:"absolute",bottom:"-8px"});
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){b.css({left:"42px"})
}else{b.css({right:"42px"})
}return b[0]
};
this.create_menu_left_triangle=function(){var b;
b=wisestamp_jquery("<div></div>");
b.css({width:"9px",height:"18px","background-image":'url("'+wisestamp_utils.get_url("content/img/menu_left_triangle.png",true)+'")',"background-position":"center center","background-repeat":"no-repeat",position:"absolute",top:"30px",left:"-8px"});
return b[0]
};
this.create_menu_top_triangle=function(){var b;
b=wisestamp_jquery("<div></div>");
b.css({width:"18px",height:"9px","background-image":'url("'+wisestamp_utils.get_url("content/img/menu_top_triangle.png",true)+'")',"background-position":"center center","background-repeat":"no-repeat",position:"absolute",top:"-8px"});
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){b.css({left:"42px"})
}else{b.css({right:"42px"})
}return b[0]
};
this.create_menu_bottom_disabled_triangle=function(){var b;
b=wisestamp_jquery("<div></div>");
b.css({width:"18px",height:"9px","background-image":'url("'+wisestamp_utils.get_url("content/img/menu_bottom_triangle.png",true)+'")',"background-position":"center center","background-repeat":"no-repeat",position:"absolute",bottom:"-9px"});
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){b.css({left:"42px"})
}else{b.css({right:"42px"})
}return b[0]
};
this.create_menu_left_disabled_triangle=function(){var b;
b=wisestamp_jquery("<div></div>");
b.css({width:"9px",height:"18px","background-image":'url("'+wisestamp_utils.get_url("content/img/menu_left_triangle.png",true)+'")',"background-position":"center center","background-repeat":"no-repeat",position:"absolute",top:"30px",left:"-9px"});
return b[0]
};
this.create_menu_top_disabled_triangle=function(){var b;
b=wisestamp_jquery("<div></div>");
b.css({width:"18px",height:"9px","background-image":'url("'+wisestamp_utils.get_url("content/img/menu_top_triangle.png",true)+'")',"background-position":"center center","background-repeat":"no-repeat",position:"absolute",top:"-9px"});
if((wisestamp_jquery("html").attr("dir")==="rtl")||(wisestamp_jquery("body").attr("dir")==="rtl")){b.css({left:"42px"})
}else{b.css({right:"42px"})
}return b[0]
};
this.is_selected_signature=function(b){if((!(typeof(b.type)==="undefined"))&&(!(typeof(b.id)==="undefined"))&&(!(this.m_last_signature_id===null))&&(b.type.toString()==="radio")&&(b.id.toString()!=="")&&(b.id.toString()===this.m_last_signature_id.toString())){return true
}return false
};
this.set_last_signature_id=function(b){this.m_last_signature_id=b
};
this.set_window=function(b){this.m_window=b
};
this.set_data=function(b){this.m_data=b
}
}
};