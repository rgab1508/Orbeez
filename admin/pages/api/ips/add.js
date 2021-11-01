var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var { ip, isBanned, level } = req.body;
    await db.query("INSERT INTO IPS (IP, ISBANNED, LEVEL) VALUES ($1, $2, $3)", [ip, isBanned, level]);
    res.end();
}