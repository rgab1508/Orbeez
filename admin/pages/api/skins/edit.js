var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var { skin_id, skin_url } = req.body;
    await db.query("UPDATE SKINS SET SKIN_URL=$1 WHERE SKIN_ID=$2", [skin_url, skin_id]);
    res.end();
}