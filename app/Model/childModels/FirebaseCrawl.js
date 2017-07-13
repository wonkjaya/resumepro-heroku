'use strict'

const FireLib = use('AdminFirebase')
const config = require('./jobcrawl-9e431-firebase-adminsdk-eqlfj-b38807e5ef.json');

const shortid = require('shortid');
const App= FireLib.initializeApp({
  credential: FireLib.credential.cert(config),
  databaseURL: "https://jobcrawl-9e431.firebaseio.com"
});
const Moment = use('moment');

class FirebaseCrawl {
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

	upsert_job_crawl(data){
		this.insert('job_crawl', data)
	}

}

module.exports = FirebaseCrawl
