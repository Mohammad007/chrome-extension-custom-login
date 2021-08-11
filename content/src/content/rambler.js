var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/rambler.js");
wisestamp_utils.log("rambler.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){wisestamp_utils.log("[wisestamp_content_rambler] >>>>>");
var wisestamp_content_rambler=function(){this.m_content_type="Rambler";
switch(wisestamp.sys.platform){case"conduit":this.m_init_conduit=true;
break;
default:this.m_init_conduit=false;
break
}var b=this;
this.init=function(){wisestamp_utils.log("[wisestamp_content_rambler::init] wisestamp.sys.platform = "+wisestamp.sys.platform+" >>>>>");
a.init();
window.addEventListener("DOMNodeInserted",function(c){b.on_dom_node_inserted(c)
},false)
};
this.get_editor=function(c,f){wisestamp_utils.log("[wisestamp_content_rambler::get_editor] >>>>>");
var e=wisestamp_ui.find_element_recursively("iframe#spell-textarea_ifr",c);
if(e==null){return null
}var d=wisestamp_jquery(wisestamp_ui.get_iframe_document(e[0])).find("body");
f(d)
};
this.insert_wisestamp_icon=function(){var e=wisestamp_ui.find_element_recursively("div.bar",document);
if(e===null){wisestamp_utils.log("[wisestamp_content_rambler::insert_wisestamp_icon] toolbar = null <<<<<");
return
}wisestamp_utils.log("[wisestamp_content_rambler::insert_wisestamp_icon] adding icon...");
var d=e[0].ownerDocument;
var c=wisestamp_jquery('<div id="wisestamp-icon"></div>',d);
c.css({padding:"3px 0px 0px 5px"});
c.css({margin:"0px"});
c.append(b.get_wisestamp_compose_icon(d));
e.css({overflow:"visible"});
e.append(c);
b.update_wisestamp_compose_image()
};
this.get_user_id=function(){wisestamp_utils.log("[wisestamp_content_rambler::get_user_id] >>>>>");
var e=wisestamp_ui.find_element_recursively('select[name="from"]',document);
if(e!=null){return e.val()
}c=wisestamp_jquery("input[name=from]");
if(c.length!==0){c.prev().click(function(){wisestamp_utils.setTimeout(function(){b.setup_mapping()
},0)
});
var d=c.val().toLowerCase();
if(wisestamp_utils.validate_email(d)){wisestamp_utils.log('[wisestamp_content_rambler::get_user_id] input[name=from], user_id = "'+d+'" <<<<<');
return d
}}var c=wisestamp_jquery("#guser b");
if(c.length!==0){var d=c.html().toLowerCase();
if(wisestamp_utils.validate_email(d)){wisestamp_utils.log('[wisestamp_content_rambler::get_user_id] #guser b, user_id = "'+d+'" <<<<<');
return d
}}var d="";
wisestamp_utils.log('[wisestamp_content_rambler::get_user_id] user_id = "'+d+'" <<<<<');
return d
};
this.setup_mapping=function(){var c=wisestamp_ui.find_element_recursively('select[name="from"]',document);
if(c==null){return
}c.change(function(){b.insert_mapped_signature(undefined,true)
})
};
this.get_quote_element=function(c){return c.find("div.gmail_quote:first")
};
var a=null;
this.set_super=function(c){a=c;
a.construct(this)
}
};
wisestamp_content_rambler.prototype=wisestamp_obj_web;
var wisestamp_obj_rambler=new wisestamp_content_rambler();
wisestamp_obj_rambler.set_super(wisestamp_obj_web);
wisestamp_obj_rambler.init();
wisestamp_content=wisestamp_obj_rambler
};