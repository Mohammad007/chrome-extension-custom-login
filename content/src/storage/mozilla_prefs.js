var wisestamp_mozilla_prefs=new function(){var a="extensions.wisestamp_web";
var c=require("chrome");
var d=c.Cc,b=c.Ci;
this.m_prefs=d["@mozilla.org/preferences-service;1"].getService(b.nsIPrefService);
this.m_prefs_branch=this.m_prefs.getBranch(a+".");
this.get_pref=function(f){var g=null;
try{var g=JSON.parse(this.m_prefs_branch.getCharPref(f))
}catch(h){console.log('wisestamp_mozilla_prefs.get_pref >> Value "'+f+'" not found')
}return g
};
this.set_pref=function(e,f){this.m_prefs_branch.setCharPref(e,JSON.stringify(f))
};
this.init=function(){}
};
exports.wisestamp_mozilla_prefs=wisestamp_mozilla_prefs;