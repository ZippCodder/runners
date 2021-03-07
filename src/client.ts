// @ts-ignore
const socket = io({autoConnect: false})!;

import {
MAIN_CHARACTER,
PLAYERS,
GLOBAL_SETTINGS,
LEFT_CONTROL,
RIGHT_CONTROL,
OtherCharacter
} from "./index.ts";

let __interface__: OtherCharacter;

// CREATE OTHER <OtherCharacter> INSTANCES FOR PLAYERS ALREADY IN ROOM_______________________________

 socket.on("players",(Players: {[index: string]: OtherCharacter}) => {
for (let plyr in Players) {
let obj = Players[plyr];
if (obj.username != MAIN_CHARACTER.username) {
let newPlayer = new OtherCharacter(0,0,obj.username,0);
for (let prop in obj) {
if (prop in newPlayer) {
newPlayer[prop] = obj[prop];
}
}
 newPlayer.width = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charWidth, true);
 newPlayer.height = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charHeight, true); 
 newPlayer.eyeDim = GLOBAL_SETTINGS.percent(3,true);
 newPlayer.handWidth = GLOBAL_SETTINGS.percent(4,true);
 newPlayer.handHeight = GLOBAL_SETTINGS.percent(4,true);
 newPlayer.x = GLOBAL_SETTINGS.percent(obj.posX,true) - newPlayer.width/2;
 newPlayer.y = GLOBAL_SETTINGS.percent(obj.posY,true) - newPlayer.height/2; 

 PLAYERS[obj.username] = newPlayer;
}
}
}); 

// UPDATE OTHER PLAYERS_________________________________

socket.on("new_player_update",(player: OtherCharacter) => {
if (!(player.username in PLAYERS)) {
let newPlayer = new OtherCharacter(0,0,player.username,0);
for (let prop in player) {
if (prop in newPlayer) {
newPlayer[prop] = player[prop];
}
}
 newPlayer.width = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charWidth, true);
 newPlayer.height = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charHeight, true); 
 newPlayer.eyeDim = GLOBAL_SETTINGS.percent(3,true);
 newPlayer.handWidth = GLOBAL_SETTINGS.percent(4,true);
 newPlayer.handHeight = GLOBAL_SETTINGS.percent(4,true);
 newPlayer.x = GLOBAL_SETTINGS.percent(newPlayer.posX,true) - newPlayer.width/2;
 newPlayer.y = GLOBAL_SETTINGS.percent(newPlayer.posY,true) - newPlayer.height/2; 

 PLAYERS[player.username] = newPlayer;

}

let plyr =  PLAYERS[player.username];
let {rotation, running, speed, x, y, posX, posY, fixedCenter, username} = player;

 if (typeof running == "boolean") {
// @ts-ignore
plyr.run(false);
} else {
// @ts-ignore
plyr.run(true);
}
plyr.rotation = rotation;
plyr.speed = speed;
plyr.username = username;
plyr.x = (GLOBAL_SETTINGS.percent(posX - 1,true) - GLOBAL_SETTINGS.charWidth/2) - plyr.handWidth;
plyr.y = (GLOBAL_SETTINGS.percent(posY - 1,true) - GLOBAL_SETTINGS.charHeight/2) - plyr.handHeight; 
plyr.posX = posX;
plyr.posY = posY;
});

// UPDATE THIS PLAYER___________________________________

export function update() {
if (socket.connected) {
let {rotation, running, speed, x, y, posX, posY, fixedCenter, username} = MAIN_CHARACTER;
__interface__.rotation = -RIGHT_CONTROL?.angle! || -LEFT_CONTROL?.angle! || rotation || 0;
__interface__.running = running;
__interface__.speed = GLOBAL_SETTINGS.speedFactor;
__interface__.posX = -Math.round((GLOBAL_SETTINGS.mapAnchor.x - GLOBAL_SETTINGS.globalCenter.x)/GLOBAL_SETTINGS.percent(1,true));
__interface__.posY =  -Math.round((GLOBAL_SETTINGS.mapAnchor.y - GLOBAL_SETTINGS.globalCenter.y)/GLOBAL_SETTINGS.percent(1,true));
__interface__.username = username;

socket.emit("new_update",__interface__);
}
}

// ENTER THIS PLAYER INTO SERVER___________________________________

export function new_user() {
if (MAIN_CHARACTER.username) {

socket.connect();

let spd = /<\d\.?\d?>/.exec(MAIN_CHARACTER.username)!, s;

if (spd) {
s = spd[0]?.replace(/<|>/g,"");
MAIN_CHARACTER.username = MAIN_CHARACTER.username.replace(spd[0],"") + " Lv." + Number(s) * 10;
} else {
MAIN_CHARACTER.username = MAIN_CHARACTER.username + " Lv." + GLOBAL_SETTINGS.speedFactor * 10;
}

if (s) {
GLOBAL_SETTINGS.speedFactor = Number(s);
}

// Create an <OtherCharacter> instance to pass to other clients...
 
  __interface__ = new OtherCharacter(0,0,MAIN_CHARACTER.username);

for (let prop in __interface__) {
 if (prop in MAIN_CHARACTER) {
  __interface__[prop] = MAIN_CHARACTER[prop];
}
} 

// Set corrdinates of where character will start at on map...
__interface__.speed = GLOBAL_SETTINGS.speedFactor;
 __interface__.x = 0;
__interface__.y = 0; 

socket.emit("new_user",__interface__);
}
}

// ERASE A PLAYER WHEN THEY DISCONNECT____________________

socket.on("remove_player",(player: string) => {
if (PLAYERS[player]) {
 delete PLAYERS[player];
}
});

window.addEventListener("beforeunload",() => {
 socket.disconnect();
});


