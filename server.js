const server = require("./index.js").server;
const io = require("socket.io")(server);

const PLAYERS = {};

io.on("connection",(socket) => {
// console.log("A player has entered the room!");

socket.on("new_user",(player) => {
console.log("NEW USER!");
socket.emit("prev_players",PLAYERS);
PLAYERS[player.username] = player;
console.log(PLAYERS);
socket.broadcast.emit("new_player",player);
});

socket.on("new_update",(player) => {

 
 socket.broadcast.emit("new_player_update",player);
});

// socket.on("disconnect",() => {
// console.log("A player has disconnected!");
// })
});

module.exports = {};
