var wisestamp_rss=function(){function a(d,j){var c=[];
var b=d.nodes.channel[0].nodes.item;
for(var f=0;
f<b.length;
f++){var g=b[f].nodes;
var h={};
for(var e in g){h[e]=g[e][0].text
}h.date=Date.parse(h.date);
c.push(h)
}j(c)
}this.get_items=function(c,d,b){if(typeof d!=="function"){d=function(){}
}if(typeof b!=="function"){b=d
}wisestamp_utils.log("[wisestamp_rss::get_items] get_items ("+c+") >>>>>");
wisestamp_utils.send_get_request(c,{},function(j){wisestamp_utils.log("[wisestamp_rss::get_items] got data!");
try{var f=j;
for(var h=0;
h<f.childNodes.length;
h++){if(f.childNodes[h].nodeType==1){f=f.childNodes[h];
break
}}var g=wisestamp_utils.xml_to_object(f);
a(g,d)
}catch(k){wisestamp_utils.log("[wisestamp_rss::get_items] failed to parse data, exception = "+k);
b([]);
return
}},"xml")
}
};
if(typeof exports!=="undefined"){exports.wisestamp_rss=wisestamp_rss
};