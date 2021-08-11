function GetURLParameter(a){var d=window.location.search.substring(1);
var c=d.split("&");
for(var b=0;
b<c.length;
b++){var e=c[b].split("=");
if((e.length>=2)&&(e[0]===a)){return decodeURIComponent(e[1])
}}return null
}document.getElementById("iframe").src=GetURLParameter("url");