var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
    var { ip, isBanned, level } = req.body;
    await db.query("UPDATE IPS SET ISBANNED=$1, LEVEL=$2 WHERE IP=$3", [isBanned, level, ip]);
    res.end();
}