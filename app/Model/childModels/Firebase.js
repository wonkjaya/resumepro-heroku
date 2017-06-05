'use strict'

const FireLib = use('AdminFirebase')
const config = require('./resumepro-1b09a0fa5b0e.json');

const shortid = require('shortid');
const App= FireLib.initializeApp({
  credential: FireLib.credential.cert(config),
  databaseURL: "https://cvmaker-c3d36.firebaseio.com"
});
const Moment = use('moment');

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
		var ref = this.database.ref(collection).child(data.id)
	  return ref.set(data);
	}

	show(collection, creteria, callback){ // criteria -> json in array [{},{},{},...]
		var refs = this.database.ref(`${collection}`);
			// if(criteria.order) refs.orderByKey('')
			refs.once('value').then(function(data){
				return callback(null, data.toJSON())
			});
	}

	getById(collection, Id, cb){
		this.database
			.ref(`${collection}/${Id}`)
			.on('value', function(data){
				return cb(data)
			})
	}

	update(collection, criteria, data, callback){ // criteria: array, data:object
		var ref = this.database.ref(collection).push()
		return callback(null, ref.update(data));
	}

// END BASE CRUD FUNCTIONS

	get_email_logs(options){
		return new Promise((resolve, reject) => {
			this.show('email_logs', options, function(e, body){
				if(body !== null) {
					var d = [];
					for(var key in body){
						body[key].time = Moment(body[key].time).format('DD-MM-YYYY HH:mm:ss');
						body[key].index_data = key;
						d.push(body[key])
					}
					return resolve(d)
				}else{
					return resolve({status:404})
				}
			});
		});
	}

	get_users(options){
		return new Promise((resolve, reject) => {
			this.show('users', options, function(e, body){
				if(body !== null) {
					var d = [];
					for(var key in body){
						body[key].created_At = Moment(body[key].created_At).format('DD-MM-YYYY');
						body[key].index_data = key;
						d.push(body[key])
					}
					return resolve(d)
				}else{
					return resolve({status:404})
				}
			});
		});
	}

	login_user(options){
		if(!options.data) return 'data not defined';
		try{
			let email = (options.data.email).replace(/\./g, '').replace('@','');
			return new Promise((resolve, reject) => {
				this.getById('users', email, function(body){
					if(body.child('password').val() !== null) return resolve({'status':200, 'data':body.toJSON()})
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
			var id = (options.data.email)?(options.data.email).replace(/\./g, '').replace('@','') : new Date().getTime();
			options.data.id = id
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
