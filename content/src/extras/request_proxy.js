var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/extras/request_proxy.js");
wisestamp_utils.log("request_proxy.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){function inject_script(b){var a=document.createElement("script");
a.type="text/javascript";
a.innerHTML=b;
document.documentElement.appendChild(a)
}function set_proxy(){inject_script("("+(function(){var g=window.XMLHttpRequest.prototype.open;
var c=window.XMLHttpRequest.prototype.send;
window.XMLHttpRequest.prototype.open=function(l,k,i){if(typeof k==="string"){var j=h(k);
if(l==="POST"){if(((window.document.location.href.match(/^([^\/\?]*\/){2}([^\.\/\?]+\.)*(mail\.google\.com)\//gi)!==null)&&(j.act==="sm"))||((window.document.location.href.match(/^([^\/\?]*\/){2}([^\.\/\?]+\.)*(mail\.yahoo\.com)\//gi)!==null)&&(k.indexOf("/ws/v3/batch?")>=0)&&(j.appid==="YahooMailNeo")&&("" in j))||((window.document.location.href.match(/^([^\/\?]*\/){2}([^\.\/\?]+\.)*(mail\.live\.com)\//gi)!==null)&&(j.cnmn==="Microsoft.Msn.Hotmail.Ui.Fpp.MailBox.SendMessage_ec"))||((window.document.location.href.match(/^([^\/\?]*\/){2}([^\.\/\?]+\.)*(mail\.aol\.com|webmail\.aol\.com)\//gi)!==null)&&(j.transport==="xmlhttp")&&(j.a==="SendMessage"))){this.alter_pixel=true
}}}return g.apply(this,arguments)
};
window.XMLHttpRequest.prototype.send=function(){if((!(typeof this.alter_pixel==="undefined"))&&(this.alter_pixel)){if((arguments[0].indexOf("color:WISESTAMP_SIG_")>-1)||(arguments[0].indexOf("color:WISESTAMP_SIG_")>-1)||(arguments[0].indexOf("color:WISESTAMP_SIG_")>-1)){window.postMessage({type:"EMAIL_SENT"},"*")
}else{if(arguments[0].indexOf("div")>-1){window.postMessage({type:"EMAIL_SENT_NO_SIG"},"*")
}}arguments[0]=arguments[0].replace(/\%2Fga\%2Fpixel\.png\%3Fdont_count\%3D/g,"%2Fga%2Fpixel.png%3Fyes__count%3D");
arguments[0]=arguments[0].replace(/\/ga\/pixel\.png\?dont_count\=/g,"/ga/pixel.png?yes__count=");
arguments[0]=arguments[0].replace(/\%2Fads\%2Fpixel\.png\%3Fdont_count\%3D/g,"%2Fads%2Fpixel.png%3Fyes__count%3D");
arguments[0]=arguments[0].replace(/\/ads\/pixel\.png\?dont_count\=/g,"/ads/pixel.png?yes__count=");
if(!!arguments[0].match(/data-circulate/g)&&(arguments[0].indexOf("YahooMailNeo")==-1)&&((window.document.location.href.match(/^([^\/\?]*\/){2}([^\.\/\?]+\.)*(mail\.aol\.com|webmail\.aol\.com)\//gi)===null))){var n=(arguments[0].match(/&to=(.*)&to=/g))[0];
n=n.substring(0,n.length-4).substring(4,n.length-1);
var l=n.split("&to=");
if(l.length===1){var o=arguments[0].match(/data-circulate%3D%22(.*)%22%20data-site-id/)[0];
var p=decodeURIComponent(o.substring(20,o.length-1).substring(0,o.length-38)).replace(/&amp;/g,"&");
var k=decodeURIComponent(arguments[0].match(/data-site-id%3D%22%5B(.*)%5D%22%20/g)[0]).replace('data-site-id="[',"").replace(']"',"").trim();
var j=decodeURIComponent(l[0]).match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)[0];
var m=b(j);
p=p.replace("SITE_ID",k).replace("THE_EMAIL_HASH",m);
arguments[0]=arguments[0].replace(/data%3Aimage%2Fgif%3Bbase64%2CR0lGODlhAQABAIAAAP%2F%2F%2FwAAACwAAAAAAQABAAACAkQBADs%3D/g,encodeURIComponent(p))
}}var i={type:"CIO_ES"};
window.postMessage(i,"*")
}return c.apply(this,[].slice.call(arguments))
};
function b(i){var k=i.split("@");
var j="";
j=j+"H1:"+d(i.toLowerCase());
j=j+",H2:"+d(i.toUpperCase());
j=j+",H3:"+d(k[1].toLowerCase());
j=j+",H4:"+f(i.toLowerCase());
j=j+",H5:"+f(i.toUpperCase());
j=j+",H6:"+e(i.toLowerCase());
j=j+",H7:"+e(i.toUpperCase());
return j
}function h(o){var q={};
try{var k=o;
if(k.indexOf("?")>=0){k=k.split("?")[1]
}var n=k.split("&");
for(var m in n){var l=n[m].split("=");
if(typeof q[l[0]]==="undefined"){q[l[0]]=l[1]
}else{if(typeof q[l[0]]==="string"){var j=q[l[0]];
q[l[0]]=[];
q[l[0]].push(j);
q[l[0]].push(l[1])
}else{if(typeof q[l[0]]==="object"){q[l[0]].push(l[1])
}}}}}catch(p){}return q
}function a(n){var m="";
for(var l in n){if(typeof n[l]==="string"){m+=l+"="+n[l]+"&"
}else{if(typeof n[l]==="object"){for(var k in n[l]){if(k!==""){m+=l+"="+n[l][k]+"&"
}}}}}return m
}function e(y){var t=8;
var w=0;
function q(s,B){var A=(s&65535)+(B&65535);
var z=(s>>16)+(B>>16)+(A>>16);
return(z<<16)|(A&65535)
}function m(z,s){return(z>>>s)|(z<<(32-s))
}function n(z,s){return(z>>>s)
}function i(s,B,A){return((s&B)^((~s)&A))
}function l(s,B,A){return((s&B)^(s&A)^(B&A))
}function o(s){return(m(s,2)^m(s,13)^m(s,22))
}function j(s){return(m(s,6)^m(s,11)^m(s,25))
}function x(s){return(m(s,7)^m(s,18)^n(s,3))
}function r(s){return(m(s,17)^m(s,19)^n(s,10))
}function k(z,A){var N=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298);
var B=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225);
var s=new Array(64);
var P,O,M,L,I,G,F,E,D,C;
var J,H;
z[A>>5]|=128<<(24-A%32);
z[((A+64>>9)<<4)+15]=A;
for(var D=0;
D<z.length;
D+=16){P=B[0];
O=B[1];
M=B[2];
L=B[3];
I=B[4];
G=B[5];
F=B[6];
E=B[7];
for(var C=0;
C<64;
C++){if(C<16){s[C]=z[C+D]
}else{s[C]=q(q(q(r(s[C-2]),s[C-7]),x(s[C-15])),s[C-16])
}J=q(q(q(q(E,j(I)),i(I,G,F)),N[C]),s[C]);
H=q(o(P),l(P,O,M));
E=F;
F=G;
G=I;
I=q(L,J);
L=M;
M=O;
O=P;
P=q(J,H)
}B[0]=q(P,B[0]);
B[1]=q(O,B[1]);
B[2]=q(M,B[2]);
B[3]=q(L,B[3]);
B[4]=q(I,B[4]);
B[5]=q(G,B[5]);
B[6]=q(F,B[6]);
B[7]=q(E,B[7])
}return B
}function p(B){var A=Array();
var s=(1<<t)-1;
for(var z=0;
z<B.length*t;
z+=t){A[z>>5]|=(B.charCodeAt(z/t)&s)<<(24-z%32)
}return A
}function v(z){z=z.replace(/\r\n/g,"\n");
var s="";
for(var B=0;
B<z.length;
B++){var A=z.charCodeAt(B);
if(A<128){s+=String.fromCharCode(A)
}else{if((A>127)&&(A<2048)){s+=String.fromCharCode((A>>6)|192);
s+=String.fromCharCode((A&63)|128)
}else{s+=String.fromCharCode((A>>12)|224);
s+=String.fromCharCode(((A>>6)&63)|128);
s+=String.fromCharCode((A&63)|128)
}}}return s
}function u(A){var z=w?"0123456789ABCDEF":"0123456789abcdef";
var B="";
for(var s=0;
s<A.length*4;
s++){B+=z.charAt((A[s>>2]>>((3-s%4)*8+4))&15)+z.charAt((A[s>>2]>>((3-s%4)*8))&15)
}return B
}y=v(y);
return u(k(p(y),y.length*t))
}function d(z){this.utf8_encode=function(i){if(i===null||typeof i==="undefined"){return""
}var K=(i+"");
var L="";
var j;
var C;
var A=0;
j=C=0;
A=K.length;
for(var B=0;
B<A;
B++){var J=K.charCodeAt(B);
var E=null;
if(J<128){C++
}else{if(J>127&&J<2048){E=String.fromCharCode((J>>6)|192,(J&63)|128)
}else{if((J&63488)!==55296){E=String.fromCharCode((J>>12)|224,((J>>6)&63)|128,(J&63)|128)
}else{if((J&64512)!==55296){throw new RangeError("Unmatched trail surrogate at "+B)
}var D=K.charCodeAt(++B);
if((D&64512)!==56320){throw new RangeError("Unmatched lead surrogate at "+(B-1))
}J=((J&1023)<<10)+(D&1023)+65536;
E=String.fromCharCode((J>>18)|240,((J>>12)&63)|128,((J>>6)&63)|128,(J&63)|128)
}}}if(E!==null){if(C>j){L+=K.slice(j,C)
}L+=E;
j=C=B+1
}}if(C>j){L+=K.slice(j,A)
}return L
};
var m=function(A,j){var i=(A<<j)|(A>>>(32-j));
return i
};
var F=function(C){var B="";
var A;
var j;
for(A=7;
A>=0;
A--){j=(C>>>(A*4))&15;
B+=j.toString(16)
}return B
};
var p;
var H,G;
var l=new Array(80);
var t=1732584193;
var r=4023233417;
var q=2562383102;
var o=271733878;
var n=3285377520;
var y,x,w,v,u;
var I;
z=this.utf8_encode(z);
var k=z.length;
var s=[];
for(H=0;
H<k-3;
H+=4){G=z.charCodeAt(H)<<24|z.charCodeAt(H+1)<<16|z.charCodeAt(H+2)<<8|z.charCodeAt(H+3);
s.push(G)
}switch(k%4){case 0:H=2147483648;
break;
case 1:H=z.charCodeAt(k-1)<<24|8388608;
break;
case 2:H=z.charCodeAt(k-2)<<24|z.charCodeAt(k-1)<<16|32768;
break;
case 3:H=z.charCodeAt(k-3)<<24|z.charCodeAt(k-2)<<16|z.charCodeAt(k-1)<<8|128;
break
}s.push(H);
while((s.length%16)!=14){s.push(0)
}s.push(k>>>29);
s.push((k<<3)&4294967295);
for(p=0;
p<s.length;
p+=16){for(H=0;
H<16;
H++){l[H]=s[p+H]
}for(H=16;
H<=79;
H++){l[H]=m(l[H-3]^l[H-8]^l[H-14]^l[H-16],1)
}y=t;
x=r;
w=q;
v=o;
u=n;
for(H=0;
H<=19;
H++){I=(m(y,5)+((x&w)|(~x&v))+u+l[H]+1518500249)&4294967295;
u=v;
v=w;
w=m(x,30);
x=y;
y=I
}for(H=20;
H<=39;
H++){I=(m(y,5)+(x^w^v)+u+l[H]+1859775393)&4294967295;
u=v;
v=w;
w=m(x,30);
x=y;
y=I
}for(H=40;
H<=59;
H++){I=(m(y,5)+((x&w)|(x&v)|(w&v))+u+l[H]+2400959708)&4294967295;
u=v;
v=w;
w=m(x,30);
x=y;
y=I
}for(H=60;
H<=79;
H++){I=(m(y,5)+(x^w^v)+u+l[H]+3395469782)&4294967295;
u=v;
v=w;
w=m(x,30);
x=y;
y=I
}t=(t+y)&4294967295;
r=(r+x)&4294967295;
q=(q+w)&4294967295;
o=(o+v)&4294967295;
n=(n+u)&4294967295
}I=F(t)+F(r)+F(q)+F(o)+F(n);
return I.toLowerCase()
}function f(w){function P(x,k){return(x<<k)|(x>>>(32-k))
}function O(H,x){var ad,k,G,I,F;
G=(H&2147483648);
I=(x&2147483648);
ad=(H&1073741824);
k=(x&1073741824);
F=(H&1073741823)+(x&1073741823);
if(ad&k){return(F^2147483648^G^I)
}if(ad|k){if(F&1073741824){return(F^3221225472^G^I)
}else{return(F^1073741824^G^I)
}}else{return(F^G^I)
}}function v(k,G,F){return(k&G)|((~k)&F)
}function u(k,G,F){return(k&F)|(G&(~F))
}function t(k,G,F){return(k^G^F)
}function r(k,G,F){return(G^(k|(~F)))
}function z(G,F,ae,ad,k,H,I){G=O(G,O(O(v(F,ae,ad),k),I));
return O(P(G,H),F)
}function j(G,F,ae,ad,k,H,I){G=O(G,O(O(u(F,ae,ad),k),I));
return O(P(G,H),F)
}function L(G,F,ae,ad,k,H,I){G=O(G,O(O(t(F,ae,ad),k),I));
return O(P(G,H),F)
}function y(G,F,ae,ad,k,H,I){G=O(G,O(O(r(F,ae,ad),k),I));
return O(P(G,H),F)
}function i(H){var ae;
var G=H.length;
var F=G+8;
var x=(F-(F%64))/64;
var ad=(x+1)*16;
var af=Array(ad-1);
var k=0;
var I=0;
while(I<G){ae=(I-(I%4))/4;
k=(I%4)*8;
af[ae]=(af[ae]|(H.charCodeAt(I)<<k));
I++
}ae=(I-(I%4))/4;
k=(I%4)*8;
af[ae]=af[ae]|(128<<k);
af[ad-2]=G<<3;
af[ad-1]=G>>>29;
return af
}function J(F){var x="",G="",H,k;
for(k=0;
k<=3;
k++){H=(F>>>(k*8))&255;
G="0"+H.toString(16);
x=x+G.substr(G.length-2,2)
}return x
}function N(x){x=x.replace(/\r\n/g,"\n");
var k="";
for(var G=0;
G<x.length;
G++){var F=x.charCodeAt(G);
if(F<128){k+=String.fromCharCode(F)
}else{if((F>127)&&(F<2048)){k+=String.fromCharCode((F>>6)|192);
k+=String.fromCharCode((F&63)|128)
}else{k+=String.fromCharCode((F>>12)|224);
k+=String.fromCharCode(((F>>6)&63)|128);
k+=String.fromCharCode((F&63)|128)
}}}return k
}var K=Array();
var T,m,M,A,l,ac,ab,aa,Z;
var W=7,U=12,R=17,Q=22;
var E=5,D=9,C=14,B=20;
var s=4,q=11,p=16,o=23;
var Y=6,X=10,V=15,S=21;
w=N(w);
K=i(w);
ac=1732584193;
ab=4023233417;
aa=2562383102;
Z=271733878;
for(T=0;
T<K.length;
T+=16){m=ac;
M=ab;
A=aa;
l=Z;
ac=z(ac,ab,aa,Z,K[T+0],W,3614090360);
Z=z(Z,ac,ab,aa,K[T+1],U,3905402710);
aa=z(aa,Z,ac,ab,K[T+2],R,606105819);
ab=z(ab,aa,Z,ac,K[T+3],Q,3250441966);
ac=z(ac,ab,aa,Z,K[T+4],W,4118548399);
Z=z(Z,ac,ab,aa,K[T+5],U,1200080426);
aa=z(aa,Z,ac,ab,K[T+6],R,2821735955);
ab=z(ab,aa,Z,ac,K[T+7],Q,4249261313);
ac=z(ac,ab,aa,Z,K[T+8],W,1770035416);
Z=z(Z,ac,ab,aa,K[T+9],U,2336552879);
aa=z(aa,Z,ac,ab,K[T+10],R,4294925233);
ab=z(ab,aa,Z,ac,K[T+11],Q,2304563134);
ac=z(ac,ab,aa,Z,K[T+12],W,1804603682);
Z=z(Z,ac,ab,aa,K[T+13],U,4254626195);
aa=z(aa,Z,ac,ab,K[T+14],R,2792965006);
ab=z(ab,aa,Z,ac,K[T+15],Q,1236535329);
ac=j(ac,ab,aa,Z,K[T+1],E,4129170786);
Z=j(Z,ac,ab,aa,K[T+6],D,3225465664);
aa=j(aa,Z,ac,ab,K[T+11],C,643717713);
ab=j(ab,aa,Z,ac,K[T+0],B,3921069994);
ac=j(ac,ab,aa,Z,K[T+5],E,3593408605);
Z=j(Z,ac,ab,aa,K[T+10],D,38016083);
aa=j(aa,Z,ac,ab,K[T+15],C,3634488961);
ab=j(ab,aa,Z,ac,K[T+4],B,3889429448);
ac=j(ac,ab,aa,Z,K[T+9],E,568446438);
Z=j(Z,ac,ab,aa,K[T+14],D,3275163606);
aa=j(aa,Z,ac,ab,K[T+3],C,4107603335);
ab=j(ab,aa,Z,ac,K[T+8],B,1163531501);
ac=j(ac,ab,aa,Z,K[T+13],E,2850285829);
Z=j(Z,ac,ab,aa,K[T+2],D,4243563512);
aa=j(aa,Z,ac,ab,K[T+7],C,1735328473);
ab=j(ab,aa,Z,ac,K[T+12],B,2368359562);
ac=L(ac,ab,aa,Z,K[T+5],s,4294588738);
Z=L(Z,ac,ab,aa,K[T+8],q,2272392833);
aa=L(aa,Z,ac,ab,K[T+11],p,1839030562);
ab=L(ab,aa,Z,ac,K[T+14],o,4259657740);
ac=L(ac,ab,aa,Z,K[T+1],s,2763975236);
Z=L(Z,ac,ab,aa,K[T+4],q,1272893353);
aa=L(aa,Z,ac,ab,K[T+7],p,4139469664);
ab=L(ab,aa,Z,ac,K[T+10],o,3200236656);
ac=L(ac,ab,aa,Z,K[T+13],s,681279174);
Z=L(Z,ac,ab,aa,K[T+0],q,3936430074);
aa=L(aa,Z,ac,ab,K[T+3],p,3572445317);
ab=L(ab,aa,Z,ac,K[T+6],o,76029189);
ac=L(ac,ab,aa,Z,K[T+9],s,3654602809);
Z=L(Z,ac,ab,aa,K[T+12],q,3873151461);
aa=L(aa,Z,ac,ab,K[T+15],p,530742520);
ab=L(ab,aa,Z,ac,K[T+2],o,3299628645);
ac=y(ac,ab,aa,Z,K[T+0],Y,4096336452);
Z=y(Z,ac,ab,aa,K[T+7],X,1126891415);
aa=y(aa,Z,ac,ab,K[T+14],V,2878612391);
ab=y(ab,aa,Z,ac,K[T+5],S,4237533241);
ac=y(ac,ab,aa,Z,K[T+12],Y,1700485571);
Z=y(Z,ac,ab,aa,K[T+3],X,2399980690);
aa=y(aa,Z,ac,ab,K[T+10],V,4293915773);
ab=y(ab,aa,Z,ac,K[T+1],S,2240044497);
ac=y(ac,ab,aa,Z,K[T+8],Y,1873313359);
Z=y(Z,ac,ab,aa,K[T+15],X,4264355552);
aa=y(aa,Z,ac,ab,K[T+6],V,2734768916);
ab=y(ab,aa,Z,ac,K[T+13],S,1309151649);
ac=y(ac,ab,aa,Z,K[T+4],Y,4149444226);
Z=y(Z,ac,ab,aa,K[T+11],X,3174756917);
aa=y(aa,Z,ac,ab,K[T+2],V,718787259);
ab=y(ab,aa,Z,ac,K[T+9],S,3951481745);
ac=O(ac,m);
ab=O(ab,M);
aa=O(aa,A);
Z=O(Z,l)
}var n=J(ac)+J(ab)+J(aa)+J(Z);
return n.toLowerCase()
}}).toString()+")()")
}set_proxy()
};