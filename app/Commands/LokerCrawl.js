'use strict'

const Command = use('Command')
const DummyController = use('App/Http/Controllers/DummyController')

class LokerCrawl extends Command {

  get signature () {
    return 'LokerCrawl {service} {--limit=@value} {--interval=@value}'
  }

  get description () {
    return 'Tell something helpful about this command'
  }

  * handle (args, options) {
  	try{
  		var Dummy = new DummyController(options);
  		var service = Dummy[args.service]();
  	}catch(e){
  		console.log(e)
  	}
  }

}

module.exports = LokerCrawl
