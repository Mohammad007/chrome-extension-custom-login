var wisestamp_notifications=new function(){this.init=function(){};
this.notified=function(h,e,g){var f="notified_"+h;
if(typeof e==="undefined"){var d=wisestamp_controller.load_param(f,function(i){if(i==null){i=0
}wisestamp_utils.log("[wisestamp_notifications::notified] param="+f+", get value="+i);
g(i)
});
return
}wisestamp_utils.log("[wisestamp_notifications::notified] param="+f+", set value="+e);
wisestamp_controller.save_param(f,e)
};
function a(e){var d=e.toString().split(".");
var h=[10000000,100000,1000,10];
var g=0;
for(var f=0;
(f<d.length)&&(f<h.length);
f++){g+=(parseInt(d[f])||0)*h[f]
}return g
}function c(){var f=0;
try{var h=wisestamp_controller.load_param("created");
switch(wisestamp.sys.platform){case"firefox":case"chrome":break;
case"safari":default:if(h.indexOf(" ")>=0){h=h.substring(0,h.indexOf(" "))
}break
}var d=new Date(h);
f=((new Date()).getTime()-d.getTime())/(24*60*60*1000);
if(isNaN(f)){f=0
}}catch(g){f=0
}return f
}function b(d,f){for(var e=0;
e<d.length;
e++){if(d[e]==f){return true
}}return false
}this.get_notifications=function(e){wisestamp_utils.log("[wisestamp_notifications::get_notifications] >>>>>");
var d=new wisestamp_rss();
d.get_items((wisestamp_controller.load_param("tester_config")?wisestamp.tester_config.urls.apis.after_install_notifications:wisestamp.config.urls.apis.after_install_notifications),function(l){wisestamp_utils.log("[wisestamp_notifications::get_notifications] after_install_notifications::items.length = "+l.length+".");
var k=wisestamp_utils.get_version();
var j=a(k);
var m=wisestamp_controller.load_param("user").plan;
var h=wisestamp.sys.platform;
var f=c();
var g=wisestamp_controller.load_param("wisestamp_uid");
var q=[];
for(var o=0;
o<l.length;
o++){var p=l[o];
var n=true;
if(typeof p["ws:notifMinDays"]!=="undefined"&&f<parseInt(p["ws:notifMinDays"])){n=false
}if(typeof p["ws:notifMaxDays"]!=="undefined"&&f>parseInt(p["ws:notifMaxDays"])){n=false
}if(typeof p["ws:notifMinVer"]!=="undefined"&&j<a(p["ws:notifMinVer"])){n=false
}if(typeof p["ws:notifMaxVer"]!=="undefined"&&j>a(p["ws:notifMaxVer"])){n=false
}if(typeof p["ws:notifIncludeVers"]!=="undefined"&&!b(p["ws:notifIncludeVers"].split(","),k)){n=false
}if(typeof p["ws:notifExcludeVers"]!=="undefined"&&b(p["ws:notifExcludeVers"].split(","),k)){n=false
}if(typeof p["ws:notifPlans"]!=="undefined"&&!b(p["ws:notifPlans"].split(","),m)){n=false
}if(typeof p["ws:notifPlatforms"]!=="undefined"&&!b(p["ws:notifPlatforms"].split(","),h)){n=false
}if(n){p.link=decodeURIComponent(p.link);
p.type=p["ws:notifType"];
p.height=parseInt(p["ws:notifHeight"]);
p.width=parseInt(p["ws:notifWidth"]);
p.date=Date.parse(p.pubDate);
p.description=p.description.replace(/<!-- wisestamp_uid -->/g,g);
p.description=p.description.replace(/<!-- version -->/g,k);
p.description=p.description.replace(/<!-- platform -->/g,h);
q.push(p)
}}wisestamp_utils.log("[wisestamp_notifications::get_notifications] after_install_notifications::filtered_items.length = "+q.length+".");
var i=wisestamp_controller.load_param("notified_after_install_notifications");
if(i==null){i=0
}if((q.length>0)&&(!(q[0].description.length===0))&&(!(i>=q[0].date))){e(q,"after_install_notifications")
}else{d.get_items((wisestamp_controller.load_param("tester_config")?wisestamp.tester_config.urls.apis.regular_notifications:wisestamp.config.urls.apis.regular_notifications),function(y){wisestamp_utils.log("[wisestamp_notifications::get_notifications] regular_notifications::items.length = "+y.length+".");
var x=wisestamp_utils.get_version();
var w=a(x);
var z=wisestamp_controller.load_param("user").plan;
var t=wisestamp.sys.platform;
var r=c();
var s=wisestamp_controller.load_param("wisestamp_uid");
var F=[];
for(var C=0;
C<y.length;
C++){var D=y[C];
var A=true;
if(typeof D["ws:notifMinDays"]!=="undefined"&&r<parseInt(D["ws:notifMinDays"])){A=false
}if(typeof D["ws:notifMaxDays"]!=="undefined"&&r>parseInt(D["ws:notifMaxDays"])){A=false
}if(typeof D["ws:notifMinVer"]!=="undefined"&&w<a(D["ws:notifMinVer"])){A=false
}if(typeof D["ws:notifMaxVer"]!=="undefined"&&w>a(D["ws:notifMaxVer"])){A=false
}if(typeof D["ws:notifIncludeVers"]!=="undefined"&&!b(D["ws:notifIncludeVers"].split(","),x)){A=false
}if(typeof D["ws:notifExcludeVers"]!=="undefined"&&b(D["ws:notifExcludeVers"].split(","),x)){A=false
}if(typeof D["ws:notifPlans"]!=="undefined"&&!b(D["ws:notifPlans"].split(","),z)){A=false
}if(typeof D["ws:notifPlatforms"]!=="undefined"&&!b(D["ws:notifPlatforms"].split(","),t)){A=false
}if(A){D.link=decodeURIComponent(D.link);
D.type=D["ws:notifType"];
D.height=parseInt(D["ws:notifHeight"]);
D.width=parseInt(D["ws:notifWidth"]);
D.date=Date.parse(D.pubDate);
D.description=D.description.replace(/<!-- wisestamp_uid -->/g,s);
D.description=D.description.replace(/<!-- version -->/g,x);
D.description=D.description.replace(/<!-- platform -->/g,t);
F.push(D)
}}wisestamp_utils.log("[wisestamp_notifications::get_notifications] regular_notifications::filtered_items.length = "+F.length+".");
var v=wisestamp_controller.load_param("notified_regular_notifications");
if(v==null){v=0
}if((F.length>0)&&(!(F[0].description.length===0))&&(!(v>=F[0].date))){e(F,"regular_notifications")
}else{var u=wisestamp_controller.load_param("flags");
var B=wisestamp_controller.load_param("notified_irh_notifications");
if(B==null){B=0
}var E=wisestamp_controller.load_param("prefs");
if((typeof(u)==="object")&&(!(u===null))&&(u.irh_notifications_enabled===true)&&(wisestamp.sys.platform==="chrome")&&(z==="1")&&(r>=2)&&(!(B>=10000))&&(!((typeof(E)==="object")&&(!(E===null))&&(E.irh_enabled===true)))){var F=[];
var D={};
D.link="";
D.type="major";
D.height=498;
D.width=410;
D.date=10000;
D.title="IRH notification";
D.description='<div id="wisestamp-irh-notification" style="font-family: \'Open Sans\', sans-serif; margin: auto;"><img style="margin: 15px auto 0px; display: table;" src="'+wisestamp_utils.get_url("content/img/irh_notifications/gift.png",true)+'" /><div style="color: #323b43; font-size: 21px; font-weight: bold; margin: 15px 10px 0px;">Here’s to a great 2015</div><div style="color: #323b43; font-size: 14px; margin: 10px 10px 0px;">We are honored that you are using WiseStamp and wish you happy holidays and a happy 2015.</div><div style="color: #323b43; font-size: 14px; font-weight: bold; margin: 25px 10px 0px;">Let’s make the year great for the less fortunate.</div><div style="color: #323b43; font-size: 14px; margin: 5px 10px 0px;">We care about making a difference, and we know you do too. So, we’ll donate money on your behalf when you join the iRobinHood Charity Network.</div><div style="color: #323b43; font-size: 16px; font-weight: bold; margin: 25px auto 0px; display: table;">Support Action Against Hunger.</div><div style="color: #323b43; font-size: 14px; margin: 5px auto 0px; display: table;"><span style="font-weight: bold;">No cost to you;</span> No data shared.</div><div id="wisestamp-irh-notification-click-button" style="width: 221px; height: 46px; background-color: #77bd2b; margin: 25px auto 0px; cursor: pointer; display: table;"><div style="margin: 15px auto 0px; color: white; font-size: 14px; font-weight: bold; display: table;">JOIN THE GIFT OF GIVING</div></div><div style="color: #777; font-size: 12px; margin: 20px auto 10px; display: table;">I accept<img style="margin: 0px 5px;" src="'+wisestamp_utils.get_url("content/img/irh_notifications/irobinlogo.png",true)+'" /><a style="color: #777;" href="http://bit.ly/irobin-terms" target="_blank">Terms</a> (<a style="color: #777;" href="http://bit.ly/1wS5oGT" target="_blank">learn more</a>)</div></div>';
F.push(D);
wisestamp_utils.log("[wisestamp_notifications::get_notifications] irh_notifications::filtered_items.length = "+F.length+".");
e(F,"irh_notifications")
}else{d.get_items((wisestamp_controller.load_param("tester_config")?wisestamp.tester_config.urls.apis.news_notifications:wisestamp.config.urls.apis.news_notifications),function(L){wisestamp_utils.log("[wisestamp_notifications::get_notifications] news_notifications::items.length = "+L.length+".");
var K=wisestamp_utils.get_version();
var J=a(K);
var N=wisestamp_controller.load_param("user").plan;
var I=wisestamp.sys.platform;
var G=c();
var H=wisestamp_controller.load_param("wisestamp_uid");
var R=[];
for(var P=0;
P<L.length;
P++){var Q=L[P];
var O=true;
if(typeof Q["ws:notifMinDays"]!=="undefined"&&G<parseInt(Q["ws:notifMinDays"])){O=false
}if(typeof Q["ws:notifMaxDays"]!=="undefined"&&G>parseInt(Q["ws:notifMaxDays"])){O=false
}if(typeof Q["ws:notifMinVer"]!=="undefined"&&J<a(Q["ws:notifMinVer"])){O=false
}if(typeof Q["ws:notifMaxVer"]!=="undefined"&&J>a(Q["ws:notifMaxVer"])){O=false
}if(typeof Q["ws:notifIncludeVers"]!=="undefined"&&!b(Q["ws:notifIncludeVers"].split(","),K)){O=false
}if(typeof Q["ws:notifExcludeVers"]!=="undefined"&&b(Q["ws:notifExcludeVers"].split(","),K)){O=false
}if(typeof Q["ws:notifPlans"]!=="undefined"&&!b(Q["ws:notifPlans"].split(","),N)){O=false
}if(typeof Q["ws:notifPlatforms"]!=="undefined"&&!b(Q["ws:notifPlatforms"].split(","),I)){O=false
}if(O){Q.link=decodeURIComponent(Q.link);
Q.type=Q["ws:notifType"];
Q.height=parseInt(Q["ws:notifHeight"]);
Q.width=parseInt(Q["ws:notifWidth"]);
Q.date=Date.parse(Q.pubDate);
Q.description=Q.description.replace(/<!-- wisestamp_uid -->/g,H);
Q.description=Q.description.replace(/<!-- version -->/g,K);
Q.description=Q.description.replace(/<!-- platform -->/g,I);
R.push(Q)
}}wisestamp_utils.log("[wisestamp_notifications::get_notifications] news_notifications::filtered_items.length = "+R.length+".");
var M=wisestamp_controller.load_param("notified_news_notifications");
if(M==null){M=0
}if((R.length>0)&&(!(R[0].description.length===0))&&(!(M>=R[0].date))){e(R,"news_notifications")
}else{e([],"no_notifications")
}})
}}})
}})
};
this.get_upgrade_promo_notifications=function(e){wisestamp_utils.log("[wisestamp_notifications::get_upgrade_promo_notifications] >>>>>");
var d=new wisestamp_rss();
d.get_items((wisestamp_controller.load_param("tester_config")?wisestamp.tester_config.urls.apis.upgrade_promo_notifications:wisestamp.config.urls.apis.upgrade_promo_notifications),function(l){wisestamp_utils.log("[wisestamp_notifications::get_upgrade_promo_notifications] upgrade_promo_notifications::items.length = "+l.length+".");
var k=wisestamp_utils.get_version();
var j=a(k);
var m=wisestamp_controller.load_param("user").plan;
var h=wisestamp.sys.platform;
var f=c();
var g=wisestamp_controller.load_param("wisestamp_uid");
var q=[];
for(var o=0;
o<l.length;
o++){var p=l[o];
var n=true;
if(typeof p["ws:notifMinDays"]!=="undefined"&&f<parseInt(p["ws:notifMinDays"])){n=false
}if(typeof p["ws:notifMaxDays"]!=="undefined"&&f>parseInt(p["ws:notifMaxDays"])){n=false
}if(typeof p["ws:notifMinVer"]!=="undefined"&&j<a(p["ws:notifMinVer"])){n=false
}if(typeof p["ws:notifMaxVer"]!=="undefined"&&j>a(p["ws:notifMaxVer"])){n=false
}if(typeof p["ws:notifIncludeVers"]!=="undefined"&&!b(p["ws:notifIncludeVers"].split(","),k)){n=false
}if(typeof p["ws:notifExcludeVers"]!=="undefined"&&b(p["ws:notifExcludeVers"].split(","),k)){n=false
}if(typeof p["ws:notifPlans"]!=="undefined"&&!b(p["ws:notifPlans"].split(","),m)){n=false
}if(typeof p["ws:notifPlatforms"]!=="undefined"&&!b(p["ws:notifPlatforms"].split(","),h)){n=false
}if(n){p.link=decodeURIComponent(p.link);
p.type=p["ws:notifType"];
p.height=parseInt(p["ws:notifHeight"]);
p.width=parseInt(p["ws:notifWidth"]);
p.date=Date.parse(p.pubDate);
p.description=p.description.replace(/<!-- wisestamp_uid -->/g,g);
p.description=p.description.replace(/<!-- version -->/g,k);
p.description=p.description.replace(/<!-- platform -->/g,h);
q.push(p)
}}wisestamp_utils.log("[wisestamp_notifications::get_upgrade_promo_notifications] upgrade_promo_notifications::filtered_items.length = "+q.length+".");
var i=wisestamp_controller.load_param("notified_upgrade_promo_notifications");
if(i==null){i=0
}if((q.length>0)&&(!(q[0].description.length===0))&&(!(i>=q[0].date))){e(q,"upgrade_promo_notifications")
}else{e([],"no_notifications")
}})
}
};
wisestamp_notifications.init();
if(typeof exports!=="undefined"){exports.wisestamp_notifications=wisestamp_notifications
};