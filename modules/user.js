const database = require("./database")

const kryptering = require('./taskplannercipher');
const secret = process.env.hashSecret || require("../localenv").hashSecret;

class User {

    constructor(username, password) {
        this.username = username;
        this.password = kryptering.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        this.isValid = false;

    }

    async create() {
        try {
            let resp = await database.insertUser(this.username, this.password);
            return resp;
        } catch (error) {
            console.error(error)
        }
    }

    async authenticate() {
        let success = false;
        try {
            let res = await database.selectUser(this.username, this.password);

            if (res != null) {
                this.isValid = true;
                success = true;
            }
        } catch (err) {
            console.log(err);
        }
        return success;
    }

}

module.exports = User;