'use strict'

class UserAuth {

  * handle (request, response, next) {
    // here goes your middleware logic
    // yield next to pass the request to next middleware or controller
    const token = yield request.session.get('user_session_token');
    request.token = token;
    if(token) 
    	yield next
    else
    	return response.redirect('/auth/login.html')
  }

}

module.exports = UserAuth
