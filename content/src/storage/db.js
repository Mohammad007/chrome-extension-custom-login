var wisestamp_db_storage=function(){this.m_data={};
this.get_data=function(){return this.m_data
};
this.save_param=function(a,b){localStorage[a]=JSON.stringify(b);
this.m_data[a]=b
};
this.load_param=function(b,d){var a;
if(localStorage[b]!=="undefined"){try{a=typeof localStorage[b]==="string"?JSON.parse(localStorage[b]):localStorage[b]
}catch(c){console.error("wisestamp_db_storage::load_param::param_id = "+b,c);
a=undefined
}}if(typeof(d)==="function"){d(a)
}return a
};
this.delete_param=function(a){if(typeof localStorage[a]!=="undefined"){delete localStorage[a]
}};
this.save_version=function(a){this.save_param("version",a)
};
this.init=function(e){for(var b in localStorage){var c=this.load_param(b);
this.m_data[b]=c
}var d=["signatures","mappings","user","prefs","enabled"];
for(var a in d){var b=d[a];
var c=this.load_param(b);
if(c==="undefined"){this.save_param(b,{})
}}e()
}
};