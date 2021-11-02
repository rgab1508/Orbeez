var DB = require("../../../components/DB");
var db = new DB();

export default async function handler(req, res) {
  var lobbies = await db.query("SELECT * FROM LOBBY");
  var playerList = [];
  for (var lobby of lobbies.rows) {
    var players = await db.query("SELECT * FROM PLAYER WHERE LOBBY_ID=$1", [
      lobby.lobby_id,
    ]);
    playerList.push({
      ...lobby,
      players: players.rows,
    });
  }
  res.json(playerList);
}