var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var ips = await db.query("SELECT * FROM IPS");
    res.json(ips.rows);
}