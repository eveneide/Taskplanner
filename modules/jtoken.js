const crypto = require('crypto');

let secToken = require('../localenv').keysecret



function makeToken(payload){
let header = {
    "alg": "HS256",
    "typ": "JWT"
  }
  let encheader = encode(header)
  let encpayload = encode(payload)

  let sign = crypto.createHmac('sha256', secToken)
  .update(encheader + "." + encpayload, "utf-8")
  .digest('base64')

  let encsign = encode(sign)
  let token = encheader + "." + encpayload + "." + encsign
  return token
}

function encode(data){
let buff = Buffer.from(JSON.stringify (data, 'utf-8'));
let base64data = buff.toString("base64").replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
return base64data;

}

function valToken(token){
    let infoarray = token.split(".")
    let sign = crypto.createHmac('sha256', secToken)
  .update(infoarray[0] + "." + infoarray[1], "utf-8")
  .digest('base64')

  let encsign = encode(sign)
  if(encsign===infoarray[2]){
      return true
  }
  else {
      return false
  }
}

function getPayload (token){
    let encpayload = token.split(".")[1]
    let buff = Buffer.from(encpayload, 'base64');
    let payload = JSON.parse(buff.toString('utf-8'));
    return payload
}


let token = makeToken(payload);
let pl = getPayload(token)
console.log(pl)

module.exports= {
    makeToken,
    getPayload,
    valToken
};