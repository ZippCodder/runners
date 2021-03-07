const server = require("./index.js").server;
const io = require("socket.io")(server);

const PLAYERS = {};
const IDS = {};

io.on("connection",(socket) => {

socket.on("disconnect",(reason) => {
 if (IDS[socket.id] && PLAYERS[IDS[socket.id]] && process.env == "production") {
 console.log("A player (" + IDS[socket.id] + ")(" + socket.id + ")  has disconnected!");
console.log("- " + reason);
 socket.broadcast.emit("remove_player",IDS[socket.id]);
 delete PLAYERS[IDS[socket.id]];
}
});

socket.on("new_user",(player) => {
 console.log("A new player (" + player.username + ") has connected!");
PLAYERS[player.username] = player;
IDS[socket.id] = player.username;
});

socket.on("new_update",(player) => { 
if (PLAYERS[player.username]) {
 let __self__ = PLAYERS[player.username];
 __self__.rotation = player.rotation;
__self__.running = player.running;
__self__.speed = player.speed;
__self__.posX = player.posX;
__self__.posY = player.posY;
 socket.broadcast.emit("new_player_update",player);
}
});

socket.emit("players",PLAYERS);

});

console.log("\x1b[32m%s\x1b[0m","Running in " + process.env.NODE_ENV + " mode...");

module.exports = {};
