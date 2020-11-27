const pg = require("pg");
const dbCredentials = process.env.DATABASE_URL || require("../localenv").credentials;

class StorageHandler {

    constructor(credentials) {
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }

    //  create new user

    async placeAccIntoDb(username, password) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('SELECT username from "users" where username=$1', [username]);
            const nameCheck = results.rows.find(element => element = username);
            
            if(nameCheck !== undefined){
                results = null;
                client.end();
            }else{
                results = await client.query('INSERT INTO "public"."users"("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);
                results = results.rows[0].message;
                client.end();
            }
        } catch (err) {
            console.log(err);
            results = err;
            client.end();
        }

        return results;
    }

    //  login user

    async getUserFromDb(username, password){
        const client = new pg.Client(this.credentials);
        let results = null;
        try{
            await client.connect();
            results = await client.query('SELECT * FROM "public"."users" WHERE username=$1 AND password=$2', [username, password]);
            results = (results.rows.length > 0) ? results.rows[0]:null;
            client.end();
        }catch(err){
            console.log(err);
        }

        return results;        
    }

    // create presentation

    title = "title test";
    tId =  "task id";

    async placeTskIntoDb(title, tId) {

        const client = new pg.Client(this.credentials);
        let results = null;

        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."tasks"("task_id","task_title") VALUES($1,$2) RETURNING *;', [task_id, task_title]);
            results = results.rows[0];
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;

    }

    async getTaskDataFromDb(user_id){

        const client = new pg.Client(this.credentials);
        let results = null;

        try {
            await client.connect();
            results = await client.query('SELECT * FROM "public"."tasks" WHERE owner=$1', [user_id]);
            results = results.rows;
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;

    }



}

module.exports = new StorageHandler(dbCredentials);