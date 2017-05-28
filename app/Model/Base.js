'use strict'


class Base {

	constructor(modelName, constructor){
		var model = require('./childModels/'+modelName);
		this.modelname = new model(constructor);
	}

	execute(method, options){
		if(!method) return 'method required!';
		try {
			return this.modelname[method](options);
		}catch(e){
			return e;
		}
	}
}

module.exports = Base
