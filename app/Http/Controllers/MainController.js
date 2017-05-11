'use strict'

const MainHelper = use('App/Http/Helpers/MainHelpers');

class MainController {
	* index(req, res){
		var menu = new MainHelper().menu();
		yield res.sendView('index', {menu} ); // harus menggunakan yield untuk merespon ke view
	}
}

module.exports = MainController
