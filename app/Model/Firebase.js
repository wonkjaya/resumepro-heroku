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
		var id = (data.email).replace(/\./g, '').replace('@','');
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

	update(collection, criteria, data, callback){ // criteria: array, data:object
		var ref = this.database.ref(collection).push()
		return callback(null, ref.update(data));
	}

// END BASE CRUD FUNCTIONS

	main(data){
		console.log(data)
		this.insert('users', data);
	}

	show(callback){
		return callback(null, null)
		// this.show('users', {}, function(error, result){
		// 	return callback(error, result);
		// })
	}

	updateData(callback){
		var data = {
			'email':'rohmanahmad@gmail.com',
			'password':'kucingku'
		}
		this.update('users', [], data, function(e, r){
			return callback(e, r)
		})
		
	}
}

module.exports = Firebase
