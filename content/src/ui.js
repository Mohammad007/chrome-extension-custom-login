var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/ui.js");
wisestamp_utils.log("ui.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){var wisestamp_ui=new function(){var a=this;
this.get_iframe_document=function(b){var d;
try{if((wisestamp.sys.platform==="firefox")&&(b.contentDocument)){d=b.contentDocument
}else{if(b.contentWindow){d=b.contentWindow.document
}else{if(b.document){d=b.document
}}}}catch(c){}return d
};
this.find_element_recursively=function(b,f){try{var c=wisestamp_jquery(b,f)
}catch(d){return null
}if(c.length!==0){return c
}return null
};
this.add_event_recursively=function(d,c,b){wisestamp_jquery(d).on(c,b);
wisestamp_jquery.each(wisestamp_jquery("iframe:not([src]),iframe[src^='http://mail.google.com'],iframe[src^='https://mail.google.com'],iframe[src^='?'],iframe[src^='/']",d),function(){try{var f=a.get_iframe_document(this);
if(typeof f==="undefined"||f.location=="about:blank"){return
}if(d.location.host!=f.location.host){return
}wisestamp_ui.add_event_recursively(f,c,b)
}catch(g){wisestamp_utils.log("[ui.js::add_event_recursively] exception!");
return
}})
};
this.remove_event_recursively=function(c,b){wisestamp_jquery(c).unbind(b);
wisestamp_jquery.each(wisestamp_jquery("iframe:not([src]),iframe[src^='http://mail.google.com'],iframe[src^='https://mail.google.com'],iframe[src^='?']",c),function(){var d=a.get_iframe_document(this);
if(d.location=="about:blank"){return
}if(typeof(d)==="undefined"||c.location.host!=d.location.host){return
}wisestamp_ui.remove_event_recursively(d,b)
})
};
this.get_bubble=function(l,h){if(typeof l.wisestamp_jquery==="undefined"){l.wisestamp_jquery=window.wisestamp_jquery
}var k="5px 5px 10px -2px rgba(0,0,0,0.15)";
var c={border_width:1,border_color:"black",background_color:"white",arrow_size:15,border_radius:3};
for(var g in l.style){c[g]=l.style[g]
}if(typeof(c.arrow_off_set)==="undefined"){c.arrow_off_set=(Math.round((c.width/2)-c.arrow_size))
}l.content=l.wisestamp_jquery(l.content);
var i=l.wisestamp_jquery("<div></div>");
i.addClass("wisestamp-bubble");
i.css({"font-size":"12px","font-family":"arial",border:c.border_width+"px solid "+c.border_color,"background-color":c.background_color,"margin-top":c.arrow_size,"border-radius":c.border_radius+"px","-moz-border-radius":c.border_radius+"px","-webkit-border-radius":c.border_radius+"px","-moz-box-shadow":k,"box-shadow":k,width:c.width+"px",height:c.height+"px","z-index":"9999999"});
if(c.arrow_size>0){var n=l.wisestamp_jquery('<div class="arrow-top"></div>');
n.css({border:c.arrow_size+"px solid "+c.border_color,"border-color":"transparent transparent "+c.border_color+" transparent",position:"absolute",left:c.arrow_off_set+"px",height:0,width:0,"margin-top":"-"+(c.arrow_size*2)+"px"});
var m=l.wisestamp_jquery('<div class="arrow-bottom"></div>');
m.css({border:c.arrow_size+"px solid "+c.border_color,"border-color":"transparent transparent "+c.background_color+" transparent",position:"absolute",left:c.arrow_off_set+"px",height:0,width:0,"margin-top":"-"+(c.arrow_size*2-c.border_width*2+1)+"px"});
i.append(n).append(m)
}i.append(l.content);
if(typeof h!=="undefined"){var b=l.wisestamp_jquery("<div></div>");
b.css({padding:"5px 8px 3px 8px","border-top":"1px solid #ccc","text-align":"right"});
for(var f in h){var j=h[f].title;
var d=h[f].action;
var e=l.wisestamp_jquery('<a href="javascript:void(0)" style="color: black; margin: 0px 3px 0px 3px;">'+j+"</a>");
e.attr("id",f);
e.click(function(){var o=l.wisestamp_jquery(this).parents(".wisestamp-bubble:eq(0)");
var p=h[this.id].action;
if(typeof p!=="undefined"){p(o)
}else{o.remove();
if(l.popup){l.popup.hidePopup()
}}});
b.append(e)
}i.append(b)
}return i
};
this.hover_intent=function(h,n,m){var o={sensitivity:7,interval:100,timeout:0};
o=wisestamp_jquery.extend(o,m?{over:n,out:m}:n);
var k,j,c,b;
var e=function(f){k=f.pageX;
j=f.pageY
};
var d=function(g,f){f.hover_intent_t=clearTimeout(f.hover_intent_t);
if((Math.abs(c-k)+Math.abs(b-j))<o.sensitivity){wisestamp_jquery(f).unbind("mousemove",e);
f.hover_intent_s=1;
return o.over.apply(f,[g])
}else{c=k;
b=j;
f.hover_intent_t=wisestamp_utils.setTimeout(function(){d(g,f)
},o.interval)
}};
var l=function(g,f){f.hover_intent_t=clearTimeout(f.hover_intent_t);
f.hover_intent_s=0;
return o.out.apply(f,[g])
};
var i=function(r){var q=(r.type=="mouseover"?r.from_element:r.toElement)||r.relatedTarget;
while(q&&q!=h){try{q=q.parentNode
}catch(r){q=this
}}if(q==h){return false
}var g=wisestamp_jquery.extend({},r);
var f=h;
if(f.hover_intent_t){f.hover_intent_t=clearTimeout(f.hover_intent_t)
}if(r.type=="mouseover"){c=g.pageX;
b=g.pageY;
wisestamp_jquery(f).bind("mousemove",e);
if(f.hover_intent_s!=1){f.hover_intent_t=wisestamp_utils.setTimeout(function(){d(g,f)
},o.interval)
}}else{wisestamp_jquery(f).unbind("mousemove",e);
if(f.hover_intent_s==1){f.hover_intent_t=wisestamp_utils.setTimeout(function(){l(g,f)
},o.timeout)
}}};
return h.mouseover(i).mouseout(i)
};
this.is_dom_inserted=function(c,b){function e(g,h){var i="";
if(b.tagName){i=b.tagName
}var f=new RegExp("<"+i+"[^>]+"+g+"=[\"']([^\"']+)?"+h+"([^\"']+)?[\"']","g");
if(f.test(c.innerHTML)){return wisestamp_jquery(c.innerHTML).find(i+"."+b.className)[0]
}}if(b.id){if(c.id==b.id){return c
}return e("id",b.id)
}else{if(b.className){if(c.className){var d=new RegExp("\\b"+b.className+"\\b","g");
if(d.test(c.className)){if(b.tagName){if(c.tagName.toLowerCase()==b.tagName){return c
}}return c
}}return e("class",b.className)
}else{if(b.src){if(c.src==b.src){if(b.tagName){if(c.tagName.toLowerCase()==b.tagName){return c
}}}return e("src",b.src)
}else{if(b.tagName){if(c.tagName.toLowerCase()==b.tagName){return c
}var d=new RegExp("<"+b.tagName+"[^>]+>","g");
if(d.test(c.innerHTML)){return c
}}}}}return false
};
this.get_minor_bubble=function(e){if(typeof e.wisestamp_jquery==="undefined"){e.wisestamp_jquery=window.wisestamp_jquery
}var d={width:e.width,height:e.height};
for(var b in e.style){d[b]=e.style[b]
}var c=e.wisestamp_jquery(e.content);
c.addClass("wisestamp-bubble");
c.css({"font-family":"arial",width:d.width+"px",height:d.height+"px","z-index":"9999999"});
return c
}
}
};