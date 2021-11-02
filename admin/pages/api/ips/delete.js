var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var { ip } = req.body;
    await db.query("DELETE FROM IPS WHERE IP=$1", [ip]);
    res.end();
}