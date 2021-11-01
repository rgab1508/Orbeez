var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var { player_id } = req.body;
    await db.query("DELETE FROM PLAYER WHERE PLAYER_ID=$1", [player_id]);
    res.end();
}