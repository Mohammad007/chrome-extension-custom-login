var wisestamp_mozilla_storage=function(){var b=require("./mozilla_prefs.js").wisestamp_mozilla_prefs;
var a=require("./mozilla_old.js").wisestamp_mozilla_storage_old;
b.init();
var c=require("sdk/simple-storage");
this.get_data=function(){return c.storage
};
this.save_param=function(d,e){c.storage[d]=e;
b.set_pref("ss",c.storage)
};
this.load_param=function(d,e){if(typeof(e)==="function"){e(c.storage[d])
}return c.storage[d]
};
this.delete_param=function(d){if(typeof c.storage[d]!=="undefined"){delete c.storage[d]
}};
this.save_version=function(d){this.save_param("version",d)
};
this.init=function(g){var e=b.get_pref("ss");
for(var d in e){c.storage[d]=e[d]
}var f=["signatures","mappings","user","prefs","enabled"];
for(var d in f){if(typeof c.storage[f[d]]==="undefined"){c.storage[f[d]]={}
}}if(typeof(g)==="function"){g()
}};
this.get_legacy_signatures=function(d){a.load_param("signaturesIds",function(f){var g={};
if(f){var f=f.split(",");
for(var e in f){g[e]=a.loadSignature(f[e])
}}d(g)
})
}
};
exports.wisestamp_mozilla_storage=wisestamp_mozilla_storage;