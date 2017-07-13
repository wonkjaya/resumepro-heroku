'use strict'

const Email = use('App/Utils/EmailBase');
const Lang = use('App/Http/Helpers/LanguageHelpers');
const MainHelper = use('App/Http/Helpers/MainHelpers');
const Model = use('App/Model/Base');
const my_language = 'id';
const translate = new Lang(my_language).get_translate;
const Validator = use('Validator')
const validationRules = use('App/Http/Helpers/ValidationRules')
const firebase = new Model('Firebase');

class DashboardController {

	* index(req, res){
		res.send({"api":"service", "current_token":req.token});
	}

	* default(req, res){
		var _this = {};
			_this.page_title= 'Dashboard'
			_this.site_url = req.base_url;
			_this.menu = new MainHelper({'base_url':_this.site_url}).admin_menu(false);
			_this.lang = translate;
			_this.content = 'dashboard';
		yield res.sendView('dashboard/main', _this ); // harus menggunakan yield untuk merespon ke view
	}

	* users(req, res){
		var _this = {};
			_this.page_title= 'Users'
			_this.site_url = req.base_url;
			_this.menu = new MainHelper({'base_url':_this.site_url}).admin_menu(false);
			_this.lang = translate;
			_this.content = 'users';
			_this.users_data = yield firebase.execute('get_users', {}); 
		yield res.sendView('dashboard/main', _this ); // harus menggunakan yield untuk merespon ke view
	}

	* logs(req, res){
		var _this = {};
			_this.page_title= 'Logs'
			_this.site_url = req.base_url;
			_this.menu = new MainHelper({'base_url':_this.site_url}).admin_menu(false);
			_this.lang = translate;
			_this.content = 'logs';
			_this.email_log_data = yield firebase.execute('get_email_logs', {}); 
		yield res.sendView('dashboard/main', _this ); // harus menggunakan yield untuk merespon ke view
	}
}

module.exports = DashboardController
