'use strict'

const MainHelper = use('App/Http/Helpers/MainHelpers');
const Lang = use('App/Http/Helpers/LanguageHelpers');
const my_language = 'id';
const SiteURL = new MainHelper().get_host();
const firebaseModel = use('App/Model/Firebase');
const Validator = use('Validator')

class MainController {

	/*constructor(){
		this.site_url = SiteURL;
	}*/

	* index(req, res){
		var _this = {};
			_this.site_url = SiteURL;
			_this.menu = new MainHelper().menu();
			_this.lang = new Lang(my_language).get_translate;
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

	* register(req, res){
		let data = req.only('email','fullname','phonenumber','password','conf_password');

	}



	* inserttest(req, res){

		var fire = new firebaseModel().main(req.all());

		res.end()
	}

	* showtest(req, res){
		var fire = new firebaseModel().show(function(e, r){
			res.send(r)
		});
	}

	* updatetest(req, res){
		var fire = new firebaseModel().updateData(function(e, r){
			res.send(r)
		});
	}
}

module.exports = MainController
