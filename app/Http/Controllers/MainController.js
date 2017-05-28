'use strict'

const Email = use('App/Utils/EmailBase');
const Lang = use('App/Http/Helpers/LanguageHelpers');
const MainHelper = use('App/Http/Helpers/MainHelpers');
const Model = use('App/Model/base');
const my_language = 'id';
const SiteURL = new MainHelper().get_host();
const translate = new Lang(my_language).get_translate;
const Validator = use('Validator')
const validationRules = use('App/Http/Helpers/ValidationRules')

class MainController {

	/*constructor(){
		this.site_url = SiteURL;
	}*/

	* index(req, res){
		var _this = {};
			_this.site_url = SiteURL;
			_this.menu = new MainHelper().menu();// global declaration
			_this.lang = translate; // global declaration
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
			_this.login_panel = 'active';
			_this.menu = new MainHelper().menu(false);
			_this.lang = translate;
			_this.site_url = SiteURL;
		yield res.sendView('register_login_forgot', _this ); // harus menggunakan yield untuk merespon ke view
	}

	* login(req, res){
		
	}

	* register(req, res){
		const Hash = use('Hash')
		var _this = {};
			_this.validation = {};
			_this.register_panel = 'active';
			_this.menu = new MainHelper().menu(false);
			_this.lang = translate;
			_this.site_url = SiteURL;
		var data = req.only('email','fullname','phonenumber','password','conf_password');
		const messages = validationRules.validation_messages;
		const validation = yield Validator.validate(data, validationRules.user_registration, messages);
		// validation is failed
		if (validation.fails()) { 
	    	_this.validation.message = validation.messages()[0].message;
	     	_this.alert_type = 'danger';
	    }else{ // passed
			data = req.only('email','fullname','phonenumber','password');
	    	data.created_At = new Date().getTime();
	    	data.is_active = false; // belum aktif
	    	data.is_banned = false; // tidak terbanned
	    	data.phone_verification_code = (String(data.created_At)).substr(-6);
	    	data.phone_verified = false;
			data.password = yield Hash.make(data.password); // Hashing Password
		    var firebase = new Model('Firebase');
		    var exec = firebase.execute('registering_user', {data});
		    if(exec === 'success'){
		    	// sending email
		    	var mailgunEmail = new Email('Mailgun');
		    	var send = yield mailgunEmail.execute('sendmail', {});

		    	var logs = firebase.execute('email_logs', {
		    		'data':{
		    			'type':'sent',
		    			'time':new Date().getTime(),
		    			'to': data.email
		    		}
		    	});
		    	
		    	_this.validation.message = 'messages.registration.success';
		      	_this.alert_type = 'success';
		    }
	    }

		yield res.sendView('register_login_forgot', _this ); // harus menggunakan yield untuk merespon ke view
	}


// ------testing----------//
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
