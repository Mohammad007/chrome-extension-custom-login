var wisestamp_utils=new function(){var a=this;
this.file_logging=false;
this.m_log_file=null;
this.init=function(){};
this.send_get_request=function(c,b,e,d){if(typeof d==="undefined"){d="json"
}wisestamp_jquery.get(c,b,e,d)
};
this.send_post_request=function(c,b,e,d){if(typeof d==="undefined"){d="json"
}wisestamp_jquery.post(c,b,e,d).fail(function(g,i,h){var f=g.responseJSON?g.responseJSON:i;
e(f)
})
};
this.get_version=function(){switch(wisestamp.sys.platform){case"firefox":case"chrome":return chrome.runtime.getManifest().version;
case"safari":return safari.extension.displayVersion;
default:return wisestamp.version[wisestamp.sys.platform]
}};
this.setTimeout=function(c,b){return setTimeout(function(){c()
},b)
};
this.clearTimeout=function(b){clearTimeout(b)
};
this.log_error=function(c,b){this.log(c,b)
};
this.log=function(c,b){if(console&&console.log&&wisestamp.config.debug){console.log(c)
}return{message:c,ret_value:b}
};
this.open_tab=function(b){a.log("[wisestamp_utils::open_tab] url="+b+" >>>>>");
switch(wisestamp.sys.platform){case"firefox":case"chrome":chrome.tabs.create({url:b});
break;
case"safari":if(typeof safari.application!=="undefined"){safari.application.activeBrowserWindow.openTab("foreground").url=b
}else{var c={command:"open_window",url:b};
safari.self.tab.dispatchMessage("request",c)
}break
}};
this.open_window=function(c,e,b,h){a.log("[wisestamp_utils::open_window] url="+c+" >>>>>");
if(typeof e!=="undefined"){var g="utm_source="+e+"&utm_medium="+b+"&utm_campaign="+h;
if(c.indexOf("?")==-1){g="?"+g
}else{g="&"+g
}if(c.indexOf("#")==-1){c+=g
}else{c=c.replace("#",g+"#")
}}switch(wisestamp.sys.platform){case"firefox":case"chrome":chrome.tabs.create({url:c});
break;
case"safari":if(typeof safari.application!=="undefined"){safari.application.activeBrowserWindow.openTab("foreground").url=c
}else{var d={command:"open_window",url:c};
safari.self.tab.dispatchMessage("request",d)
}break;
case"web":var f=window.open(c,"WiseStamp");
f.focus();
break
}};
this.open_dialog=function(i,b,k,d){a.log("[wisestamp_utils::open_dialog] "+i+" >>>>>");
var h=null;
if(typeof OpenGadget!=="undefined"){var c=["resizable=yes","scrollbars=no","closebutton=yes","closeonexternalclick=no","savelocation=no","saveresizedsize=no","openposition=center"];
OpenGadget(i,d+"px",k+"px",c.join(","))
}else{var j=(window.screen.height-k)/2-50;
var g=(window.screen.width-d)/2;
var f="height="+k+",width="+d+",left="+g+",top="+j;
var e=window.open;
h=e(i,b,f+",toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,location=no");
if(wisestamp.sys.platform!=="safari"){h.focus()
}}return h
};
this.get_url=function(b,c){return wisestamp.get_url(b,c)
};
this.get_relative_url=function(b){return wisestamp.get_relative_url(b)
};
this.send_request=function(b,c){if(typeof(c)!=="function"){c=function(d){}
}switch(wisestamp.sys.platform){case"firefox":case"chrome":chrome.runtime.sendMessage(b,c);
break;
case"safari":b.message_id=Math.floor((Math.random()*900000000000000)+100000000000000);
if(typeof a.mCallbackMap==="undefined"){a.mCallbackMap={};
safari.self.addEventListener("message",function(d){if(typeof(a.mCallbackMap[d.name])==="function"){a.mCallbackMap[d.name](d.message);
delete a.mCallbackMap[d.name]
}},false)
}if(typeof(c)==="function"){a.mCallbackMap[b.message_id]=c
}safari.self.tab.dispatchMessage("request",b);
break
}};
this.validate_email=function(b){var c=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return c.test(b)
};
this.trim_recipient_name=function(b){if((typeof(b)==="string")&&(b.length>0)){if((b.indexOf("(")>=0)&&(b.indexOf(")")>=0)&&(b.indexOf("@")>=0)){b=b.substring(0,b.indexOf("("))
}if((b.indexOf("<")>=0)&&(b.indexOf(">")>=0)&&(b.indexOf("@")>=0)){b=b.substring(0,b.indexOf("<"))
}b=wisestamp_jquery.trim(b);
if(b.indexOf(" ")>=0){b=b.substring(0,b.indexOf(" "))
}b=wisestamp_jquery.trim(b)
}return b
};
this.trim_recipient_email=function(b){if((typeof(b)==="string")&&(b.length>0)){if((b.indexOf("<")>=0)&&(b.indexOf(">")>=0)&&(b.indexOf("@")>=0)){b=b.substring(b.indexOf("<")+1,b.indexOf(">"))
}b=b.toLowerCase();
b=wisestamp_jquery.trim(b)
}return b
};
this.trim_spaces_and_commas=function(c){if((typeof(c)==="string")&&(c.length>0)){var b=undefined;
while(!(b===c)){b=c;
c=wisestamp_jquery.trim(c);
c=c.replace(/(^,)|(,$)/g,"");
c=c.replace(/(^×)|(×$)/g,"")
}}return c
};
this.btoa=function(b){return btoa(b)
};
this.atob=function(b){return atob(b)
};
this.get_wisestamp_uid_from_token=function(c){var f={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(m){var v="";
var j,g,k,w,h,q,p;
var l=0;
m=f._utf8_encode(m);
while(l<m.length){j=m.charCodeAt(l++);
g=m.charCodeAt(l++);
k=m.charCodeAt(l++);
w=j>>2;
h=(j&3)<<4|g>>4;
q=(g&15)<<2|k>>6;
p=k&63;
if(isNaN(g)){q=p=64
}else{if(isNaN(k)){p=64
}}v=v+this._keyStr.charAt(w)+this._keyStr.charAt(h)+this._keyStr.charAt(q)+this._keyStr.charAt(p)
}return v
},decode:function(m){var v="";
var j,g,k;
var w,h,q,p;
var l=0;
m=m.replace(/[^A-Za-z0-9\+\/\=]/g,"");
while(l<m.length){w=this._keyStr.indexOf(m.charAt(l++));
h=this._keyStr.indexOf(m.charAt(l++));
q=this._keyStr.indexOf(m.charAt(l++));
p=this._keyStr.indexOf(m.charAt(l++));
j=w<<2|h>>4;
g=(h&15)<<4|q>>2;
k=(q&3)<<6|p;
v=v+String.fromCharCode(j);
if(q!=64){v=v+String.fromCharCode(g)
}if(p!=64){v=v+String.fromCharCode(k)
}}v=f._utf8_decode(v);
return v
},_utf8_encode:function(i){i=i.replace(/\r\n/g,"\n");
var g="";
for(var j=0;
j<i.length;
j++){var h=i.charCodeAt(j);
if(h<128){g+=String.fromCharCode(h)
}else{if(h>127&&h<2048){g+=String.fromCharCode(h>>6|192);
g+=String.fromCharCode(h&63|128)
}else{g+=String.fromCharCode(h>>12|224);
g+=String.fromCharCode(h>>6&63|128);
g+=String.fromCharCode(h&63|128)
}}}return g
},_utf8_decode:function(i){var g="";
var j=0;
var h=c1=c2=0;
while(j<i.length){h=i.charCodeAt(j);
if(h<128){g+=String.fromCharCode(h);
j++
}else{if(h>191&&h<224){c2=i.charCodeAt(j+1);
g+=String.fromCharCode((h&31)<<6|c2&63);
j+=2
}else{c2=i.charCodeAt(j+1);
c3=i.charCodeAt(j+2);
g+=String.fromCharCode((h&15)<<12|(c2&63)<<6|c3&63);
j+=3
}}}return g
}};
var b=undefined;
if(f&&!!c){try{b=JSON.parse(f.decode(c)).uid
}catch(d){b=undefined
}}return b
};
this.urlencode=function(b){b=(b+"").toString();
return encodeURIComponent(b).replace(/%/g,"%25").replace(/!/g,"%21").replace(/#/g,"%23").replace(/\$/g,"%24").replace(/&/g,"%26").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/\+/g,"%2B").replace(/\,/g,"%2C").replace(/\//g,"%2F").replace(/\:/g,"%3A").replace(/\;/g,"%3B").replace(/\=/g,"%3D").replace(/\?/g,"%3F").replace(/\@/g,"%40").replace(/\[/g,"%5B").replace(/\]/g,"%5D").replace(/%20/g,"+")
};
this.urldecode=function(b){return decodeURIComponent((b+"").replace(/\+/g,"%20"))
};
this.strip_tags=function(b,d){d=(((d||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join("");
var c=/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,e=/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
return b.replace(e,"").replace(c,function(g,f){return d.indexOf("<"+f.toLowerCase()+">")>-1?g:""
})
};
this.date=function(j,e){if(!isNaN(Number(e))){e=new Date(Number(e))
}var f={days:["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],format:{}};
var h=e.getDate();
var b=h;
if(h.length===1){b="0"+h
}var d=e.getMonth();
var g=d;
if(d.length===1){g="0"+d
}var k="pm";
if(e.getHours()<12){k="am"
}var i=e.getHours();
if(i!=12){i=i%12
}var c=String(e.getMinutes());
if(c.length===1){c="0"+c
}f.format.d=b;
f.format.j=h;
f.format.F=f.months[d];
f.format.m=g;
f.format.M=f.months[d].substr(0,3);
f.format.g=i;
f.format.i=c;
f.format.a=k;
f.format.Y=e.getFullYear();
return j.replace(/.{1}/g,function(l){if(a.prop_by_path(f,"format."+l)){return f.format[l]
}else{return l
}})
};
this.strtotime=function(h,c){var f,g,l,k="",d="";
k=h;
k=k.replace(/\s{2,}|^\s|\s$/g," ");
k=k.replace(/[\t\r\n]/g,"");
if(k=="now"){return(new Date()).getTime()/1000
}else{if(!isNaN(d=Date.parse(k))){return(d/1000)
}else{if(c){c=new Date(c*1000)
}else{c=new Date()
}}}k=k.toLowerCase();
var e={day:{sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6},mon:{jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11}};
var b=function(i){var p=(i[2]&&i[2]=="ago");
var o=(o=i[0]=="last"?-1:1)*(p?-1:1);
switch(i[0]){case"last":case"next":switch(i[1].substring(0,3)){case"yea":c.setFullYear(c.getFullYear()+o);
break;
case"mon":c.setMonth(c.getMonth()+o);
break;
case"wee":c.setDate(c.getDate()+(o*7));
break;
case"day":c.setDate(c.getDate()+o);
break;
case"hou":c.setHours(c.getHours()+o);
break;
case"min":c.setMinutes(c.getMinutes()+o);
break;
case"sec":c.setSeconds(c.getSeconds()+o);
break;
default:var n;
if(typeof(n=e.day[i[1].substring(0,3)])!=="undefined"){var q=n-c.getDay();
if(q==0){q=7*o
}else{if(q>0){if(i[0]=="last"){q-=7
}}else{if(i[0]=="next"){q+=7
}}}c.setDate(c.getDate()+q)
}}break;
default:if(/\d+/.test(i[0])){o*=parseInt(i[0],10);
switch(i[1].substring(0,3)){case"yea":c.setFullYear(c.getFullYear()+o);
break;
case"mon":c.setMonth(c.getMonth()+o);
break;
case"wee":c.setDate(c.getDate()+(o*7));
break;
case"day":c.setDate(c.getDate()+o);
break;
case"hou":c.setHours(c.getHours()+o);
break;
case"min":c.setMinutes(c.getMinutes()+o);
break;
case"sec":c.setSeconds(c.getSeconds()+o);
break
}}else{return false
}break
}return true
};
g=k.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
if(g!=null){if(!g[2]){g[2]="00:00:00"
}else{if(!g[3]){g[2]+=":00"
}}l=g[1].split(/-/g);
for(f in e.mon){if(e.mon[f]==l[1]-1){l[1]=f
}}l[0]=parseInt(l[0],10);
l[0]=(l[0]>=0&&l[0]<=69)?"20"+(l[0]<10?"0"+l[0]:l[0]+""):(l[0]>=70&&l[0]<=99)?"19"+l[0]:l[0]+"";
return parseInt(this.strtotime(l[2]+" "+l[1]+" "+l[0]+" "+g[2])+(g[4]?g[4]/1000:""),10)
}var j="([+-]?\\d+\\s(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)|(last|next)\\s(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))(\\sago)?";
g=k.match(new RegExp(j,"gi"));
if(g==null){return false
}for(f=0;
f<g.length;
f++){if(!b(g[f].split(" "))){return false
}}return(c.getTime()/1000)
};
this.object_keys=function(d){var c=[];
for(var b in d){c.push(b)
}return c
};
this.in_array=function(f,e,c){var d="",b=!!c;
if(b){for(d in e){if(e[d]===f){return true
}}}else{for(d in e){if(e[d]==f){return true
}}}return false
};
this.html_to_text=function(c){var b={"<":"&lt;",">":"&gt;"};
return c.replace(/[<>]/g,function(d){return b[d]
})
};
this.html_special_chars=function(c,j,h,b){var f=0,d=0,g=false;
if(typeof j==="undefined"||j===null){j=2
}c=c.toString();
if(b!==false){c=c.replace(/&/g,"&amp;")
}c=c.replace(/</g,"&lt;").replace(/>/g,"&gt;");
var e={ENT_NOQUOTES:0,ENT_HTML_QUOTE_SINGLE:1,ENT_HTML_QUOTE_DOUBLE:2,ENT_COMPAT:2,ENT_QUOTES:3,ENT_IGNORE:4};
if(j===0){g=true
}if(typeof j!=="number"){j=[].concat(j);
for(d=0;
d<j.length;
d++){if(e[j[d]]===0){g=true
}else{if(e[j[d]]){f=f|e[j[d]]
}}}j=f
}if(j&e.ENT_HTML_QUOTE_SINGLE){c=c.replace(/'/g,"&#039;")
}if(!g){c=c.replace(/"/g,"&quot;")
}return c
};
this.html_special_chars_decode=function(b,g){var e=0,c=0,f=false;
if(typeof g==="undefined"){g=2
}b=b.toString().replace(/&lt;/g,"<").replace(/&gt;/g,">");
var d={ENT_NOQUOTES:0,ENT_HTML_QUOTE_SINGLE:1,ENT_HTML_QUOTE_DOUBLE:2,ENT_COMPAT:2,ENT_QUOTES:3,ENT_IGNORE:4};
if(g===0){f=true
}if(typeof g!=="number"){g=[].concat(g);
for(c=0;
c<g.length;
c++){if(d[g[c]]===0){f=true
}else{if(d[g[c]]){e=e|d[g[c]]
}}}g=e
}if(g&d.ENT_HTML_QUOTE_SINGLE){b=b.replace(/&#0*39;/g,"'")
}if(!f){b=b.replace(/&quot;/g,'"')
}b=b.replace(/&amp;/g,"&");
return b
};
this.get_value_from_path=function(d,c,b){if(b==c.length){return d
}return a.get_value_from_path(d[c[b]]||{},c,b+1)
};
this.update_path=function(e,d,b,c){if(b==d.length){return c
}e[d[b]]=a.update_path(e[d[b]]||{},d,b+1,c);
return e
};
this.wildcard_to_regex=function(c){var b=c;
b=b.replace(/([.^$+(){}\[\]\\|])/g,"\\$1");
b=b.replace(/\*/g,".*");
return new RegExp(b)
};
this.is_empty=function(){for(var b=0;
b<arguments.length;
b++){if(typeof arguments[b]==="undefined"){return true
}if(arguments[b]===null){return true
}if(arguments[b]===false){return true
}if(typeof arguments[b].length==="number"&&arguments.length===0){return true
}if(arguments[b]===""){return true
}}};
this.is_object_empty=function(b){return a.object_keys(b).length===0
};
this.is_int=function(b){return !isNaN(parseInt(b))
};
this.props=function(l,k){if(l===null){alert("props called with null argument","error");
return
}if(typeof(l)==="undefined"){alert("props called with undefined argument","error");
return
}var o=["Methods","Fields","Unreachables"];
var f=[[],[],[]];
var d,g,h;
var n=0;
for(d=l;
d;
d=d.__proto__){for(h=0;
h<o.length;
++h){f[h][n]=[]
}++n
}for(var q in l){var c=-1;
try{for(d=l;
d&&(q in d);
d=d.__proto__){++c
}}catch(r){c=0
}var m=1;
try{if((typeof l[q])=="function"){m=0
}}catch(r){m=2
}f[m][c].push(q)
}function b(e,i){return i?e+b(e,i-1):""
}for(g=0;
g<n;
++g){for(h=0;
h<o.length;
++h){if(f[h][g].length){alert(o[h]+b(" of prototype",g)+": "+(k?"\n\n":"")+f[h][g].sort().join(k?"\n":", ")+(k?"\n\n":""))
}}}};
this.shorten=function(d,c){var b=d;
d=d.replace(/^([^\.]+\.\s)(.*)/,"$1");
if(d.length>c){d=d.substr(0,c)
}if(d.length<b.length){d+="..."
}return d
};
this.capitalize=function(b){if(typeof b!="string"){return b
}return b.substr(0,1).toUpperCase()+b.substr(1)
};
this.chr=function(b){if(b>65535){b-=65536;
return String.fromCharCode(55296+(b>>10),56320+(b&1023))
}return String.fromCharCode(b)
};
this.outerHTML=function(b){return b.outerHTML||(function(e){var d=document.createElement("div"),c;
d.appendChild(e.cloneNode(true));
c=d.innerHTML;
d=null;
return c
})(b)
};
this.move_caret=function(f,d,c){var e=f.getSelection(),b=e.getRangeAt(0);
b.selectNode(d);
b.collapse(c)
};
this.prop_by_path=this.pbp=function(e,d,b,f){var c=a.parse_path_string(d,f);
return a.get_object_property_by_path_array(e,c,b)
};
this.parse_path_string=function(d,f){if(!(f instanceof Object)){f={}
}if(typeof d==="string"){d=d.replace(/\[([^\]]+)\]/g,".$1");
if(d.substr(0,1)=="."){d=d.substr(1)
}var e=d.split(".");
for(var b=1;
b<e.length;
b++){var c=f[e[b]];
if(typeof c==="string"||a.is_int(c)){e[b]=c
}}return e
}else{return[]
}};
this.stringify_path_array=function(b){return b.join(".")
};
this.get_object_property_by_path_array=function(d,c,b){if(c.length===0){if(typeof d==="undefined"){return b
}else{return d
}}var f=c.shift();
for(var e in d){if(e==f||(typeof d=="object"&&f in d)){return arguments.callee(d[f],c,b)
}else{return b
}}};
this.is_higher_version=function(c,b){c=c.split(".");
b=b.split(".");
for(var d=0;
d<c.length;
d++){if(d>b.length){return false
}if(c[d]!=b[d]){return parseInt(c[d])>parseInt(b[d])
}}return false
};
this.add_mozilla_sharing=function(c){function b(j){try{if(j==null){return
}var l={};
var g=a.object_keys(j);
for(var f=0;
f<g.length;
f++){var d=g[f];
l[d]="rw";
var k=j[d];
if(typeof k=="object"){b(k)
}}j.__exposedProps__=l
}catch(h){}}b(c)
};
this.sha1=function(b){return sha1(b)
};
this.sha256=function(b){return SHA256(b)
};
this.md5=function(b){return md5(b)
};
this.xml_to_object=function(c){var b={};
b.nodeCount=c.childNodes.length;
if(!c.hasChildNodes()){return b
}for(var d=0;
d<c.childNodes.length;
d++){var e=c.childNodes[d];
switch(e.nodeType){case 1:if(typeof(b.nodes)==="undefined"){b.nodes={}
}if(typeof b.nodes[e.tagName]==="undefined"){b.nodes[e.tagName]=[]
}b.nodes[e.tagName].push(this.xml_to_object(e));
break;
case 2:if(typeof(b.attributes)==="undefined"){b.attributes={}
}b.attributes[e.tagName]=e.nodeValue;
break;
case 3:case 4:b.text=e.nodeValue;
break
}}return b
};
this.capitalize_first_letter=function(b){return b.charAt(0).toUpperCase()+b.slice(1)
};
this.is_logged_in=function(b){if(b){return true
}else{return false
}};
this.cio={es:function(b,d){var c=this.btoa(JSON.stringify({u:b,e:"es"}));
this.send_get_request(wisestamp.config.urls.website.editor+"api/wscio/s",wisestamp_jquery.param({p:c}),d)
}.bind(this)}
};
wisestamp_utils.init();
if(typeof exports!=="undefined"){exports.wisestamp_utils=wisestamp_utils
}function SHA256(p){var k=8;
var n=0;
function i(q,t){var s=(q&65535)+(t&65535);
var r=(q>>16)+(t>>16)+(s>>16);
return(r<<16)|(s&65535)
}function e(r,q){return(r>>>q)|(r<<(32-q))
}function f(r,q){return(r>>>q)
}function a(q,s,r){return((q&s)^((~q)&r))
}function d(q,s,r){return((q&s)^(q&r)^(s&r))
}function g(q){return(e(q,2)^e(q,13)^e(q,22))
}function b(q){return(e(q,6)^e(q,11)^e(q,25))
}function o(q){return(e(q,7)^e(q,18)^f(q,3))
}function j(q){return(e(q,17)^e(q,19)^f(q,10))
}function c(r,s){var E=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298);
var t=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225);
var q=new Array(64);
var G,F,D,C,A,y,x,w,v,u;
var B,z;
r[s>>5]|=128<<(24-s%32);
r[((s+64>>9)<<4)+15]=s;
for(var v=0;
v<r.length;
v+=16){G=t[0];
F=t[1];
D=t[2];
C=t[3];
A=t[4];
y=t[5];
x=t[6];
w=t[7];
for(var u=0;
u<64;
u++){if(u<16){q[u]=r[u+v]
}else{q[u]=i(i(i(j(q[u-2]),q[u-7]),o(q[u-15])),q[u-16])
}B=i(i(i(i(w,b(A)),a(A,y,x)),E[u]),q[u]);
z=i(g(G),d(G,F,D));
w=x;
x=y;
y=A;
A=i(C,B);
C=D;
D=F;
F=G;
G=i(B,z)
}t[0]=i(G,t[0]);
t[1]=i(F,t[1]);
t[2]=i(D,t[2]);
t[3]=i(C,t[3]);
t[4]=i(A,t[4]);
t[5]=i(y,t[5]);
t[6]=i(x,t[6]);
t[7]=i(w,t[7])
}return t
}function h(t){var s=Array();
var q=(1<<k)-1;
for(var r=0;
r<t.length*k;
r+=k){s[r>>5]|=(t.charCodeAt(r/k)&q)<<(24-r%32)
}return s
}function m(r){r=r.replace(/\r\n/g,"\n");
var q="";
for(var t=0;
t<r.length;
t++){var s=r.charCodeAt(t);
if(s<128){q+=String.fromCharCode(s)
}else{if((s>127)&&(s<2048)){q+=String.fromCharCode((s>>6)|192);
q+=String.fromCharCode((s&63)|128)
}else{q+=String.fromCharCode((s>>12)|224);
q+=String.fromCharCode(((s>>6)&63)|128);
q+=String.fromCharCode((s&63)|128)
}}}return q
}function l(s){var r=n?"0123456789ABCDEF":"0123456789abcdef";
var t="";
for(var q=0;
q<s.length*4;
q++){t+=r.charAt((s[q>>2]>>((3-q%4)*8+4))&15)+r.charAt((s[q>>2]>>((3-q%4)*8))&15)
}return t
}p=m(p);
return l(c(h(p),p.length*k))
}function sha1(r){this.utf8_encode=function(i){if(i===null||typeof i==="undefined"){return""
}var C=(i+"");
var D="";
var j;
var y;
var w=0;
j=y=0;
w=C.length;
for(var x=0;
x<w;
x++){var B=C.charCodeAt(x);
var A=null;
if(B<128){y++
}else{if(B>127&&B<2048){A=String.fromCharCode((B>>6)|192,(B&63)|128)
}else{if((B&63488)!==55296){A=String.fromCharCode((B>>12)|224,((B>>6)&63)|128,(B&63)|128)
}else{if((B&64512)!==55296){throw new RangeError("Unmatched trail surrogate at "+x)
}var z=C.charCodeAt(++x);
if((z&64512)!==56320){throw new RangeError("Unmatched lead surrogate at "+(x-1))
}B=((B&1023)<<10)+(z&1023)+65536;
A=String.fromCharCode((B>>18)|240,((B>>12)&63)|128,((B>>6)&63)|128,(B&63)|128)
}}}if(A!==null){if(y>j){D+=C.slice(j,y)
}D+=A;
j=y=x+1
}}if(y>j){D+=C.slice(j,w)
}return D
};
var c=function(w,j){var i=(w<<j)|(w>>>(32-j));
return i
};
var s=function(y){var x="";
var w;
var j;
for(w=7;
w>=0;
w--){j=(y>>>(w*4))&15;
x+=j.toString(16)
}return x
};
var f;
var u,t;
var b=new Array(80);
var l=1732584193;
var h=4023233417;
var g=2562383102;
var e=271733878;
var d=3285377520;
var q,p,o,n,m;
var v;
r=this.utf8_encode(r);
var a=r.length;
var k=[];
for(u=0;
u<a-3;
u+=4){t=r.charCodeAt(u)<<24|r.charCodeAt(u+1)<<16|r.charCodeAt(u+2)<<8|r.charCodeAt(u+3);
k.push(t)
}switch(a%4){case 0:u=2147483648;
break;
case 1:u=r.charCodeAt(a-1)<<24|8388608;
break;
case 2:u=r.charCodeAt(a-2)<<24|r.charCodeAt(a-1)<<16|32768;
break;
case 3:u=r.charCodeAt(a-3)<<24|r.charCodeAt(a-2)<<16|r.charCodeAt(a-1)<<8|128;
break
}k.push(u);
while((k.length%16)!=14){k.push(0)
}k.push(a>>>29);
k.push((a<<3)&4294967295);
for(f=0;
f<k.length;
f+=16){for(u=0;
u<16;
u++){b[u]=k[f+u]
}for(u=16;
u<=79;
u++){b[u]=c(b[u-3]^b[u-8]^b[u-14]^b[u-16],1)
}q=l;
p=h;
o=g;
n=e;
m=d;
for(u=0;
u<=19;
u++){v=(c(q,5)+((p&o)|(~p&n))+m+b[u]+1518500249)&4294967295;
m=n;
n=o;
o=c(p,30);
p=q;
q=v
}for(u=20;
u<=39;
u++){v=(c(q,5)+(p^o^n)+m+b[u]+1859775393)&4294967295;
m=n;
n=o;
o=c(p,30);
p=q;
q=v
}for(u=40;
u<=59;
u++){v=(c(q,5)+((p&o)|(p&n)|(o&n))+m+b[u]+2400959708)&4294967295;
m=n;
n=o;
o=c(p,30);
p=q;
q=v
}for(u=60;
u<=79;
u++){v=(c(q,5)+(p^o^n)+m+b[u]+3395469782)&4294967295;
m=n;
n=o;
o=c(p,30);
p=q;
q=v
}l=(l+q)&4294967295;
h=(h+p)&4294967295;
g=(g+o)&4294967295;
e=(e+n)&4294967295;
d=(d+m)&4294967295
}v=s(l)+s(h)+s(g)+s(e)+s(d);
return v.toLowerCase()
}function md5cycle(f,h){var g=f[0],e=f[1],j=f[2],i=f[3];
g=ff(g,e,j,i,h[0],7,-680876936);
i=ff(i,g,e,j,h[1],12,-389564586);
j=ff(j,i,g,e,h[2],17,606105819);
e=ff(e,j,i,g,h[3],22,-1044525330);
g=ff(g,e,j,i,h[4],7,-176418897);
i=ff(i,g,e,j,h[5],12,1200080426);
j=ff(j,i,g,e,h[6],17,-1473231341);
e=ff(e,j,i,g,h[7],22,-45705983);
g=ff(g,e,j,i,h[8],7,1770035416);
i=ff(i,g,e,j,h[9],12,-1958414417);
j=ff(j,i,g,e,h[10],17,-42063);
e=ff(e,j,i,g,h[11],22,-1990404162);
g=ff(g,e,j,i,h[12],7,1804603682);
i=ff(i,g,e,j,h[13],12,-40341101);
j=ff(j,i,g,e,h[14],17,-1502002290);
e=ff(e,j,i,g,h[15],22,1236535329);
g=gg(g,e,j,i,h[1],5,-165796510);
i=gg(i,g,e,j,h[6],9,-1069501632);
j=gg(j,i,g,e,h[11],14,643717713);
e=gg(e,j,i,g,h[0],20,-373897302);
g=gg(g,e,j,i,h[5],5,-701558691);
i=gg(i,g,e,j,h[10],9,38016083);
j=gg(j,i,g,e,h[15],14,-660478335);
e=gg(e,j,i,g,h[4],20,-405537848);
g=gg(g,e,j,i,h[9],5,568446438);
i=gg(i,g,e,j,h[14],9,-1019803690);
j=gg(j,i,g,e,h[3],14,-187363961);
e=gg(e,j,i,g,h[8],20,1163531501);
g=gg(g,e,j,i,h[13],5,-1444681467);
i=gg(i,g,e,j,h[2],9,-51403784);
j=gg(j,i,g,e,h[7],14,1735328473);
e=gg(e,j,i,g,h[12],20,-1926607734);
g=hh(g,e,j,i,h[5],4,-378558);
i=hh(i,g,e,j,h[8],11,-2022574463);
j=hh(j,i,g,e,h[11],16,1839030562);
e=hh(e,j,i,g,h[14],23,-35309556);
g=hh(g,e,j,i,h[1],4,-1530992060);
i=hh(i,g,e,j,h[4],11,1272893353);
j=hh(j,i,g,e,h[7],16,-155497632);
e=hh(e,j,i,g,h[10],23,-1094730640);
g=hh(g,e,j,i,h[13],4,681279174);
i=hh(i,g,e,j,h[0],11,-358537222);
j=hh(j,i,g,e,h[3],16,-722521979);
e=hh(e,j,i,g,h[6],23,76029189);
g=hh(g,e,j,i,h[9],4,-640364487);
i=hh(i,g,e,j,h[12],11,-421815835);
j=hh(j,i,g,e,h[15],16,530742520);
e=hh(e,j,i,g,h[2],23,-995338651);
g=ii(g,e,j,i,h[0],6,-198630844);
i=ii(i,g,e,j,h[7],10,1126891415);
j=ii(j,i,g,e,h[14],15,-1416354905);
e=ii(e,j,i,g,h[5],21,-57434055);
g=ii(g,e,j,i,h[12],6,1700485571);
i=ii(i,g,e,j,h[3],10,-1894986606);
j=ii(j,i,g,e,h[10],15,-1051523);
e=ii(e,j,i,g,h[1],21,-2054922799);
g=ii(g,e,j,i,h[8],6,1873313359);
i=ii(i,g,e,j,h[15],10,-30611744);
j=ii(j,i,g,e,h[6],15,-1560198380);
e=ii(e,j,i,g,h[13],21,1309151649);
g=ii(g,e,j,i,h[4],6,-145523070);
i=ii(i,g,e,j,h[11],10,-1120210379);
j=ii(j,i,g,e,h[2],15,718787259);
e=ii(e,j,i,g,h[9],21,-343485551);
f[0]=add32(g,f[0]);
f[1]=add32(e,f[1]);
f[2]=add32(j,f[2]);
f[3]=add32(i,f[3])
}function cmn(h,e,d,c,g,f){e=add32(add32(e,h),add32(c,f));
return add32((e<<g)|(e>>>(32-g)),d)
}function ff(g,f,k,j,e,i,h){return cmn((f&k)|((~f)&j),g,f,e,i,h)
}function gg(g,f,k,j,e,i,h){return cmn((f&j)|(k&(~j)),g,f,e,i,h)
}function hh(g,f,k,j,e,i,h){return cmn(f^k^j,g,f,e,i,h)
}function ii(g,f,k,j,e,i,h){return cmn(k^(f|(~j)),g,f,e,i,h)
}function md51(c){txt="";
var e=c.length,d=[1732584193,-271733879,-1732584194,271733878],b;
for(b=64;
b<=c.length;
b+=64){md5cycle(d,md5blk(c.substring(b-64,b)))
}c=c.substring(b-64);
var a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
for(b=0;
b<c.length;
b++){a[b>>2]|=c.charCodeAt(b)<<((b%4)<<3)
}a[b>>2]|=128<<((b%4)<<3);
if(b>55){md5cycle(d,a);
for(b=0;
b<16;
b++){a[b]=0
}}a[14]=e*8;
md5cycle(d,a);
return d
}function md5blk(b){var c=[],a;
for(a=0;
a<64;
a+=4){c[a>>2]=b.charCodeAt(a)+(b.charCodeAt(a+1)<<8)+(b.charCodeAt(a+2)<<16)+(b.charCodeAt(a+3)<<24)
}return c
}var hex_chr="0123456789abcdef".split("");
function rhex(c){var b="",a=0;
for(;
a<4;
a++){b+=hex_chr[(c>>(a*8+4))&15]+hex_chr[(c>>(a*8))&15]
}return b
}function hex(a){for(var b=0;
b<a.length;
b++){a[b]=rhex(a[b])
}return a.join("")
}function md5(a){return hex(md51(a))
}function add32(d,c){return(d+c)&4294967295
}if(md5("hello")!=="5d41402abc4b2a76b9719d911017c592"){function add32(a,d){var c=(a&65535)+(d&65535),b=(a>>16)+(d>>16)+(c>>16);
return(b<<16)|(c&65535)
}};