'use strict'

class ValidationRules{

	static get validation_messages(){
		return {
			required:'message.{{field}}.required',
			email:'message.email',
			min:'message.{{field}}.{{argument.0}}.minchar',
			same:'message.{{field}}.same',
		}
	}

	static get user_registration(){
		return {
			fullname : 'required',
			email : 'required|email',
			phonenumber : 'required',
			password :'required|min:6',
			conf_password : 'same:password'
		}
	}

	static get forgot_password(){
		return {
			email : 'required|email'
		}
	}

	static get user_login(){
		return {
			email : 'required|email',
			password :'required'
		}
	}
}

module.exports = ValidationRules