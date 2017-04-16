'use strict'


class ServiceController {
	* generate(req, res){
		
		res.send("{}");
	}

	* saveFile(req, res){
		console.log(req.all())
		res.send({})
	}
}

module.exports = ServiceController
