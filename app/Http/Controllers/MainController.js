'use strict'

const MainHelper = use('App/Http/Helpers/MainHelpers');
const Lang = use('App/Http/Helpers/LanguageHelpers');
const SiteURL = new MainHelper().get_host();
const my_language = 'id';

class MainController {

	/*constructor(){
		this.site_url = SiteURL;
	}*/

	* index(req, res){
		var _this = {};
			_this.site_url = SiteURL;
			_this.menu = new MainHelper().menu();
			_this.templates = [
                        {'name':'Profesional Resume 1', 'image':'template-1.jpg', 'link':''},
                        {'name':'Profesional Resume 2', 'image':'template-2.jpg', 'link':''},
                        {'name':'Profesional Resume 3', 'image':'template-3.jpg', 'link':''},
                        {'name':'Profesional Resume 4', 'image':'template-4.jpg', 'link':''},
                        {'name':'Profesional Resume 5', 'image':'template-5.jpg', 'link':''},
                        {'name':'Profesional Resume 6', 'image':'template-6.jpg', 'link':''}
                    ];
		yield res.sendView('index', _this ); // harus menggunakan yield untuk merespon ke view
	}

	* login_page(req, res){
		var _this = {};
			_this.site_url = SiteURL;
			_this.menu = new MainHelper().menu(false);
			_this.lang = new Lang(my_language).get_translate;
		yield res.sendView('register_login_forgot', _this ); // harus menggunakan yield untuk merespon ke view
	}

	* login(req, res){

	}
}

module.exports = MainController
