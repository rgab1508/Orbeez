var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var skins = await db.query("SELECT * FROM SKINS");
    res.json(skins.rows);
}