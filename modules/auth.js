const crypto = require('crypto');
const secret = process.env.keysecret || require('../localenv').keysecret;
const database = require("./datahandler");

const authenticator = async (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1) {
    return res.serverend("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end()
  }

  const credentials = req.headers.authorization.split(' ')[1];
  const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

  const user = await authenticate(username, password);

  if (user === false) {
    req.login = false;
  } else {
    req.login = true;
    req.username = username;
  }
  next();
}

async function authenticate(username, password) {
  let psw = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');

  let passwordDb = await database.aqPassword(username);


  if (psw === passwordDb.password) {

    return username;

  } else {

    return false;

  }

}

module.exports = authenticator