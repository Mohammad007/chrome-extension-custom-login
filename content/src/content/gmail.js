var this_script_is_active = wisestamp.is_active.is_script_active(window.document.location.href, "content/src/content/gmail.js");

wisestamp_utils.log(`gmail.js start - [${window.document.location.href}], this_script_is_active = ' + this_script_is_active + ' >>>>>`);

if (this_script_is_active) {

	wisestamp_utils.log("[wisestamp_content_gmail] >>>>>");

	var wisestamp_content_gmail = function() {
		this.m_content_type = "Gmail";
		this.m_init_conduit = true;
		this.m_wisestamp_inmail_promo_enabled = true;
		this.m_top_menu_enabled = true;
		this.m_top_menu_direction = "default";
		this.m_top_menu_top_offset = 0;
		this.m_top_menu_left_offset = 0;
		this.m_top_menu_right_offset = 0;
		this.toolbar_retries = 120;
		this.add_edit_signature_label_retries = 120;
		this.m_ads_banner = false; // true;
		this.m_last_signature_dict = {};
		this.m_event_name_dict = {};
		this.m_menu_direction = "top";
		this.m_control_signature_insertion_direction = "top";
		this.m_control_signature_insertion_top_offset = 0;
		this.m_control_signature_insertion_left_offset = 0;
		this.wisestamp_uid = false;
		this.enabled = true;
		this.assigned_signature = [];
		this.temp_uid = null;
		var this_obj = this;
		var control_signature_insertion_done = false;
		var selectors = {};
		var flags = {};
		var frames_count = 0;

		this.init = function() {
			wisestamp_utils.log(`[wisestamp_content_gmail::init] wisestamp.sys.platform = ${wisestamp.sys.platform} >>>>>`);

			wisestamp_utils.send_request({command: 'load_param', param: ['selectors', 'urls', 'version', 'wisestamp_uid', 'enabled', 'control_signature_insertion_done', 'dont_show_login_popup', 'flags', 'installed', 'assigned_signature', 'temp_uid']}, function(reply) {
				if(!reply) return;
				if(wisestamp.sys.platform === 'safari'){
					reply = JSON.parse(reply);
				}
				if (reply.selectors && reply.selectors.gmail) {
					selectors = reply.selectors.gmail;
				}
				this_obj.urls = reply.urls;
				this_obj.version = reply.version;
				this_obj.wisestamp_uid = reply.wisestamp_uid;
				this_obj.enabled = reply.enabled;
				this_obj.temp_uid = reply.temp_uid;
				this_obj.assigned_signature = reply.assigned_signature || [];
				control_signature_insertion_done = reply.control_signature_insertion_done;
				this_obj.dont_show_login_popup = reply.dont_show_login_popup;
				flags = reply.flags;
				if ((typeof(flags) === "object") && (!(flags === null)) && (flags["personal_promo_enabled"] === true)) {
					this_obj.m_wisestamp_personal_promo_enabled = true;
				}
				if ((typeof(flags) === "object") && (!(flags === null)) && (flags["personal_signature_enabled"] === true)) {
					this_obj.m_wisestamp_personal_signature_enabled = true;
				}
				if ((wisestamp_jquery('html').attr('dir') === 'rtl') || (wisestamp_jquery('body').attr('dir') === 'rtl')) {
					this_obj.m_top_menu_direction = "bottom-right";
				} else {
					this_obj.m_top_menu_direction = "default";
				}
				var try_to_add_top_menu = function() {
					if (this_obj.toolbar_retries > 0) {
						this_obj.add_top_menu();
						this_obj.toolbar_retries--;
						wisestamp_utils.setTimeout(try_to_add_top_menu, 500);
					}
				};
				wisestamp_utils.setTimeout(try_to_add_top_menu, 500);

				var try_to_add_edit_signature_label = function() {
					if (this_obj.add_edit_signature_label_retries > 0) {
						this_obj.add_edit_signature_label();
						this_obj.add_edit_signature_label_retries--;
						wisestamp_utils.setTimeout(try_to_add_edit_signature_label, 500);
					}
				};
				wisestamp_utils.setTimeout(try_to_add_edit_signature_label, 500);

				_super.init();

				wisestamp_utils.setTimeout(function(){
					var account = this_obj.get_user_id().trim().toLowerCase();
					if(wisestamp_utils.validate_email(account)){
						if(reply.installed > 1488876527 && this_obj.assigned_signature.indexOf(account) == -1){ // from timestamp 1488876527 and on
							this_obj.open_assign_signature_to_email_address_popup(account, true);
						}
					}
				}, 1500);

				if (typeof wisestamp_inmail_promo !== 'undefined') {
					wisestamp_inmail_promo.init(this_obj);
				}

				this_obj.listen({
					"main": {
						"selector": {"tagName": "ol", "className": "gbtc"}
					},
					"editor": {
						"selector": {"tagName": "iframe", "className": "editable"}
					}
				});

				wisestamp_utils.log("[wisestamp_content_gmail::init] <<<<<");
			});
		};

		this.generate_session_id = function() {
			// In Gmail we use SessionID to identify the user, but for security reasons we don't want to use wisestamp_uid directly. Therefore we use an md5 hash of it.
			return wisestamp_utils.md5(`--- ${this_obj.wisestamp_uid} ---`);
		};

		this.conduit_setup_compose = function() {
			wisestamp_utils.log("[wisestamp_content_gmail::conduit_setup_compose] >>>>>");

			function add_click_handler(body) {
				body.click(function() {
					wisestamp_utils.log("[wisestamp_content_gmail::conduit_setup_compose] click detected");
					if (!this_obj.new_frames_found(wisestamp_jquery(this))) {
						return;
					}

					wisestamp_utils.setTimeout(function() {
						this_obj.try_setup_wisestamp_compose();
					}, 0);
				});
			}

			this_obj.try_setup_wisestamp_compose();
		};

		this.add_top_menu = function() {
			// TODO: check how it works in other platforms
			wisestamp_utils.log("[wisestamp_content_gmail::add_top_menu] >>>>>");

			if (wisestamp_jquery('#wisestamp-top').length > 0) {
				wisestamp_utils.log("[wisestamp_content_gmail::add_top_menu] Already added. <<<<<");
				return null;
			}

			var menu = null;
			var link = null;

			for (var i_menu_ver = 0; i_menu_ver < selectors.menus.length; i_menu_ver++) {
				var menu_element = wisestamp_ui.find_element_recursively(selectors.menus[i_menu_ver], document);

				if (!wisestamp_utils.is_empty(menu_element)) {
					menu = menu_element;
					break;
				}
			}

			if (menu === null) {
				wisestamp_utils.log(`[wisestamp_content_gmail::add_top_menu] menu = ${menu}. <<<<<`);
				return null;
			}

			var container;

			wisestamp_utils.log(`[wisestamp_content_gmail::add_top_menu] i_menu_ver = ${i_menu_ver}.`);
			switch (i_menu_ver) {
				case 0:
					var link = wisestamp_jquery('<a class="e" href="javascript:void(0)">WiseStamp</a>');
					var icon = wisestamp_jquery('<img style="vertical-align: bottom;" class="wisestamp-top-img" />');

					wisestamp_ui.hover_intent(
						link,
						{
							sensitivity: 7,		// number = sensitivity threshold (must be 1 or higher)
							interval: 200,		// number = milliseconds of polling interval
							timeout: 200,		// number = milliseconds delay before onMouseOut function call
							out: function() {},	// function = onMouseOut callback (required)
							over: function() {
								this_obj.open_wisestamp_top_menu(wisestamp_jquery(this), document);
							}
						}
					);

					var menu_items_count = menu.children('span').length;
					var settings_link = menu.children('span:eq(' + (menu_items_count - 3) + ')');
					settings_link.after(' | ');

					container = wisestamp_jquery('<span id="wisestamp-top"></span>');
					container.append(icon);
					container.append(' ');
					container.append(link);

					settings_link.after(container);

					break;

				case 1:
					container = wisestamp_jquery(`
						<li class="gbt" id="wisestamp-top">
							<a class="gbgt" aria-haspopup="true" aria-owns="gbd4">
								<span class="gbtb2"></span>
								<span id="gbgs4" class="gbts">
									<span id="gbi4">
										<span><img style="padding-bottom: 3px; vertical-align: middle;" class="wisestamp-top-img" /> WiseStamp</span>
										<span class="gbma"></span>
									</span>
								</span>
							</a>
						</li>
					`);


					var menu_items_count = menu.children('li').length;
					var settings_link = menu.children(`li:eq(${menu_items_count - 2})`);
					settings_link.before(container);

					link = container.find('a');
					link.hover(
						function() { wisestamp_jquery(this).addClass('gbgt-hvr'); },
						function() { wisestamp_jquery(this).removeClass('gbgt-hvr'); }
					);

					break;

				case 2:
					container = wisestamp_jquery(`
						<li class="gbt" id="wisestamp-top">
							<a class="gbgt" aria-haspopup="true" aria-owns="gbd4">
								<span id="gbgs4" class="gbts" style="padding: 0px 10px;">
									<span id="gbi4">
										<span><img style="padding-bottom: 3px; vertical-align: middle;" class="wisestamp-top-img" /></span>
										<span class="gbma"></span>
									</span>
								</span>
							</a>
						</li>
					`);

					var menu_items_count = menu.children('li').length;
					var settings_link = menu.children('li:eq(1)');
					settings_link.before(container);

					link = container.find('a');
					link.hover(
						function() { wisestamp_jquery(this).addClass('gbgt-hvr'); },
						function() { wisestamp_jquery(this).removeClass('gbgt-hvr'); }
					);
					break;

				case 3:
					container = wisestamp_jquery(`
						<div class="gbt" id="wisestamp-top" style="display: inline-block; margin: ${(((wisestamp_jquery('html').attr('dir') === 'rtl') || (wisestamp_jquery('body').attr('dir') === 'rtl')) ? '6px 6px 4px -8px' : '6px -8px 4px 6px')};">
							<a class="gbgt" aria-haspopup="true" aria-owns="gbd4">
								<span id="gbgs4" class="gbts" style="padding: 0px 10px;">
									<span id="gbi4">
										<span><img style="padding-bottom: 3px; vertical-align: middle;" class="wisestamp-top-img" /></span>
										<span style="position: relative; top: -1px; border-style: solid dashed dashed; border-color: transparent; border-top-color: #c0c0c0; display: -moz-inline-box; display: inline-block; font-size: 0px; height: 0px; line-height: 0; width: 0px; border-width: 3px 3px 0px; padding-top: 1px; left: 4px;"></span>
									</span>
								</span>
							</a>
						</div>
					`);

					menu.before(container);

					link = container.find('a');
					break;
			}

			link.click(function() {
				this_obj.open_wisestamp_top_menu(wisestamp_jquery(this), document);
			});

			this_obj.update_wisestamp_top_image();
			wisestamp_utils.setTimeout(function() {
				this_obj.after_add_top_menu(link);
			}, 0);
			return container;
		};

		this.get_editor = function(document, callback) {
			var editor = null;
			var found = false;
			for (var i in selectors.editor) {
				editor = wisestamp_ui.find_element_recursively(selectors.editor[i], document);
				if ((!(editor === null)) && (typeof(editor) === "object") && (editor.length > 0)) {
					editor.each(function() {
						found = true;
						wisestamp_utils.log("[wisestamp_content_gmail::get_editor] found editor >>>>>");
						if (typeof(callback) === 'function') {
							callback(wisestamp_jquery(this));
						}
					});
				}
			}

			if ((editor === null) && (!found)) {
				wisestamp_utils.log("[wisestamp_content_gmail::get_editor] didn't find editor >>>>>");
				if (typeof(callback) === 'function') {
					callback(editor);
				}
			}
		};

		this.insert_wisestamp_icon = function() {
			wisestamp_utils.log("[wisestamp_content_gmail::insert_wisestamp_icon] >>>>>");

			if (!wisestamp_utils.is_logged_in(this_obj.wisestamp_uid)) {
				wisestamp_utils.log("[wisestamp_content_gmail::insert_wisestamp_icon] User is not logged in. <<<<<");
				return;
			}

			var insert_neighbour = null;

			insert_neighbour = wisestamp_ui.find_element_recursively(selectors.insert_neighbour.join(', '), document);

			if (insert_neighbour === null) {
				return;
			}

			wisestamp_utils.log("[wisestamp_content_gmail::insert_wisestamp_icon] adding icon...");
			insert_neighbour.each(function() {
				var _$_this = wisestamp_jquery(this);
				if (_$_this.parent().find('.wisestamp-icon-container').length === 0) {
					var toolbar_doc = _$_this[0].ownerDocument;

					var icon = this_obj.get_wisestamp_compose_icon(toolbar_doc);
					var icon_container;

					icon_container = _$_this.clone();

					var icon_container_inner = icon_container.children('div:first-child').children('div:first-child');
					icon_container.addClass('wisestamp-icon-container');
					icon_container.css({
						'margin-left': '5px',
						'margin-right': '10px'
					});
					icon_container.attr('data-tooltip', 'WiseStamp');
					icon_container_inner.empty();
					icon_container_inner.append(icon);
					icon.css("margin-top", "2px");

					icon_container.hover(
						function() { wisestamp_jquery(this).addClass(selectors.icon_container_hover_class); },
						function() { wisestamp_jquery(this).removeClass(selectors.icon_container_hover_class); }
					);

					// We add the click event to the container because it's not triggered from the icon itself.
					icon_container.click(function(event) {
						this_obj.open_wisestamp_compose_menu(wisestamp_jquery(this), toolbar_doc);
						event.stopImmediatePropagation();
						event.stopPropagation();
					});

					_$_this.before(icon_container);

					this_obj.update_wisestamp_compose_image();

					if (typeof(control_signature_insertion_done) === 'undefined') {
						control_signature_insertion_done = true;
						wisestamp_utils.send_request({command: 'save_param', param: 'control_signature_insertion_done', value: true}, function() {});
						this_obj.open_control_signature_insertion(icon_container, toolbar_doc);
					}
				}
			});
		};

		this.get_user_id = function(editor) {
			var wisestamp_editor_id = undefined;
			if (!(typeof(editor) === 'undefined')) {
				wisestamp_editor_id = editor.attr('data-wisestamp-editor-id');
			}

			wisestamp_utils.log(`[wisestamp_content_gmail::get_user_id] wisestamp_editor_id = ${wisestamp_editor_id} >>>>>`);
			if (!(typeof(editor) === 'undefined')) {
				var editor_parent_div = this_obj.get_editor_parent_div(editor);
			}

			// for compose
			for (var i in selectors.for_compose) {
				if (!(typeof(editor) === 'undefined')) {
					var from_element = editor_parent_div.find(selectors.for_compose[i]);
				} else {
					var from_element = wisestamp_ui.find_element_recursively(selectors.for_compose[i], document);
				}
				if ((!(from_element === null)) && (from_element.length > 0)) {
					var user_id = from_element.find('option:selected').attr('value');
					if (user_id) {
						user_id = user_id.toLowerCase();
						if (wisestamp_utils.validate_email(user_id)) {
							wisestamp_utils.log(`[wisestamp_content_gmail::get_user_id] selectors.for_compose, user_id = "${user_id}" <<<<<`);
							return user_id;
						}
					}
				}
			}

			// for reply/forward
			for (var i in selectors.for_reply_forward) {
				if (!(typeof(editor) === 'undefined')) {
					var user_element = editor_parent_div.find(selectors.for_reply_forward[i]);
				} else {
					var user_element = wisestamp_jquery(selectors.for_reply_forward[i]);
				}
				if ((!(user_element === null)) && (user_element.length > 0) && (user_element.val() != '')) {
					user_element.prev().click(function() {
						wisestamp_utils.setTimeout(function() {
							this_obj.setup_mapping(editor);
						}, 0);
					});
					var user_id = user_element.val();
					if (user_id) {
						user_id = user_id.toLowerCase();
						if (wisestamp_utils.validate_email(user_id)) {
							wisestamp_utils.log(`[wisestamp_content_gmail::get_user_id] selectors.for_reply_forward, user_id = "${user_id}" <<<<<`);
							return user_id;
						}
					}
				}
			}

			for (var i in selectors.default_user_id) {
				var user_element = wisestamp_jquery(selectors.default_user_id[i]);
				if (user_element.length > 0) {
					var user_id = user_element.text();
					if (user_id) {
						user_id = user_id.toLowerCase();
						if (wisestamp_utils.validate_email(user_id)) {
							wisestamp_utils.log(`[wisestamp_content_gmail::get_user_id] selectors.default_user_id, user_id = "${user_id}" <<<<<`);
							return user_id;
						}
					}
				}
			}

			var user_id = "";
			wisestamp_utils.log(`[wisestamp_content_gmail::get_user_id] user_id = "${user_id}" <<<<<`);
			return user_id;
		};

		this.setup_mapping = function(editor) {
			var wisestamp_editor_id = undefined;
			if (!(typeof(editor) === 'undefined')) {
				wisestamp_editor_id = editor.attr('data-wisestamp-editor-id');
			}

			wisestamp_utils.log(`[wisestamp_content_gmail::setup_mapping] wisestamp_editor_id = ${wisestamp_editor_id} >>>>>`);
			if (!(typeof(editor) === 'undefined')) {
				var editor_parent_div = this_obj.get_editor_parent_div(editor);
			}

			for (var i in selectors.for_compose) {
				if (!(typeof(editor) === 'undefined')) {
					var from_element = editor_parent_div.find(selectors.for_compose[i]);
				} else {
					var from_element = wisestamp_ui.find_element_recursively(selectors.for_compose[i], document);
				}
				if ((!(from_element === null)) && (from_element.length > 0)) {
					from_element.click(function() {
						this_obj.insert_mapped_signature(undefined, true, editor);
					});
				}
			}

			for (var i in selectors.for_compose_keydown) {
				if (!(typeof(editor) === 'undefined')) {
					var from_element = editor_parent_div.find(selectors.for_compose_keydown[i]);
				} else {
					var from_element = wisestamp_ui.find_element_recursively(selectors.for_compose_keydown[i], document);
				}
				if ((!(from_element === null)) && (from_element.length > 0)) {
					from_element.keydown(function(e) {
						if (!(e.keyCode === 9)) {
							wisestamp_utils.setTimeout(function() {
								this_obj.insert_mapped_signature(undefined, true, editor);
							}, 0);
						}
					});
				}
			}
		};

		this.init_email_mode = function(editor_body, mode) {
			var $editor = wisestamp_jquery(editor_body);
			if (typeof mode === "undefined") {
				var editor_frame_element = $editor[0].ownerDocument.defaultView.frameElement;
				var editor_parent_find_reply_img = ((editor_frame_element === null) ? $editor : wisestamp_jquery(editor_frame_element)).parents(selectors.editor_and_img_parent_div.join(', ')).find(selectors.reply_img.join(', '));
				mode = (((editor_parent_find_reply_img.length === 0) && (this_obj.get_quote_element(editor_body).length === 0)) ? 'compose' : 'reply');
			}

			$editor.attr("wsmode", mode);
		};

		this.get_quote_element = function(editor_body) {
			return editor_body.find(selectors.quote_element.join(', '));
		};

		this.is_black_listed_view = function() {
			return (window.top || window).location.hash.split("/")[0] === "#settings";
		};

		this.insert_mapped_signature = function(account, manual, editor) {
			function get_mapped_signature(account_mapping, sig_type) {
				if (account_mapping[sig_type] != null) {
					return account_mapping[sig_type];
				}

				// default - compose signature (may be null, that's okay)
				return account_mapping['composeSigId'];
			}

			function get_non_premium_signature() {
				for (var id in this_obj.m_data.signatures) {
					if ('premium' in this_obj.m_data.signatures[id]) {
						continue;
					}

					return id;
				}

				return null;
			}

			var wisestamp_editor_id = undefined;
			if (!(typeof(editor) === 'undefined')) {
				wisestamp_editor_id = editor.attr('data-wisestamp-editor-id');
			}

			wisestamp_utils.log(`[wisestamp_content_gmail::insert_mapped_signature] account = ${account}, manual = ${manual}, wisestamp_editor_id = ${wisestamp_editor_id} >>>>>`);

			var response = true;
			var signature_id = null;
			this_obj.get_editor(document, function(editor) {
				if (!(editor === null)) {
					if ((typeof(wisestamp_editor_id) === 'undefined') || (editor.attr('data-wisestamp-editor-id') === wisestamp_editor_id)) {
						var this_wisestamp_editor_id = editor.attr('data-wisestamp-editor-id');
						var is_new_mail = this_obj.is_email_mode(editor, "compose");
						var sig_type = is_new_mail ? 'composeSigId' : 'replySigId';


						var current_sig = this_obj.get_current_signature(editor);
						if(current_sig.length && is_new_mail && !manual){
              // the manual check is for the manual signature change: https://www.screencast.com/t/5R0WXqHS
						  // in compose mode and have signature == draft mode
              // TODO: make the draft signature be selected on compose menu, right now it is not selected because we dont sign the current signature id and we can only know that there is a signature but no what signature is inserted.
						  return;
            }


						if (typeof account === 'undefined') { // no sender was passed
							account = this_obj.get_user_id(editor);
						}

						var signature_id = null;

						if (this_obj.m_data && this_obj.m_data.mappings && account in this_obj.m_data.mappings) {
							signature_id = get_mapped_signature(this_obj.m_data.mappings[account], sig_type);
						}

						if (signature_id === null && this_obj.m_data && this_obj.m_data.mappings && typeof this_obj.m_data.mappings['all'] !== 'undefined') {
							signature_id = get_mapped_signature(this_obj.m_data.mappings['all'], sig_type);
						}

						if (signature_id == null) {
							for (var key in this_obj.m_data.signatures) {
								signature_id = key;
								break;
							}
						}

						// When signature_id is 0, accessing m_data.signatures[0] returns an error, so we use utils.prop_by_path to avoid the issue
						var sig_obj = wisestamp_utils.prop_by_path(this_obj, "m_data.signatures." + signature_id, {});

						if (signature_id != null && 'premium' in sig_obj) {
							signature_id = get_non_premium_signature();
						}

						this_obj.insert_signature(signature_id, false, this_wisestamp_editor_id);
					}
				}
			});
		};

		this.insert_signature = function(signature_id, manual, wisestamp_editor_id) {


			if (signature_id === 'None') {
				signature_id = '0';
			}
			wisestamp_utils.log(`[wisestamp_content_gmail::insert_signature] signature_id = ${signature_id}, wisestamp_editor_id = ${wisestamp_editor_id} >>>>>`);

			_super.m_wisestamp_ui = wisestamp_ui;
			if (signature_id == null) {
				return;
			}
			console.log(`WISESTAMP SIG ID: ${signature_id}`)
			if(signature_id && signature_id !== '0') {
				this_obj.clear_no_extension_signature();
			}

			this_obj.m_last_signature_id = signature_id;
			if (wisestamp_menu) {
				wisestamp_menu.set_last_signature_id(this_obj.m_last_signature_id);
			}
			if (!(typeof(wisestamp_editor_id) === 'undefined')) {
				if (typeof(this_obj.m_last_signature_dict[wisestamp_editor_id]) === 'undefined') {
					this_obj.m_event_name_dict[wisestamp_editor_id] = "compose";
				} else {
					this_obj.m_event_name_dict[wisestamp_editor_id] = "change_sig";
				}
				this_obj.m_last_signature_dict[wisestamp_editor_id] = signature_id;
			}

			wisestamp_utils.log(`[wisestamp_content_gmail::insert_signature] signature_id = ${signature_id}, wisestamp_editor_id = ${wisestamp_editor_id}`);
			if (signature_id === '0') {
				this_obj.get_current_editor(function(editor) {
					if ((typeof(wisestamp_editor_id) === 'undefined') || (editor.attr('data-wisestamp-editor-id') === wisestamp_editor_id)) {
						this_obj.insert_signature_html(editor, "", "", manual);
					}
				});
				if (!(typeof(wisestamp_editor_id) === 'undefined')) {
					var request = {command: "ws_track", action: this_obj.m_event_name_dict[wisestamp_editor_id] + "_no_sig"};
				} else {
					var request = {command: "ws_track", action: "compose_no_sig"};
				}
				wisestamp_utils.send_request(request, function() {});
			} else {
				this_obj.get_data(
					'signature',
					signature_id,
					function(response) {
						if(wisestamp.sys.platform === 'safari'){
							response = JSON.parse(response);
						}
						var html = response.data.html;
						var vertical_html = response.data.vertical_html;
						var promo_id = response.promo_id;
						this_obj.get_current_editor(function(editor) {
							if ((typeof(wisestamp_editor_id) === 'undefined') || (editor.attr('data-wisestamp-editor-id') === wisestamp_editor_id)) {
								if (html != '') {
									this_obj.track_event('insert_content', undefined, signature_id);
									if (typeof promo_id !== 'undefined' && promo_id != null) {
										this_obj.track_event('insert_promo', 'promo_' + promo_id);
									} else {
										this_obj.track_event('insert_no_promo', 'promo_' + promo_id);
									}
								}

								this_obj.insert_signature_html(editor, html, vertical_html, manual);
							}
						});
					},
					this_obj.m_content_type,
					wisestamp_editor_id
				);
			}
		};

		this.clear_no_extension_signature = function(){
        wisestamp_jquery(selectors.no_extension_signature.join(', ')).remove();
        wisestamp_jquery('div[href="http://WS_promo"]').remove();
		}

		this.on_menu_switch_signature = function(signature_id, wisestamp_editor_id) {
			wisestamp_utils.log(`[wisestamp_content_gmail::on_menu_switch_signature] signature_id = ${signature_id}, wisestamp_editor_id = ${wisestamp_editor_id}`);

			this_obj.refresh_all_data(function() {
				this_obj.track_event('switch');
				this_obj.insert_signature(signature_id, true, wisestamp_editor_id);
			});
		};

		/* Toolbar icon */
		this.get_wisestamp_compose_menu = function(settings, toolbar_doc, add_go_pro, wisestamp_editor_id) {
      var menu_container = wisestamp_jquery('<div id="wisestamp-menu"></div>', toolbar_doc);
			if (this_obj.enabled) {
				var context_menu = wisestamp_jquery('<div class="wisestamp-compose-context-menu"></div>', toolbar_doc);

				this_obj.add_menu_top_header(context_menu, {
					'label': 'Choose the signature<br>you want to use'
				});

				for (var id in settings.signatures) {
					if (id === '__exposedProps__' || id === 'result') { // FF
						continue;
					}

					var title = settings.signatures[id].title;
					var command = function(e) {
						var wisestamp_editor_id = wisestamp_jquery(this).parents('[data-wisestamp-editor-id]').attr('data-wisestamp-editor-id');
						this_obj.on_menu_switch_signature(e.target.parentNode.id, wisestamp_editor_id);
					};

					this_obj.add_menu_item(context_menu, {
						'id': id,
						'label': title,
						'command': command,
						'type': "radio",
						'name': "switch-signature",
						'text-color': '#333',
						'imageURI': wisestamp_utils.get_url('content/img/checkbox_empty.png', true)
					}, wisestamp_editor_id);
				}

				this_obj.add_menu_item(context_menu, {
					'id': '0',
					'label': 'No signature',
					'command': function(e) {
						var wisestamp_editor_id = wisestamp_jquery(this).parents('[data-wisestamp-editor-id]').attr('data-wisestamp-editor-id');
						this_obj.on_menu_switch_signature(e.target.parentNode.id, wisestamp_editor_id);
					},
					'type': "radio",
					'name': "switch-signature",
					'text-color': '#333',
					'imageURI': wisestamp_utils.get_url('content/img/checkbox_empty.png', true)
				}, wisestamp_editor_id);

				if(add_go_pro){
					this_obj.add_menu_item(context_menu, {
						'label': 'Add another signature',
						'command': function(e) {
							this_obj.open_link(this_obj.urls.upgrade_url, 'compose', 'add_another_signature');
						},
						'type': "radio",
						'name': "add-another-signature",
						'text-color': '#333',
						'imageURI': wisestamp_utils.get_url('content/img/checkbox_empty.png', true)
					}, wisestamp_editor_id);
				}

				context_menu.append('<div style="margin-top: 15px;"></div>');

				// TODO: this_obj.add_always_do_button(context_menu);
				// this_obj.add_always_do_button(context_menu);

				this_obj.add_menu_bottom_footer(context_menu, add_go_pro);

				// TODO: check it also
				if (typeof this_obj.m_update_details === "object" && this_obj.m_update_details !== null && typeof this_obj.m_update_details.url === "string") {
					this_obj.add_menu_item(context_menu, {
						'label': 'Update available!',
						'command': function() {this_obj.open_link(this_obj.m_update_details.url, 'update', 'compose');},
						'imageURI': wisestamp_utils.get_url('content/img/exclamation.png'),
						'background-color': '#f0f0f0',
						'background-color-hover': '#e0e0e0',
						'text-color': '#777777'
					}, wisestamp_editor_id);
				}

				//this_obj.add_menu_bottom_div(context_menu);

				menu_container.css({'display': 'none', 'position': 'absolute', 'direction': 'ltr'});
				menu_container.attr('data-wisestamp-editor-id', wisestamp_editor_id);
				menu_container.html(context_menu[0]);
				switch (this_obj.m_menu_direction) {
					case "top":
						this_obj.add_menu_bottom_triangle(menu_container);
						break;

					case "right":
						this_obj.add_menu_left_triangle(menu_container);
						break;

					case "bottom":
						this_obj.add_menu_top_triangle(menu_container);
						break;
				}
				return menu_container;
			} else {
				var menu_inner_element = wisestamp_jquery('<div class="wisestamp-compose-disabled-inner">Your WiseStamp is disabled,<br /><span class="enable">Click to Enable</span></div>');
				menu_container.addClass('wisestamp-menu-disabled').append(menu_inner_element);

				menu_container.find("span.enable").click(function() {
					wisestamp_utils.send_request({command: "set_enabled", value: true, closePanel: true}, function() {
						this_obj.update_enabled_status(true);
					});
				});
				switch (this_obj.m_menu_direction) {
					case "top":
						this_obj.add_menu_bottom_disabled_triangle(menu_container);
						break;

					case "right":
						this_obj.add_menu_left_disabled_triangle(menu_container);
						break;

					case "bottom":
						this_obj.add_menu_top_disabled_triangle(menu_container);
						break;
				}
				return menu_container;
			}
		};

		this.open_wisestamp_compose_menu = function(element) {
			var editor_parent_div = element.parents(selectors.editor_parent_div.join(', '));
			var editor = editor_parent_div.find('[wisestamped][data-wisestamp-editor-id]');
			var wisestamp_editor_id;
			if (!(editor.length === 1)) {
				var iframes;
				try { /* Helps prevent errors like "Permission denied to access property 'jquery'" */
					iframes = editor_parent_div.find('iframe');
				} catch (e) {
					wisestamp_utils.log("[wisestamp_content_gmail::open_wisestamp_compose_menu] iframes exception!");
					iframes = [];
				}
				var result = [];
				for (var i = 0; i < iframes.length; i++) {
					var iframe_doc = wisestamp_ui.get_iframe_document(iframes[i]);

					if (!(typeof(iframe_doc) === 'undefined')) {
						var editor_element = wisestamp_ui.find_element_recursively('[wisestamped][data-wisestamp-editor-id]', iframe_doc);
						if (editor_element != null) {
							for (var j = 0; j < editor_element.length; j++) {
								result.push(editor_element[j]);
							}
						}
					}
				}

				if (result.length === 1) {
					editor = wisestamp_jquery(result);
				} else {
					editor = [];
				}
			}
			if (editor.length === 1) {
				wisestamp_editor_id = editor.attr('data-wisestamp-editor-id');
			} else {
				wisestamp_editor_id = undefined;
			}
			var toolbar_doc = element[0].ownerDocument;
			wisestamp_jquery('#wisestamp-menu, #wisestamp-control-signature-insertion').remove();
			var open = false;

			wisestamp_utils.send_request({command: 'get', type: "user_plan"}, function(add_go_pro) {
				wisestamp_utils.send_request({command: 'load_param', param: ['enabled']}, function(reply) {
					if(wisestamp.sys.platform === 'safari'){
						reply = JSON.parse(reply);
					}
					this_obj.enabled = reply.enabled;
					var menu_element = this_obj.get_wisestamp_compose_menu(this_obj.m_data, toolbar_doc, add_go_pro, wisestamp_editor_id);
					var menu_parent = wisestamp_jquery(toolbar_doc).find('body');
					menu_parent.append(menu_element);

					menu_element.show();
					var pos = element.offset();
					menu_element.css({
						'display':		'block',
						'position':		'absolute',
						'z-index':		'9999'
					});

					switch (this_obj.m_menu_direction) {
						case "top":
							menu_element.css({
								'top':			pos.top - menu_element.height() - 35
							});
							if ((wisestamp_jquery('html').attr('dir') === 'rtl') || (wisestamp_jquery('body').attr('dir') === 'rtl')) {
								menu_element.css({
									'left':			pos.left + element.width() - 65
								});
							} else {
								menu_element.css({
									'left':			pos.left - menu_element.width() + element.width() + 37
								});
							}
							break;

						case "right":
							menu_element.css({
								'top':			pos.top + element.height() - 50,
								'left':			pos.left + 34
							});
							break;

						case "bottom":
							menu_element.css({
								'top':			pos.top + 31
							});
							if ((wisestamp_jquery('html').attr('dir') === 'rtl') || (wisestamp_jquery('body').attr('dir') === 'rtl')) {
								menu_element.css({
									'left':			pos.left + element.width() - 65
								});
							} else {
								menu_element.css({
									'left':			pos.left - menu_element.width() + element.width() + 37
								});
							}
							break;
					}

					wisestamp_utils.setTimeout(function() {
						open = true;
					}, 500);
					var close_menu_and_unbind = function() {
						menu_element.remove();
						open = false;
						wisestamp_ui.remove_event_recursively(document, '.wisestamp-compose-menu');
						this_obj.close_wisestamp_menu_event('.wisestamp-compose-menu', undefined);
					};
					var click_event = function(e) {
						if (
							open &&
							!wisestamp_jquery(e.target).hasClass('wisestamp-always-do') &&
							!wisestamp_jquery(e.target).hasClass('wisestamp-always-do-label')
						){
							close_menu_and_unbind();
						}
					};
					wisestamp_ui.add_event_recursively(document, 'click.wisestamp-compose-menu', click_event);
					wisestamp_ui.add_event_recursively(document, 'keyup.wisestamp-compose-menu', function(e) {
						if (e.keyCode === 27) {
							close_menu_and_unbind();
						}
					});
					this_obj.close_wisestamp_menu_event('click.wisestamp-compose-menu', click_event);
				});
			});
		};

		this.add_always_do_button = function(menu){
		  // TODO: this function is on hold right now.
      /*
			var wrapper = wisestamp_jquery('<div class="wisestamp-always-do-wrapper" style="margin: 20px 30px;"></div>');
			var checkbox = wisestamp_jquery('<input type="checkbox" id="wisestamp-always-do" class="wisestamp-always-do"/>');
			var checkbox_text = wisestamp_jquery('<label for="wisestamp-always-do" class="wisestamp-always-do-label">&nbsp;&nbsp;Always do this for this email</label>');
			var pseudo_style = `
        <style>
            .wisestamp-always-do + label:before {background: url(${wisestamp_utils.get_url('content/img/checkbox_unchecked.png', true)});}
            .wisestamp-always-do:checked + label:before {background: url(${wisestamp_utils.get_url('content/img/checkbox_checked.png', true)});}
			  </style>`;
			wrapper.append(checkbox);
			wrapper.append(checkbox_text);
			menu.append(pseudo_style);
			menu.append(wrapper);
			*/
		};

		this.add_menu_bottom_footer = function(menu, add_go_pro){

			var footer = wisestamp_jquery('<div class="wisestamp-menu-bottom-footer"></div>');
			var links = wisestamp_jquery('<div style="float: left;"></div>');


			this_obj.add_footer_link(links, {
				'label': 'Edit Signature',
				'command': function(){
					this_obj.open_link(wisestamp.config.urls.website.editor, 'compose', 'edit_signature');
				}
			});

			this_obj.add_footer_link(links, {
				'label': 'Signature insertion settings',
				'command': function(){
					this_obj.open_link(wisestamp.config.urls.website.signature_settings, 'compose', 'manage_signature_insertion');
				}
			});

			if (add_go_pro) {
				this_obj.add_footer_link(links, {
					'label': 'Upgrade',
					'command': function(){
						this_obj.open_link(this_obj.urls.upgrade_url, 'compose', 'upgrade_compose', 'upgrade_compose');
					}
				});
			}

			footer.append(links);
			footer.append('<div style="clear: both;"></div>');
			menu.append(footer);

		};

		this.add_footer_link = function(wrapper, parameters){
			var link = wisestamp_jquery(`<div class="wisestamp-footer-link-wrapper"><span class="arrow-menu-link">&gt;</span>${parameters['label']}</div>`);

			link.hover(
				function(){wisestamp_jquery(this).css({'color': '#333'})},
				function(){wisestamp_jquery(this).css({'color': '#1CB7EB'})}
			);

			link.click(parameters['command']);
			wrapper.append(link);
		};

		this.add_menu_top_header = function(menu, parameters){
			var header = wisestamp_jquery('<div class="wisestamp-menu-top-header"></div>');
			var header_text = wisestamp_jquery(`<span>${parameters['label']}</span>`);
      header.append(header_text);
			menu.append(header);
		};

		this.add_menu_item = function(menu, parameters, wisestamp_editor_id) {
			menu.append(this_obj.create_menu_item(parameters, false, wisestamp_editor_id));
		};

		this.new_frames_found = function(body) {
			if (_super.new_frames_found(body)) {
				return true;
			}

			if (typeof body === 'undefined') {
				body = wisestamp_jquery;
			}

			var new_frames_count = wisestamp_jquery(body.find(selectors.insert_neighbour_ancestor.join(', '))).length;
			var result = false;
			if (new_frames_count > frames_count) {
				result = true;
			}

			frames_count = new_frames_count;
			return result;
		};

		/**
		 * @param parmeters = {
		 * 	id: String, menu item element ID
		 *  name: String, a unique name for radio items of the same group
		 * 	type: String, menu item type (radio, button, etc)
		 * 	label: String, menu item text
		 * 	command: Function, function to be executed on click
		 * 	disabled: Boolean
		 *  imageURI: String, menu item icon
		 * 	class_name: String, CSS class name
		 * }
		 *
		 * @return XUL/HTML element, depending on is_xul
		 */
		this.create_menu_item = function(parameters, is_xul, wisestamp_editor_id) {
			var menu_item, action_type;
			var is_selected_signature = this_obj.is_selected_signature(parameters, wisestamp_editor_id);

			if (is_xul) { // xul-specific
				menu_item = wisestamp_jquery('<menuitem />');

				menu_item.attr("type", parameters.type);
				menu_item.attr("label", parameters.label);

				action_type = "command";

				if (is_selected_signature) {
					menu_item.attr("checked", true);
				} else {
					if (typeof parameters.imageURI === "string") {
						menu_item.attr('image', parameters.imageURI);
					}
				}
			} else { // web-specific
				menu_item = wisestamp_jquery('<div class="wisestamp-menu-item"></div>');

				var menu_item_inner = wisestamp_jquery(`<div class="wisestamp-signature-switch ${(is_selected_signature ? 'signature-active' : '')}"></div>`);
				menu_item_inner.html(parameters.label);

				action_type = "click";

				if (is_selected_signature) {
					menu_item_inner.css({'background-image': `url("${wisestamp_utils.get_url('content/img/checkbox.png', true)}")`});
				} else {
					if (typeof parameters.imageURI === "string") {
						menu_item_inner.css({'background-image': `url("${parameters.imageURI}")`});
					}
				}

				menu_item.css({
					'cursor': ((typeof(parameters.command) === "function") ? 'pointer' : 'default'),
					'color': (((typeof(parameters['text-color']) === "string") && (!is_selected_signature)) ? parameters['text-color'] : '#333'),
					'background-color': ((typeof(parameters['background-color']) === "string") ? parameters['background-color'] : 'white'),
					'text-decoration': ((typeof(parameters['text-decoration']) === "string") ? parameters['text-decoration'] : 'none'),
				});

				if (typeof(parameters['text-align']) === "string") {
					menu_item_inner.css({
						'text-align': parameters['text-align']
					});
				}

				if (typeof(parameters['background-color-hover']) === "string") {
					menu_item_inner.hover(
						function() {wisestamp_jquery(this).css('background-color', parameters['background-color-hover']);},
						function() {wisestamp_jquery(this).css('background-color', ((typeof(parameters['background-color']) === "string") ? parameters['background-color'] : 'white'));}
					);
				}

				if(parameters['name'] === 'switch-signature' || parameters['name'] === 'add-another-signature'){
					menu_item_inner.hover(
						function(){
							if (!wisestamp_jquery(this).hasClass('signature-active')) {
								wisestamp_jquery(this).css({'background-image': `url("${wisestamp_utils.get_url('content/img/checkbox.png', true)}")`});
								wisestamp_jquery('.signature-active').css({'background-image': `url("${wisestamp_utils.get_url('content/img/checkbox_empty.png', true)}")`});
							}
						},
						function() {
							if (!wisestamp_jquery(this).hasClass('signature-active')) {
								wisestamp_jquery(this).css({'background-image': `url("${wisestamp_utils.get_url('content/img/checkbox_empty.png', true)}")`});
								wisestamp_jquery('.signature-active').css({'background-image': `url("${wisestamp_utils.get_url('content/img/checkbox.png', true)}")`});
							}
						}
					);
				}

				if(parameters['name'] === 'add-another-signature'){
					menu_item_inner.append('<span style="position: relative; bottom: 1px; left: 5px; font-size: 10px; background: #FF6009; padding: 2px 5px; border-radius: 2px; color: #fff;">PRO</span>');
				}

				menu_item.append(menu_item_inner);
			}

			if (typeof parameters.disabled === "boolean") {
				menu_item.attr("disabled", parameters.disabled);
			}

			if (typeof parameters.command === "function") {
				menu_item.bind(action_type, parameters.command);
			}

			if (typeof parameters.class_name === "string") {
				menu_item.attr("class", parameters.class_name);
			}

			if (typeof parameters.id === "string") {
				menu_item.attr("id", parameters.id);
			}

			return menu_item[0];
		};

		this.is_selected_signature = function(parameters, wisestamp_editor_id) {
			if ((!(typeof(parameters.type) === 'undefined')) && (!(typeof(parameters.id) === 'undefined')) && (parameters.type.toString() === "radio") && (parameters.id.toString() !== '') && (!(typeof(wisestamp_editor_id) === 'undefined')) && (!(typeof(this_obj.m_last_signature_dict[wisestamp_editor_id]) === 'undefined')) && (parameters.id.toString() === this_obj.m_last_signature_dict[wisestamp_editor_id].toString())) {
				return true;
			}

			return false;
		};

		this.get_signature_id = function(wisestamp_editor_id) {
			return this_obj.m_last_signature_dict[wisestamp_editor_id];
		};

		this.get_editor_parent_div = function(editor) {
			var $editor = wisestamp_jquery(editor);
			var editor_frame_element = $editor[0].ownerDocument.defaultView.frameElement;
			var editor_parent_div = ((editor_frame_element === null) ? $editor : wisestamp_jquery(editor_frame_element)).parents(selectors.editor_parent_div.join(', '));
			return editor_parent_div;
		};

		this.update_wisestamp_top_image = function() {
			if ((wisestamp_jquery('#wisestamp-top').length === 1) && (wisestamp_jquery('#wisestamp-top img.wisestamp-top-img').length === 1)) {
				if (wisestamp_utils.is_logged_in(this_obj.wisestamp_uid)) {
					if (this_obj.m_news_notifications == null || this_obj.m_news_notifications.length == 0) {
						if (this_obj.m_upgrade_promo_notifications == null || this_obj.m_upgrade_promo_notifications.length == 0) {
							if (this_obj.enabled) {
								wisestamp_jquery('#wisestamp-top img.wisestamp-top-img').attr('src', wisestamp_utils.get_url('content/img/wisestamp_top_icon.png', true));
							} else {
								wisestamp_jquery('#wisestamp-top img.wisestamp-top-img').attr('src', wisestamp_utils.get_url('content/img/wisestamp_top_disabled_icon.png', true));
							}
						} else {
							var items = this_obj.m_upgrade_promo_notifications;
							(function(items) {
								if (items.length === 0) {
									return;
								}

								var item = items[0];

								// notification type is mandatory!!!
								if (item.type !== 'upgrade-promo') {
									return;
								}

								if (this_obj.enabled) {
									if ((item["ws:enabled-top-icon-src"]) && (item["ws:enabled-top-icon-src"].length > 0)) {
										wisestamp_jquery('#wisestamp-top img.wisestamp-top-img').attr('src', item["ws:enabled-top-icon-src"]);
									}
								} else {
									if ((item["ws:disabled-top-icon-src"]) && (item["ws:disabled-top-icon-src"].length > 0)) {
										wisestamp_jquery('#wisestamp-top img.wisestamp-top-img').attr('src', item["ws:disabled-top-icon-src"]);
									}
								}
							})(items);
						}
					} else {
						if (this_obj.enabled) {
							wisestamp_jquery('#wisestamp-top img.wisestamp-top-img').attr('src', wisestamp_utils.get_url('content/img/wisestamp_top_icon_news.png', true));
						} else {
							wisestamp_jquery('#wisestamp-top img.wisestamp-top-img').attr('src', wisestamp_utils.get_url('content/img/wisestamp_top_disabled_icon_news.png', true));
						}
					}
				} else {
					if (this_obj.enabled) {
						wisestamp_jquery('#wisestamp-top img.wisestamp-top-img').attr('src', wisestamp_utils.get_url('content/img/wisestamp_top_icon_not_logged_in.png', true));
					} else {
						wisestamp_jquery('#wisestamp-top img.wisestamp-top-img').attr('src', wisestamp_utils.get_url('content/img/wisestamp_top_disabled_icon_not_logged_in.png', true));
					}
				}
			}
		};

		this.update_all_promos = function() {
			this_obj.get_editor(document, function(editor) {
				if ((!(editor === null)) && (typeof(editor) === "object") && (editor.length > 0)) {
					this_obj.update_promo(editor[0], false);
				}
			});
		};

		this.update_promo = function(editor, always_update_promo) {
			if (!(typeof(editor) === 'undefined')) {
				var $editor = wisestamp_jquery(editor);
				var promo_element = $editor.find('div[href="http://WS_promo"]');
				if (promo_element.length >= 1) {
					var one_to_recipient = false;
					var recipient_name_is_known = false;
					var recipient_email;
					var recipient_name;
					var editor_parent_div = this_obj.get_editor_parent_div(editor);
					var recipients_table = editor_parent_div.find(selectors.recipients_table.join(', '));
					var total_recipients_email_elements = recipients_table.find(selectors.total_recipients_email_elements.join(', '));
					var to_recipients_email_elements = recipients_table.find(selectors.to_recipients_email_elements.join(', '));
					var to_recipients_name_elements = to_recipients_email_elements.find(selectors.to_recipients_name_elements.join(', '));
					if ((total_recipients_email_elements.length === 1) && (to_recipients_email_elements.length === 1) && (to_recipients_name_elements.length === 1)) {
						recipient_email = to_recipients_email_elements.attr(selectors.recipient_email_attr);
						recipient_name = to_recipients_name_elements.text();
						recipient_name = wisestamp_utils.trim_recipient_name(recipient_name);
						if ((typeof(recipient_name) === "string") && (recipient_name.length > 0) && (!(recipient_name.indexOf("@") >= 0))) {
							recipient_name_is_known = true;
						}
						recipient_email = wisestamp_utils.trim_recipient_email(recipient_email);
						if ((typeof(recipient_email) === "string") && (recipient_email.length > 0)) {
							if (wisestamp_utils.validate_email(recipient_email)) {
								one_to_recipient = true;
							}
						}
					}
					this_obj.handle_update_promo(always_update_promo, $editor, promo_element, one_to_recipient, recipient_name_is_known, recipient_email, recipient_name);
				}
			}
		};

		this.add_edit_signature_label = function() {
			wisestamp_utils.log("[wisestamp_content_gmail::add_edit_signature_label] >>>>>");

			if (wisestamp_jquery('#wisestamp-edit-signature-label').length > 0) {
				wisestamp_utils.log("[wisestamp_content_gmail::add_edit_signature_label] Already added. <<<<<");
				return;
			}

			var labels_parent_element = wisestamp_ui.find_element_recursively(selectors.labels_parent_element.join(', '), document);
			var trash_label_element = wisestamp_ui.find_element_recursively(selectors.trash_label_element.join(', '), document);

			if ((labels_parent_element === null) || (!(labels_parent_element.length === 1))) {
				wisestamp_utils.log("[wisestamp_content_gmail::add_edit_signature_label] Didn't find labels parent element. <<<<<");
				return;
			}

			if ((trash_label_element === null) || (!(trash_label_element.length === 1))) {
				wisestamp_utils.log("[wisestamp_content_gmail::add_edit_signature_label] Didn't find trash label element. <<<<<");
				return;
			}

			wisestamp_utils.log("[wisestamp_content_gmail::add_edit_signature_label] Adding label...");
			labels_parent_element.each(function() {
				var _$_this = wisestamp_jquery(this);
				var edit_signature_label = trash_label_element.clone();
				edit_signature_label.attr("id", "wisestamp-edit-signature-label");
				var edit_signature_div = edit_signature_label.find(selectors.trash_label_div.join(', '));
				edit_signature_div.hover(
					function() { wisestamp_jquery(this).addClass(selectors.edit_signature_div_hover_class); },
					function() { wisestamp_jquery(this).removeClass(selectors.edit_signature_div_hover_class); }
				);
				var edit_signature_link = edit_signature_label.find(selectors.trash_label_link.join(', '));
				edit_signature_link.attr("href", wisestamp.config.urls.website.editor); // Only for display purposes.
				edit_signature_link.attr("target", "_blank");
				edit_signature_link.attr("title", "Edit your signature");
				edit_signature_link.html(`Signature<img style="vertical-align: middle; margin-left: 5px; margin-right: 5px;" src="${wisestamp_utils.get_url('content/img/gmail_menu_icon.png', true)}" />`);
				var click_event = function(event) {
					this_obj.open_link(this_obj.urls.edit_signature_label_click_url, 'edit_signature_label', 'edit_signature');
					event.stopImmediatePropagation();
					event.stopPropagation();
					return false;
				};
				edit_signature_label.click(click_event);
				edit_signature_link.click(click_event);
				_$_this.append(edit_signature_label);
			});
			wisestamp_utils.log("[wisestamp_content_gmail::add_edit_signature_label] Added label. <<<<<");
		};

		/** Class function */
		var _super = null;
		this.set_super = function(p) {
			_super = p;
			_super.construct(this);
		}
	};

	wisestamp_content_gmail.prototype = wisestamp_obj_web;
	var wisestamp_obj_gmail = new wisestamp_content_gmail();
	wisestamp_obj_gmail.set_super(wisestamp_obj_web);
	wisestamp_obj_gmail.init();
	wisestamp_content = wisestamp_obj_gmail;

}

