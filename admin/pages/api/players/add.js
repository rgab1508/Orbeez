var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var { name, mass, level, skin_id, lobby_id } = req.body;
    await db.query("INSERT INTO PLAYER (name, mass, level, skin_id, lobby_id) VALUES ($1, $2, $3, $4, $5)", [name, mass, level, skin_id, lobby_id]);
    res.end();
}