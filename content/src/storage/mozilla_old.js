var wisestamp_mozilla_storage_old = function()
{
	var wisestamp_mozilla_prefs_old = require("./mozilla_prefs_old.js").wisestamp_mozilla_prefs_old;
	var database = null;
	var m_wisestamp_branch = 'extensions.wisestamp2';
	var m_wisestamp_branch_ver_1 = 'extensions.wisestamp';
	var m_prefs = new wisestamp_mozilla_prefs_old(m_wisestamp_branch);
	
	this.init = function(callback)
	{
		//wisestamp_utils.log('[wisestamp_mozilla_storage::init] >>>');
		callback();
	};
	
	this.save_param = function(param_id,value,type)
	{
		//wisestamp_utils.log('[wisestamp_mozilla_storage::save_param] param = ' + param_id + ', value = ' + value + ', type = ' + type);
		try {
			if (typeof type == 'undefined')
			{
				if (typeof value == "object")
					value = JSON.stringify(value);
				
				m_prefs.m_prefs_branch.setCharPref(param_id,value);
			
			} else if (type == 'complex')
			{
				m_prefs.setComplexPref(param_id,value);
			}
				
				
		} catch (e)
		{
			//wisestamp_utils.log('[wisestamp_mozilla_storage.js::save_param param='+param_id+', value='+value+', error = ' + e);
		}
	};
	
	this.load_param = function(param_id,callback,type)
	{
		////wisestamp_utils.log('[wisestamp_mozilla_storage::load_param] param = ' + param_id);
		var value = null;
		try {
			if (type == 'complex')
				value = m_prefs.getComplexPref(param_id);
			else
				value = m_prefs.m_prefs_branch.getCharPref(param_id);
			
		} catch (e)
		{
			//wisestamp_utils.log('[wisestamp_mozilla_storage.js::load_param param='+param_id+', value='+value+', error = ' + e);
		}
		
		if (value == "true" || value == "false") // convert to boolean
			value = (value == "true");
		
		if (type == 'json')
		{
			value = (value == null) ? {} : JSON.parse(value);
		}
		
		if (typeof callback != 'undefined')
			callback(value);
			
		return value;
	};
	
	this.reset = function()
	{
		m_prefs.clearBranch(m_wisestamp_branch);
		m_prefs.clearBranch(m_wisestamp_branch_ver_1);
	};
	
	this.get_version = function(callback)
	{
		var version = this.load_param('version');
		if (typeof callback != 'undefined')
			callback(version);
			
		return version;
	};
	
	this.save_version = function(version)
	{
		this.save_param('version',version);
	};
	
	this.saveSignature = function(id,signature)
	{
		var this_obj = this;
		var sig_prefix = 'signatures.'+id+'.';
	
		
		function save_services(type,services)
		{
			var prefix = sig_prefix+type;
			
			var services_count = 0;
			for (var i in services)
			{
				var service = services[i];
				this_obj.save_param(prefix+'.'+i+'.id',service.id);
				this_obj.save_param(prefix+'.'+i+'.val',service.value);
				
				services_count++;
			}
		
			this_obj.save_param(prefix+'.count',services_count);
		}
		
		function save_apps(apps)
		{
			var prefix = sig_prefix+'widgets.';
			
			var count = 0;
			for (var i in apps)
			{
				var app = apps[i];
				for (var param in app)
				{
					if (param == 'params')
						continue;
				
					this_obj.save_param(prefix+i+'.'+param,app[param]);
				}
					
				this_obj.save_param(prefix+i+'.value',JSON.stringify(app['params']));
				
				count++;
			}
			
			this_obj.save_param(prefix+'count',count);
		}
		
		for (var param in signature)
		{
			switch (param)
			{
			case 'socialServices':
			case 'imServices':
			case 'widgets':
				continue;
			
			case 'title':
			case 'socialLabel':
			case 'html':
				this.save_param('signatures.'+id+'.'+param,signature[param],'complex');
				break;
			
			default:
				this.save_param('signatures.'+id+'.'+param,signature[param]);
				break;
			}
		}
		
		save_services('social',signature.socialServices);
		save_services('im',signature.imServices);
		save_apps(signature.widgets);
	};
	
	this.loadSignature = function(id)
	{
		var this_obj = this;
		var sig_prefix = 'signatures.'+id+'.';
		
		function read_services(type)
		{
			var prefix = sig_prefix+type+'.';
			
			var services = {};
			var count = this_obj.load_param(prefix+'count');
			if (count != null)
			{
				for (var i=0; i < count; i++)
				{
					var service_id = this_obj.load_param(prefix+i+'.id');
					var service_val = this_obj.load_param(prefix+i+'.val');
			
					// override for an upgrade bug (empty services)
					if (service_val == null)
						continue;
						
					services[i] = {};
					services[i]["id"] = service_id;
					services[i]["value"] = service_val;
				}
			}
			
			return services;
		}
		
		function read_apps()
		{
			var prefix = sig_prefix+'widgets.';
			
			var apps = [];
			var count = this_obj.load_param(prefix+'count');
			if (count != null)
			{
				for (var i=0; i < count; i++)
				{
					var app = {};
					app['type'] = this_obj.load_param(prefix+i+'.type');
					app['title'] = this_obj.load_param(prefix+i+'.title');
					app['enabled'] = this_obj.load_param(prefix+i+'.enabled');
					//wisestamp_utils.log('[wisestamp_mozilla_storage::read_apps] ' + this_obj.load_param(prefix+i+'.value') + ' >>>');
		
					app['params'] = JSON.parse(this_obj.load_param(prefix+i+'.value'));
					
					apps.push(app);
				}
			}
			
			return apps;
		}
		
		var signature = this.getDefaultSignature(false);
		
		signature["title"] = this.load_param(sig_prefix+'title',undefined,'complex');
		signature["html"] = this.load_param(sig_prefix+'html',undefined,'complex');
		
		signature['socialFormat'] = this.load_param(sig_prefix+'socialFormat');
		signature['socialLabel'] = this.load_param(sig_prefix+'socialLabel',undefined,'complex');
		signature['imFormat'] = this.load_param(sig_prefix+'imFormat');
		signature['imLabel'] = this.load_param(sig_prefix+'imLabel');

		signature['borderType'] = this.load_param(sig_prefix+'borderType');
		signature['bgColor'] = this.load_param(sig_prefix+'bgColor');

		signature["socialServices"] = read_services('social');
		signature["imServices"] = read_services('im');
		signature["widgets"] = read_apps();
		
		return signature;
	};
	
	this.loadVer1 = function(prefs)
	{
		var this_obj = this;
		
		function load_signature(t)
		{
			var signature = {};
			signature.show = {}
			signature.show.services = prefs.getCharPref(t + ".services","linkedin,facebook,flickr,twitter");
			signature.show.im = prefs.getCharPref(t + ".im","gtalk,skype,msn");
			signature.im = {}
			signature.services = {};
			var ims = prefs.getCharPref("im","aim,bb,gtalk,googlewave,icq,msn,qq,skype,yahoo").split(",");
			for (var i = 0; i < ims.length; i++) {
				var im = ims[i];
				var value = "";
				value = prefs.getCharPref(t + "." + im);
				signature.im[im] = value.split("\r\n");
				if (!signature.im[im]) 
					signature.im[im] = [];
			}
			var ids = prefs.getCharPref("services","amazon,answers,bebo,blogger,blogRSS,delicious,deviantart,digg,ebay,etsy,facebook,flickr,flixster,friendfeed,friendster,google,googlebuzz,googlecalendar,googlereader,hi5,hyves,lastfm,linkedin,livejournal,meetup,mybloglog,myspace,netflix,netvibes,ning,orkut,photobucket,picasa,plaxo,plurk,reddit,stumbleupon,second_life,seesmic,slideshare,stumbleupon,technorati,tumblr,tungle,twitter,typepad,upcoming,vimeo,visualcv,wordpress,xanga,xing,yanswers,yedda,yelp,youtube").split(",");
			for (var i = 0; i < ids.length; i++) {
				var sid = ids[i];
				var value = "";
				value = prefs.getCharPref(t + "." + sid);
				signature.services[sid] = value.split("\r\n");
				if (!signature.services[sid]) 
					signature.services[sid] = [];
			}
			
			signature.text = prefs.getComplexPref(t + ".text");
			signature.text = signature.text.replace(/\\"/gi,'"');
			signature.advanced = prefs.getComplexPref(t + ".advanced");
			signature.rsstitle = prefs.getComplexPref(t + ".rss-title");
			signature.rssurl = prefs.getComplexPref(t + ".rss-url");
			
			signature.imFormat = {};
			signature.servicesFormat = {};
			
			try {
				const {Ci} = require("chrome");
				signature.imFormat.hideTitle = prefs.m_prefs_branch.getBoolPref(t + ".im.hideTitle");
				signature.imFormat.title = prefs.m_prefs_branch.getComplexValue(t + ".im.title", Ci.nsISupportsString).data;
				signature.imFormat.showLabels = prefs.m_prefs_branch.getBoolPref(t + ".im.showLabels");
				signature.imFormat.showIcons = prefs.m_prefs_branch.getBoolPref(t + ".im.showIcons");
				
				signature.servicesFormat.hideTitle = prefs.m_prefs_branch.getBoolPref(t + ".services.hideTitle");
				signature.servicesFormat.title = prefs.m_prefs_branch.getComplexValue(t + ".services.title", Ci.nsISupportsString).data;
				signature.servicesFormat.showLabels = prefs.m_prefs_branch.getBoolPref(t + ".services.showLabels");
				signature.servicesFormat.showIcons = prefs.m_prefs_branch.getBoolPref(t + ".services.showIcons");
			
			} catch (e) // if no new fields - take defaults from the old
			{
				signature.imFormat.hideTitle = prefs.getBoolPref("hidechat",false);
				signature.imFormat.title = prefs.getComplexPref("chat","");
				signature.imFormat.showLabels = prefs.getBoolPref("im.text",true);
				signature.imFormat.showIcons = prefs.getBoolPref("im.icons",true);
				
				signature.servicesFormat.hideTitle = prefs.getBoolPref("hidecontactme",false);
				signature.servicesFormat.title = prefs.getComplexPref("contactme","");
				signature.servicesFormat.showLabels = prefs.getBoolPref("services.text",false);
				signature.servicesFormat.showIcons = prefs.getBoolPref("services.icons",true);
			}
				
			/////////////////////////////////////////////////////////
			
			var signature_updated = this_obj.getDefaultSignature(false);
			
			signature_updated.socialServices = {};
			var services = (signature.show.services == '') ? [] : signature.show.services.split(',');
			for (var i_service = 0; i_service < services.length; i_service++)
			{
				signature_updated.socialServices[i_service] = {};
				signature_updated.socialServices[i_service]['id'] = services[i_service];
				signature_updated.socialServices[i_service]['value'] = signature.services[services[i_service]];
			}
			
			signature_updated.imServices = {};
			var im = (signature.show.im == '') ? [] : signature.show.im.split(',');
			for (var i_im = 0; i_im < im.length; i_im++)
			{
				signature_updated.imServices[i_im] = {};
				signature_updated.imServices[i_im]['id'] = im[i_im];
				signature_updated.imServices[i_im]['value'] = signature.im[im[i_im]];
			}
			
			signature_updated['html'] = signature.text;
			
			if (signature.servicesFormat.hideTitle == false)
				signature_updated['socialLabel'] = signature.servicesFormat.title;
				
			if (signature.imFormat.hideTitle == false)
				signature_updated['imLabel'] = signature.imFormat.title;
			
			signature_updated['socialFormat'] = 'both';
			if (signature.servicesFormat.showLabels && !signature.servicesFormat.showIcons)
				signature_updated['socialFormat'] = 'text';
			else if (!signature.servicesFormat.showLabels && signature.servicesFormat.showIcons)
				signature_updated['socialFormat'] = 'icons';
				
			signature_updated['imFormat'] = 'both';
			if (signature.imFormat.showLabels && !signature.imFormat.showIcons)
				signature_updated['imFormat'] = 'text';
			
			
			// RSS
			if (signature.rssurl != '')
			{
				var app = {};
				app['id'] = '0';
				app['type'] = 'rss';
				app['title'] = 'RSS';
				app['enabled'] = 'true';
				app['params'] = { "title":signature.rsstitle, "url":signature.rssurl };
			
				signature_updated['widgets'] = [];
				signature_updated['widgets'].push(app);
			}			
			
			return signature_updated;
		}
		
		var data = this.getDefaultData(false);
		data['prefs'] = {};
		
		data.prefs['insertOnCompose'] = prefs.getBoolPref("autoinsert_compose", true, "autoinsert");
		data.prefs['insertOnReply'] = prefs.getBoolPref("autoinsert_thread", true, "autoinsert");
		data.prefs['displayWebmailIcon'] = !prefs.getBoolPref("hidebuttons",false);
		data.prefs['displayPlatformIcon'] = !prefs.getBoolPref("hidestatusbar",false);
		data.prefs['addPromotionTag'] = prefs.getBoolPref("promote",true);
		
		data.signatures = {};
		
		var default_type = prefs.getComplexPref('type','personal');
		var types = prefs.getComplexPref("signatures","Personal,Business").split(",");
		for (var i_type = 0; i_type < types.length; i_type++)
		{
			var type = encodeURIComponent(types[i_type].replace(/^\s+|\s+$/, '').toLowerCase());
			data.signatures[i_type+1] = load_signature(type);
			data.signatures[i_type+1].title = types[i_type];
			
			if (default_type == type)
				data.prefs['defaultId'] = i_type+1;
		}
		
		return data;
	};
	
	this.loadLocal = function(callback)
	{
		//wisestamp_utils.log('[wisestamp_mozilla_storage::load] >>>');
		
		this.m_data = this.getDefaultData(false);
		
		var signatures_ids = this.load_param('signatures_ids');
		if (signatures_ids != null) // data is stored
		{
			//wisestamp_utils.log('[wisestamp_mozilla_storage::load] signatures found');
			
			signatures_ids = signatures_ids.split(',');
			for (var i in signatures_ids)
			{
				var id = signatures_ids[i];
				//wisestamp_utils.log('[wisestamp_mozilla_storage::load] loading signature ['+id+']');
				this.m_data['signatures'][id] = this.loadSignature(id);
			} 
	
			var mappings = this.load_param('mappings');
			this.m_data['mappings'] = this.load_param('mappings',undefined,'json');
			this.m_data['customIcons'] = this.load_param('customIcons',undefined,'json');
			
			this.m_data['version'] = this.load_param('version');
			
			this.m_data['prefs'] = {};
			this.m_data.prefs['defaultId'] = this.load_param('defaultId');

			this.m_data.prefs['insertOnCompose'] = this.load_param('insertOnCompose');
			this.m_data.prefs['insertOnReply'] = this.load_param('insertOnReply');
			this.m_data.prefs['insertAboveQuote'] = this.load_param('insertAboveQuote');
			this.m_data.prefs['displayWebmailIcon'] = this.load_param('displayWebmailIcon');
			this.m_data.prefs['displayPlatformIcon'] = this.load_param('displayPlatformIcon');
			this.m_data.prefs['addPromotionTag'] = this.load_param('addPromotionTag');
			this.m_data.prefs['emailAppsTag'] = this.load_param('emailAppsTag');
			
		} else // no data is stored
		{
			var ver_1_prefs = new wisestamp_mozilla_prefs_old("extensions.wisestamp");
			var ver1version = ver_1_prefs.getCharPref('currentVersion','none');
			if (ver1version != 'none')
			{
				this.m_data = this.loadVer1(ver_1_prefs);
				//this.save(this.m_data,callback);
				
				//this.m_data['version'] = ver1version;
				//this.save_param('version',ver1version);
			}
			else
			{	
				this.m_data = this.getDefaultData(true);
				this.m_data['version'] = this.load_param('version');
			}
		}
		
		// always load user data
		this.m_data['loggedIn']	= this.loadLocalParam('loggedIn');
		this.m_data['loginType']	= this.loadLocalParam('loginType');
		this.m_data['username']	= this.loadLocalParam('username');
		this.m_data['password']	= this.loadLocalParam('password');
		this.m_data['plan']	= this.loadLocalParam('plan');
		this.m_data['name']	= this.loadLocalParam('name');
		this.m_data['fbToken']	= this.loadLocalParam('fbToken');
		this.m_data['expiredPlan'] = this.loadLocalParam('expiredPlan');
		
		this.m_data['uid']	= this.load_param('uid');
		
		this.m_data['promo_id'] 	= this.load_param('promo_id');
		this.m_data['promo_html'] = this.load_param('promo_html');
		
		//wisestamp_utils.log('[wisestamp_mozilla_storage::load] '+wisestamp_utils.object_keys(this.m_data.signatures).length + ' signatures loaded');
		callback();
	};
	
	this.loadSignatureList = function(callback)
	{
		
	};
				
	this.save = function(data,callback)
	{
		var signatures_ids = '';
		for (var id in data.signatures)
		{
			this.saveSignature(id,data.signatures[id]);
			
			if (signatures_ids.length > 0)
				signatures_ids += ',';
			
			signatures_ids += id;
		}
		
		this.save_param('signatures_ids',signatures_ids);
		this.save_param('customIcons',data.customIcons);
		
		for (var param in data.prefs)
			this.save_param(param,data.prefs[param]);
		
		m_prefs.flush();
		callback();
	};
	
	this.loadLocalParam = function(key,callback)
	{
		return this.load_param(key,callback);
	};
	
	this.saveLocalParam = function(key,value)
	{
		return this.save_param(key,value);
	};
	
	this.toText = function()
	{
		var str = m_prefs.toText();
		
		var old_prefs = new wisestamp_mozilla_prefs_old('extensions.wisestamp');
		str += old_prefs.toText();
		delete old_prefs;
		
		return str;
	};
	
	this.setMapping = function(sender,signature_id,ignore)
	{
		this.save_param('mappings.'+sender+'.id',signature_id);
		this.save_param('mappings.'+sender+'.ignore',ignore);
	};
	
	this.getDefaultSignature = function(add_services)
	{
		//wisestamp_utils.log('[WiseStampStorageBase::getDefaultSignature] >>>');
		
		var default_signature = {};
		
		var default_social_services = ['facebook','twitter','linkedin','flickr','instagram'];
		var default_im_services = ['gtalk','skype','msn','yahoo'];
		
		default_signature.socialServices = [];
		default_signature.imServices = [];
		
		if (add_services == true)
		{
			for (var i = 0; i < default_social_services.length; i++)
			{
				var social_service = {};
				social_service['id'] = default_social_services[i];
				social_service['value'] = '';
				default_signature.socialServices.push(social_service);
			}
		
			for (var i = 0; i < default_im_services.length; i++)
			{		
				var im_service = {};
				im_service['id'] = default_im_services[i];
				im_service['value'] = '';
				default_signature.imServices.push(im_service);
			}
		}
		
		default_signature['widgets'] = [];
		default_signature['html'] = '';
		default_signature['socialFormat'] = 'icons';
		default_signature['socialLabel'] = '';
		default_signature['imFormat'] = 'both';
		default_signature['imLabel'] = 'Contact me: ';
		default_signature['borderType'] = 'none';
		default_signature['bgColor'] = 'none';
		
		return default_signature;
	}
};

console.log(wisestamp_mozilla_storage_old.load_param)
//wisestamp_mozilla_storage.prototype = new WiseStampStorageBase;
exports.wisestamp_mozilla_storage_old = new wisestamp_mozilla_storage_old();
