const server = require("./index.js").server;
const io = require("socket.io")(server);

const PLAYERS = {};

io.on("connection",(socket) => {
// console.log("A player has entered the room!");

socket.on("new_user",(player) => {
console.log("\x1b[23m%s\x1b[0m","Created new player: " + player);
PLAYERS[JSON.parse(player).username] = JSON.parse(player);
console.log(PLAYERS);
socket.broadcast.emit("new_player",player);
});

socket.on("new_update",(player) => {
 socket.broadcast.emit("new_player_update",player);
 PLAYERS[JSON.parse(player).username] = JSON.parse(player);
});

// socket.on("disconnect",() => {
// console.log("A player has disconnected!");
// })
});

module.exports = {};
