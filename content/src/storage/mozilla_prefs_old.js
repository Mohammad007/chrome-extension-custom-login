var wisestamp_mozilla_prefs_old = function(branch)
{
	const {Cc,Ci} = require("chrome");
	this.m_prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService);
	this.m_prefs_branch = this.m_prefs.getBranch(branch+'.');
	   
	this.getPrefType = function(pref_id)
	{
		var type = "";
		
		try
		{
			type = this.m_prefs_branch.getPrefType(pref_id);
			
		} catch (e)
		{
			return "";
		}
		
		return type;
	};
	
	this.getPrefTypeStr = function(pref_id)
	{
		var type = this.getPrefType(pref_id);
		
		switch (type)
		{
			case this.m_prefs_branch.PREF_STRING:
				return "string";
			
			case this.m_prefs_branch.PREF_INT:
				return "int";
			
			case this.m_prefs_branch.PREF_BOOL:
				return "boolean";
		}
		 
		return "";
	};
	
	this.getPrefValue = function(pref_id)
	{
		var type = this.getPrefType(pref_id);
		
		switch (type)
		{
			case this.m_prefs_branch.PREF_STRING:
				return this.m_prefs_branch.getCharPref(pref_id);
			
			case this.m_prefs_branch.PREF_INT:
				return this.m_prefs_branch.getIntPref(pref_id);
			
			case this.m_prefs_branch.PREF_BOOL:
				return this.m_prefs_branch.getBoolPref(pref_id);
		}
		 
		return "";
	};
	
	this.setPrefValue = function(pref_id,value,type)
	{
		if (type == null)
			type = this.getPrefType(pref_id);
		
		switch (type)
		{
			case "string":
			case this.m_prefs_branch.PREF_STRING:
				this.m_prefs_branch.setCharPref(pref_id,value);
				break;
			
			case "int":
			case this.m_prefs_branch.PREF_INT:
				this.m_prefs_branch.setIntPref(pref_id,value);
				break;
			
			case "boolean":
			case this.m_prefs_branch.PREF_BOOL:
				this.m_prefs_branch.setBoolPref(pref_id,value == "true" ? true : false);
				break;
		}
	};
	
	this.clearBranch = function(prefix)
	{		
		prefix = prefix+'.';
		
		var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch('');
    	var list = prefs.getChildList(prefix,{},{});
		
		//wisestamp_utils.log("prefs.js :: clearBranch :: clearing " + list.length + " elements under " + prefix);
		
		try
		{
			for (var i = 0; i < list.length; i++)
				prefs.clearUserPref(list[i]);
	    
        	prefs.clearUserPref(prefix);
        
        } catch(e){}
	};
	    
    this.isModified = function(id)
    {
    	return this.m_prefs_branch.prefHasUserValue(id);
    };


	///////////////////////////////////////////////////////////////////////////
	// PREFERENCES FUNCTIONS
	// Note: id2 is usefull for backword compatibility. If id is not present id2 will be fetched

	this.getBoolPref = function(id,default_val,id2)
	{
		var value = null;
		
		try {
			value = this.m_prefs_branch.getBoolPref(id);
		
		} catch (e) 
		{
			if (id2 != undefined)
				return this.getBoolPref(id2,default_val);
				
			if (default_val == undefined)
				value = false;
			else
				value = default_val;
		}
		
		return value;
	};
	
	this.getIntPref = function(id,default_val,id2)
	{
		var value = null;
		
		try {
			value = this.m_prefs_branch.getIntPref(id);
		
		} catch (e) 
		{
			if (id2 != undefined)
				return this.getIntPref(id2,default_val);
				
			if (default_val == undefined)
				value = false;
			else
				value = default_val;
		}
		
		return value;
	};
	
	this.getCharPref = function(id,default_val,id2)
	{
		var value = null;
		
		try {
			value = this.m_prefs_branch.getCharPref(id);
		
		} catch (e) 
		{
			if (id2 != undefined)
				return this.getCharPref(id2,default_val);
				
			if (default_val == undefined)
				value = "";
			else
				value = default_val;
		}
		
		return value;
	};
	
    this.getComplexPref = function(id,default_val,id2)
	{
		var value = null;
		
		try {
			value = this.m_prefs_branch.getComplexValue(id, Ci.nsISupportsString).data;
		
		} catch (e) 
		{
			//wisestamp_utils.log('[wisestamp_mozilla_prefs::wisestamp_mozilla_prefs] id = ' + id + ', e = ' + e);
		
			if (id2 != undefined)
				return this.getComplexPref(id2,default_val);
				
			if (default_val == undefined)
				value = "";
			else
				value = default_val;
		}
		
		return value;
	};
	
	this.setComplexPref = function(id,value)
	{
		var str = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
		str.data = value;
		this.m_prefs_branch.setComplexValue(id, Ci.nsISupportsString, str);
	};
	
	///////////////////////////////////////////////////////////////////////////
	
	this.exportPrefs = function(file_obj)
	{		
		// file is nsIFile, data is a string
		var fo_stream = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);
		
		// use 0x02 | 0x10 to open file for appending.
		fo_stream.init(file_obj, 0x02 | 0x08 | 0x20, 0666, 0);

		// if you are sure there will never ever be any non-ascii text in data you can 
		// also call fo_stream.writeData directly
		var converter = Cc["@mozilla.org/intl/converter-output-stream;1"].createInstance(Ci.nsIConverterOutputStream);
		converter.init(fo_stream, "UTF-8", 0, 0);

		var list = this.m_prefs_branch.getChildList("",{},{});
		for (var i = 0; i < list.length; i++)
		{
			try
			{
				var name = list[i];
				
				var value = this.getPrefValue(name);
				var type = this.getPrefTypeStr(name);
				
				converter.writeString(name + '\r\n');
				converter.writeString(type + '\r\n');
				converter.writeString(value + '\r\n');
				converter.writeString('---\r\n');
				
			} catch(e)
			{
				//wisestamp_utils.log("prefs.js :: export :: exception caught = " + e);
			}
        }
        
        converter.close(); // this closes fo_stream
	};

	this.importPrefs = function(file_obj)
	{
		var fis = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
		fis.init(file_obj, -1, -1, 0);
		
		var charset = "UTF-8";
		var is = Cc["@mozilla.org/intl/converter-input-stream;1"].createInstance(Ci.nsIConverterInputStream);
	
		// This assumes that fis is the nsIInputStream you want to read from
		is.init(fis, charset, 1024, 0xFFFD);
		var lis = is.QueryInterface(Ci.nsIUnicharLineInputStream);
	
		if (lis instanceof Ci.nsIUnicharLineInputStream) 
		{
	  		var name = {}, type = {}, line = {};
			
			do 
			{
				cont = lis.readLine(name);
				cont = lis.readLine(type);
				
				var value = "";
				while (1) 
				{
					cont = lis.readLine(line);
					if (cont == false || line.value == '---')
						break;
					
					value += line.value;
				}
					
				//wisestamp_utils.log("prefs.js :: import :: name = "+name.value+", type = "+type.value+", value = "+value);
					
				this.setPrefValue(name.value,value,type.value);
	  		} while (cont);
		} else
			alert("sorry!");
	};
	
	this.toText = function()
	{
		var str = '';		
		
		var list = this.m_prefs_branch.getChildList("",{},{});
		for (var i = 0; i < list.length; i++)
		{
			try
			{
				var name = list[i];
				
				var value = this.getPrefValue(name);
				var type = this.getPrefTypeStr(name);
				
				str += branch + '.' + name + '\r\n';
				str += type + '\r\n';
				str += value + '\r\n';
				str += '---\r\n';
				
			} catch(e)
			{
				//wisestamp_utils.log("prefs.js :: export :: exception caught = " + e);
			}
        }
        
		return str;
	};
	
	this.flush = function()
	{
		this.m_prefs.savePrefFile(null);
	}
};
exports.wisestamp_mozilla_prefs_old = wisestamp_mozilla_prefs_old;