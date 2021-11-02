const { Client } = require('pg');

class DB {
  constructor() {
  	this.client = new Client({
      connectionString: process.env.DATABASE_URL,
  	  ssl: { rejectUnauthorized: false }
	  });
	  this.client.connect();
  }

  async query(query,params) {
  	try {
      return await this.client.query(query,params);
    }
    catch (e) {
      console.log(e.message);
    }
  }

  async end() {
  	await this.client.end();
  }
}

module.exports = DB;