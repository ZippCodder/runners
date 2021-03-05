const server = require("./index.js").server;
const io = require("socket.io")(server);

const PLAYERS = {};
const TIMERS = {};

io.on("connection",(socket) => {

socket.on("new_user",(player) => {
console.log("A new player (" + player.username + ") has connected!");
socket.emit("prev_players",PLAYERS);
PLAYERS[player.username] = player;
if (process.env.NODE_ENV == "production") {
TIMERS[player.username] = setTimeout(() => {
 delete PLAYERS[player.username];
 delete TIMERS[player.username];
 console.log("A player ("+ player.username +") has disconnected!");
 socket.broadcast.emit("remove_player",player.username);
},10000); 
}
console.log(PLAYERS);
socket.broadcast.emit("new_player",player);
});

socket.on("user_disconnect",(user) => {
console.log("A player ("+ user +") has disconnected!");
 delete PLAYERS[user];
 delete TIMERS[user];
socket.broadcast.emit("remove_player",user);
});

socket.on("new_update",(player) => { 
if (PLAYERS[player.username]) {
clearTimeout(TIMERS[player.username]);
if (process.env.NODE_ENV == "production") {
TIMERS[player.username] = setTimeout(() => {
 delete PLAYERS[player.username];
 delete TIMERS[player.username];
 console.log("A player ("+ player.username +") has disconnected!");
 socket.broadcast.emit("remove_player",player.username);
},10000); 
}

 let __self__ = PLAYERS[player.username];
 __self__.rotation = player.rotation;
__self__.running = player.running;
__self__.speed = player.speed;
__self__.posX = player.posX;
__self__.posY = player.posY;
 socket.broadcast.emit("new_player_update",player);
}
});
});

console.log("\x1b[32m%s\x1b[0m","Running in " + process.env.NODE_ENV + " mode...");

module.exports = {};
