var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var players = await db.query("SELECT * FROM PLAYER");
    res.json(players.rows);
}