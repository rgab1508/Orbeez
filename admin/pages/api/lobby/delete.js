var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var { lobby_id } = req.body;
    await db.query("DELETE FROM LOBBY WHERE LOBBY_ID=$1", [lobby_id]);
    res.end();
}