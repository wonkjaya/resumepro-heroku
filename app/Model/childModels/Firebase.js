'use strict'

const FireLib = use('AdminFirebase')
const config = require('./resumepro-1b09a0fa5b0e.json');
const shortid = require('shortid');
const App= FireLib.initializeApp({
  credential: FireLib.credential.cert(config),
  databaseURL: "https://cvmaker-c3d36.firebaseio.com"
});

class Firebase {
	constructor(){
		// console.log(this.app)
		if(!this.config) this.config = config;
		if(!this.auth) {
			this.auth = App.auth();
			this.database = App.database();
		}
	}
// BASE CRUD FUNCTIONS

	insert(collection, data) {
		data._id = shortid.generate();
		var id = (data.email)?(data.email).replace(/\./g, '').replace('@',''):new Date().getTime();
		var ref = this.database.ref(collection).child(id)
	  return ref.set(data);
	}

	show(collection, creteria, callback){ // criteria -> json in array [{},{},{},...]
		this.database
			.ref(`${collection}`)
			.orderByChild('email')
			.equalTo('rohmanmail@gmail.com')
			.on('value', function(data){
			// return callback(null, data);
			console.log(data)
		})
	}

	getById(collection, Id, cb){
		this.database
			.ref(`${collection}/${Id}`)
			.on('value', function(data){
				console.log(data.child('_id').val())
				return cb(data)
			})
	}

	update(collection, criteria, data, callback){ // criteria: array, data:object
		var ref = this.database.ref(collection).push()
		return callback(null, ref.update(data));
	}

// END BASE CRUD FUNCTIONS

	login_user(options){
		if(!options.data) return 'data not defined';
		try{
			let email = (options.data.email).replace(/\./g, '').replace('@','');
			return new Promise((resolve, reject) => {
				this.getById('users', email, function(body){
					console.log(body.child('_id').val())
					if(body.child('password').val() !== null) return resolve({status:200, password:body.child('password').val()})
						else
							return resolve({status:404})
				});
			});
		}catch(e){
			return e
		}
	}

	registering_user(options){
		if(!options.data) return 'data not defined';
		try{
			this.insert('users', options.data);
		}catch(e){
			return e
		}
		return 'success'
	}

	email_logs(options){
		if(!options.data) return 'data not defined';
		try{
			this.insert('email_logs', options.data);
		}catch(e){
			return e
		}
		return 'success'
	}

	forgot_password(options){
		if(!options.data.email) return 'data not defined';
		try{
			let email = (options.data.email).replace(/\./g, '').replace('@','');
			return new Promise((resolve, reject) => {
				this.getById('users', email, function(body){
					console.log(body.child('_id').val())
					if(body.child('_id').val() !== null) resolve({status:200, id:body.child('_id').val()})
						else
							resolve({status:404})
			        return true
				});
		    });
		}catch(e){
			return e
		}
	}

}

module.exports = Firebase
