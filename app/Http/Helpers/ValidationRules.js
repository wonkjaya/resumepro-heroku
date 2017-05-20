'use strict'

class ValidationRules{
	static get user_registration(){
		return {
			fullname : 'required',
			email : 'required',
			phonenumber : 'required',
			password :'required',
			conf_password : 'required|confirmed'
		}
	}
}

module.exports = ValidationRules