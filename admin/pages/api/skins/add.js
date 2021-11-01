var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var { skin_url } = req.body;
    await db.query("INSERT INTO SKINS (SKIN_URL) VALUES ($1)", [skin_url]);
    res.end();
}