var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var lobbies = await db.query("SELECT * FROM LOBBY");
    res.json(lobbies.rows);
}