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
Route.post('insert', 'MainController.inserttest');
Route.get('show', 'MainController.showtest');
Route.get('update', 'MainController.updatetest');

Route.group('administration', function(){
	Route.get('/login.html', 'MainController.login_page'); // page
	Route.post('/login.html', 'MainController.login'); // backend
	Route.post('/register.html', 'MainController.register'); // backend
}).prefix('auth');

Route.group('service', function(){
	Route.get('/', function(req, res){
		res.send({"api":"service"});
	})
	Route.get('generate', 'GeneratorController.generate')
	Route.get('generate/save', 'GeneratorController.saveFile')
}).prefix('service')

Route.any('*', function *(req, res){
	res.send({message :"url not found"});
})