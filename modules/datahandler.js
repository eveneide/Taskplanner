const pg = require('pg');
const dbcredentials = process.env.credentials || require('../localenv').credentials;


class StorageHandler {
    constructor(credentials) {
        this.credentials = {
            connectionString: credentials, 
            ssl: {
                rejectUnauthorized: false
            }
        };
    }


    async aqPassword(username) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('select password from "public"."users" where username = $1;', [username]);
            return results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }
    }

    async valUser(username) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('select * from "public"."users" where username = $1;', [username]);
            return results.rows.length !== 0;
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }
    }

    async placeAccIntoDb(username, password) {
        let userExists = await this.valUser(username);
        console.log(userExists);
        if (userExists) {
            console.log(1);
            return false;

        } else {
            console.log(2);
            const client = new pg.Client(this.credentials);
            let results = null;
            try {
                await client.connect();
                results = await client.query('INSERT INTO "public"."users" ("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);
                client.end();
            } catch (err) {
                client.end();
                console.log(err);
                results = err;
            }

            return results;
        }

    }

}

module.exports = new StorageHandler(dbcredentials); 