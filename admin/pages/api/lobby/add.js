var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    await db.query("INSERT INTO LOBBY (LOBBY_ID) VALUES (default)");
    res.end();
}