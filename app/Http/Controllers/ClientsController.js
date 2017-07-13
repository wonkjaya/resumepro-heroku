'use strict'

const Email = use('App/Utils/EmailBase');
const Lang = use('App/Http/Helpers/LanguageHelpers');
const MainHelper = use('App/Http/Helpers/MainHelpers');
const Model = use('App/Model/base');
const my_language = 'id';
const translate = new Lang(my_language).get_translate;
const Validator = use('Validator')
const validationRules = use('App/Http/Helpers/ValidationRules')
const firebase = new Model('Firebase');

class ClientsController {

	* main(req, res){
		var _this = {};
			_this.page_title= 'Dashboard'
			_this.site_url = req.base_url;
			_this.menu = new MainHelper({'base_url':_this.site_url}).client_menu(false);
			_this.lang = translate;
			_this.content = 'dashboard';
		yield res.sendView('clients/main', _this ); // harus menggunakan yield untuk merespon ke view
	}

	* my_profile(req, res){
		var _this = {};
			_this.page_title= 'My Profile'
			_this.site_url = req.base_url;
			_this.menu = new MainHelper({'base_url':_this.site_url}).client_menu(false);
			_this.lang = translate;
			_this.content = 'my_profile';
			_this.form_profile = new MainHelper().form_profile();
		yield res.sendView('clients/main', _this ); // harus menggunakan yield untuk merespon ke view
	}
}

module.exports = ClientsController
