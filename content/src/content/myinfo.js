var this_script_is_active=wisestamp.is_active.is_script_active(window.document.location.href,"content/src/content/myinfo.js");
wisestamp_utils.log("myinfo.js start - ["+window.document.location.href+"], this_script_is_active = "+this_script_is_active+" >>>>>");
if(this_script_is_active){wisestamp_jquery(document).ready(function(){wisestamp_jquery("#browser").html(wisestamp_utils.capitalize_first_letter(wisestamp.sys.platform));
wisestamp_utils.send_request({command:"load_param",param:["version","wisestamp_uid"]},function(a){wisestamp_jquery("#version").html(a.version);
wisestamp_jquery("#wisestamp_uid").html(a.wisestamp_uid)
})
})
};