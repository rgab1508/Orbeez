var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var { skin_id } = req.body;
    await db.query("DELETE FROM SKINS WHERE SKIN_ID=$1", [skin_id]);
    res.end();
}