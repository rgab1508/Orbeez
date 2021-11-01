var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var { player_id, name, mass, level, skin_id, lobby_id } = req.body;
    await db.query("UPDATE PLAYER SET name=$1, mass=$2, level=$3, skin_id=$4, lobby_id=$5 WHERE PLAYER_ID=$6", [name, mass, level, skin_id, lobby_id, player_id]);
    res.end();
}