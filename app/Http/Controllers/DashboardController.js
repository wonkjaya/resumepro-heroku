'use strict'

const Email = use('App/Utils/EmailBase');
const Lang = use('App/Http/Helpers/LanguageHelpers');
const MainHelper = use('App/Http/Helpers/MainHelpers');
const Model = use('App/Model/base');
const my_language = 'id';
const translate = new Lang(my_language).get_translate;
const Validator = use('Validator')
const validationRules = use('App/Http/Helpers/ValidationRules')

class DashboardController {

	* index(req, res){
		res.send({"api":"service", "current_token":req.token});
	}

	* default(req, res){
		var _this = {};
			_this.site_url = req.base_url;
			_this.menu = new MainHelper({'base_url':_this.site_url}).admin_menu(false);
			_this.lang = translate;
		yield res.sendView('dashboard/main', _this ); // harus menggunakan yield untuk merespon ke view
	}
}

module.exports = DashboardController
