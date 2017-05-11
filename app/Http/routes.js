'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')


// Route.on('/').render('welcome')
Route.get('/', 'MainController.index');

Route.group('service', function(){
	Route.get('/', function(req, res){
		res.send("hello");
	})
	Route.get('generate', 'GeneratorController.generate')
	Route.get('generate/save', 'GeneratorController.saveFile')
}).prefix('service')

