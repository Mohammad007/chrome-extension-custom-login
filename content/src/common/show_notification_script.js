try{var el=document.createElement("div");
var bubble='<div id="psst_arrow_up" style="right: -68px; position: relative; width: 0px; height: 0px; border-left: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 5px solid #fa7d7f; margin: -5px auto 0px auto;"></div><div id="pink_bar" style="height: 4px; background: #fa7d7f;"></div><div id="psst" style="padding: 15px 36px 0px 36px; font-size: 13px;">Pssst.... A new WiseStamp version<br />is here! Refresh to activate<br /></div>';
el.innerHTML=bubble;
el.setAttribute("id","psst_cont");
var el_button=document.createElement("div");
el_button.innerHTML='<div id="psst_submit" style="font-size: 13px; width: 173px; height: 27px; background: -webkit-linear-gradient(#4e91fc, #4688eb); background: -o-linear-gradient(#4e91fc, #4688eb); background: -moz-linear-gradient(#4e91fc, #4688eb); background: linear-gradient(to top, #4688eb, #4e91fc); border: 1px solid #2f7aeb; border-bottom: 0px; border-radius: 2px 2px 0px 0px; color: white; line-height: 27px; margin: 10px auto 0px auto; cursor: pointer;">Refresh your inbox</div>';
el_button.addEventListener("click",function(){window.location.reload()
});
el.appendChild(el_button);
el.setAttribute("style","position: fixed; top: 50px; right: 100px; text-align: center; width: 285px; height: 105px; border: 1px solid #c9c9c9; color: black; background: white; white-space: normal; line-height: 16px; z-index: 9999999;");
document.body.appendChild(el);
wisestamp_utils.setTimeout(function(){try{var a={command:"disable_inject_show_notification_script"};
wisestamp_utils.send_request(a,function(c){})
}catch(b){}},1500)
}catch(e){};