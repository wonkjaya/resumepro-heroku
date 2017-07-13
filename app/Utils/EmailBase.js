'use strict'

class EmailBase{
	constructor(providerName, constructor){
		var Email = require('./Email_providers/'+providerName);
		this.email_provider = new Email(constructor);
	}

	execute(method, options){
		if(!method) return 'method required!';
		try {
			return this.email_provider[method](options);
		}catch(e){
			return e;
		}
	}
}

module.exports = EmailBase