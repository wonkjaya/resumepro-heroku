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
Route.get('/showtest', 'MainController.showtest');

Route.group('administration', function(){
	Route.get('/login.html', 'MainController.login'); // page
	Route.get('/logout.html', 'MainController.logout'); // backend
	
	Route.post('/forgot_password.html', 'MainController.forgot_password'); // backend
	Route.post('/login.html', 'MainController.login'); // backend
	Route.post('/register.html', 'MainController.register'); // backend
}).prefix('auth').middleware('url');

Route.group('service', function(){
	Route.get('/', function(req, res){
		res.send({"api":"service"});
	})
	Route.get('generate', 'GeneratorController.generate')
	Route.get('generate/save', 'GeneratorController.saveFile')
}).prefix('service')

Route.group('dashboard', function(){
	Route.get('/', 'DashboardController.index');
	Route.get('default.html', 'DashboardController.default');
	Route.get('users.html', 'DashboardController.users');
	Route.get('logs.html', 'DashboardController.logs');
}).prefix('dashboard').middleware('userauth').middleware('url');

Route.group('clients', function(){
	Route.get('/', 'ClientsController.main');
	Route.get('main.html', 'ClientsController.main');
	Route.get('my_profile.html', 'ClientsController.my_profile');
}).prefix('clients').middleware('userauth').middleware('url');

Route.any('*', function *(req, res){
	res.send({message :"url not found"});
})