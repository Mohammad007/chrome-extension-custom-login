function inject_first_time_script(){var a=document.createElement("script");
a.id="call-trigger-universal-install-event";
a.textContent='try {top.postMessage({ type: "FROM_CONTENT", initiator: "extension"}, "*")} catch(e) {};try {top.postMessage({type: "goto_signup"}, "*");} catch(e) {}; try {triggerUniversalInstallEvent();} catch(e) {};';
document.body.appendChild(a)
}try{inject_first_time_script();
var request={command:"disable_inject_first_time_script"};
wisestamp_utils.send_request(request,function(a){})
}catch(e){};