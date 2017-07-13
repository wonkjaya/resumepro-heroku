'use strict'

class Url {

  * handle (request, response, next) {
    // here goes your middleware logic
    // yield next to pass the request to next middleware or controller
    request.base_url = (request.secure()?'https://':'http://')+(request.headers().host);
    // console.log(request.base_url)
    yield next
  }

}

module.exports = Url
