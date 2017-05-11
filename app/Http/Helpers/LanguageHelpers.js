'use strict'

var CTX={}

class LanguageHelpers {
	
	constructor(lang){
		CTX.translate_to = lang;
	}

	get_translate(index){
		if(index.length > 0){
			var dictionary = use(`App/Http/Helpers/languages/${CTX.translate_to}`);
			try{
				return dictionary[index];
			}catch(err){
				console.log(err);
				return 'ERRDICT';
			}
		}else{
			return 'ERRTRANS';
		}
	}
}

module.exports = LanguageHelpers;