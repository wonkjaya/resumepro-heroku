'use strict'

const Email = use('App/Utils/EmailBase');
const Lang = use('App/Http/Helpers/LanguageHelpers');
const MainHelper = use('App/Http/Helpers/MainHelpers');
const Model = use('App/Model/base');
const my_language = 'id';
// const SiteURL = new MainHelper().get_host();
const translate = new Lang(my_language).get_translate;
const Validator = use('Validator')
const validationRules = use('App/Http/Helpers/ValidationRules')

class MainController {

	/*constructor(){
		this.site_url = SiteURL;
	}*/

	* index(req, res){
		var _this = {};
			_this.site_url = req.base_url;
			_this.menu = new MainHelper({'base_url':_this.site_url}).menu();// global declaration
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

	* login(req, res){
		var _this = {};
			_this.login_panel = 'active';
			_this.site_url = req.base_url;
			_this.menu = new MainHelper({'base_url':_this.site_url}).menu(false);
			_this.lang = translate;
			_this.validation = {};
		const Hash = use('Hash');
		const data = req.only('email','password');
		const messages = validationRules.validation_messages;
		const validation = yield Validator.validate(data, validationRules.user_login, messages);
		if (validation.fails()) { 
	    	_this.validation.message = validation.messages()[0].message;
	    }else{ // passed
			var firebase = new Model('Firebase');
			var exec = yield firebase.execute('login_user', {data});
			_this.validation.login = true;
			if(exec.status === 200){
				let is_same = yield Hash.verify(data.password, exec.data.password); // Verifying Password
				if (is_same) {
					if(!exec.data.is_active){
						console.log(exec.data)
						_this.validation.message ='messages.login.need_verification'
					}else if(exec.data.is_banned){
						_this.validation.message ='messages.login.banned'
					}else{
						console.log('pass')
						yield req.session.put('user_session_token', exec.data.password);
						var logs = firebase.execute('access_logs', {
				    		'data':{
				    			'type':'login',
				    			'time':new Date().getTime(),
				    			'to': data.email
				    		}
				    	});
				    	if(data.email === 'rohmanmail@gmail.com'){
							res.redirect('/dashboard/default.html') // khusus administrator aja
				    	}else{
				    		res.redirect('/clients/main.html')
				    	}
					}
				}
			}else{
				_this.validation.message ='messages.login.failed'	
			}
		}
     	_this.alert_type = 'danger';
		yield res.sendView('register_login_forgot', _this ); // harus menggunakan yield untuk merespon ke view
	}

	* logout(req, res){
		yield req.session.forget('user_session_token')
		res.redirect('/')
	}

	* register(req, res){
		const Hash = use('Hash')
		var _this = {};
			_this.validation = {};
			_this.register_panel = 'active';
			_this.site_url = req.base_url;
			_this.menu = new MainHelper({'base_url':_this.site_url}).menu(false);
			_this.lang = translate;
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
		    			'type':'sent_register',
		    			'time':new Date().getTime(),
		    			'to': data.email
		    		}
		    	});
		    	
		    	_this.validation.register = true;
		    	_this.validation.message = 'messages.registration.success';
		      	_this.alert_type = 'success';
		    }
	    }

		yield res.sendView('register_login_forgot', _this ); // harus menggunakan yield untuk merespon ke view
	}

	* forgot_password(req, res){
		var _this = {};
			_this.validation = {};
			_this.forgot_panel = 'active';
			_this.site_url = req.base_url;
			_this.menu = new MainHelper({'base_url':_this.site_url}).menu(false);
			_this.lang = translate;
		var data = req.only('email');
		const messages = validationRules.validation_messages;
		const validation = yield Validator.validate(data, validationRules.forgot_password, messages);
		var firebase = new Model('Firebase');
		var exec = yield firebase.execute('forgot_password', {data});
		if(exec.status === 200){
	    	// sending email
	    	var mailgunEmail = new Email('Mailgun');
	    	var send = yield mailgunEmail.execute('sendmail', {to:data.email, subject:'forgot password', body:'body of forgot password'});

	    	var logs = firebase.execute('email_logs', {
	    		'data':{
	    			'type':'sent_forgot',
	    			'time':new Date().getTime(),
	    			'to': data.email
	    		}
	    	});
	    	
	    	_this.validation.forgot = true;
	    	_this.validation.message = 'messages.forgot.success';
	      	_this.alert_type = 'success';
		}else{
	    	_this.validation.forgot = true;
	    	_this.validation.message = 'messages.forgot.notfound';
	      	_this.alert_type = 'warning';
		}
		yield res.sendView('register_login_forgot', _this ); // harus menggunakan yield untuk merespon ke view
	}

}

module.exports = MainController
