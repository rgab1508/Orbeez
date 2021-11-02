var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var { name, description, skin_url } = req.body;
    await db.query("INSERT INTO SKINS (NAME, DESCRIPTION, SKIN_URL) VALUES ($1, $2, $3)", [name, description, skin_url]);
    res.end();
}