const datahandler = require('./datahandler');
const valToken = require("./jtoken").valToken;

const authenticator = async (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end();
  }

  let user = {
    username: req.body.user,
    //password: '6179f1da72b2f5c466c25652eff2ebf46bca54c4a4d43ccc0ba120f8e56ddc92',
    isValid: true
  }

  let token = req.headers.authorization.split(' ')[1];

  let resp = valToken(token, user);
  //console.log(resp) //true or false token
  if (!resp) {
    return res.status(403).json("token invalid").end();
  }
  next();
}


//module.exports = authenticator