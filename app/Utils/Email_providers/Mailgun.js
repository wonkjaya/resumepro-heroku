'use strict'
const Env = use('Env');

class Mailgun {
	
	constructor(key, domain){
		this.key = (key)?key:null;
		this.domain = (domain)?domain:null;
	}

	* testSubject() {
	    return 'Email Test'
	}
	
	* testBody() {
	    return 'Congratulations...'
	}
	/**
   * Send email with mailgun
   *
   * @param {object} params
   */
  * sendmail (params) {
  	let apiKey = Env.get('MAILGUN-KEY','key-1392754c532c424e1f385d119347e296');
  	let domaindata = Env.get('MAILGUN-DOMAIN','sandboxc06500167bdb4db0a586052e9a3b4f04.mailgun.org');

    let mailgun = use('mailgun-js')({apiKey: apiKey, domain: domaindata})
    let data = {
      from: params.from ? params.from : 'admin@resumepro.com',
      to: params.to ? params.to : 'rohmanmail@gmail.com',
      subject: params.subject ? params.subject : 'this.testSubject',
      html: params.body ? params.body : 'this.testBody'
    }

    return new Promise((resolve, reject) => {
      mailgun.messages().send(data, function (error, body) {
        if(error) {
          reject(error.message)
          return false
        }
        resolve(body)
        return true
      })
    })
  }

}

module.exports = Mailgun;