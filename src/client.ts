// @ts-ignore
const socket = io()!;

import {
MAIN_CHARACTER,
PLAYERS,
GLOBAL_SETTINGS,
LEFT_CONTROL,
RIGHT_CONTROL,
OtherCharacter,
username
} from "./index.ts";

let __interface__: OtherCharacter;

// CREATE OTHER <OtherCharacter> INSTANCES FOR PLAYERS ALREADY IN ROOM_______________________________

socket.on("prev_players",(Players: string) => {
let plyrs = JSON.parse(Players);
for (let plyr in plyrs) {
let obj = plyrs[plyr];
if (obj.username !== MAIN_CHARACTER.username) {
let newPlayer = new OtherCharacter(0,0,obj.username,0);
for (let prop in obj) {
if (prop in newPlayer) {
newPlayer[prop] = obj[prop];
}
}
 newPlayer.width = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charWidth, true);
 newPlayer.height = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charHeight, true); 
 newPlayer.x = GLOBAL_SETTINGS.percent(newPlayer.posX,true) - newPlayer.width/2;
 newPlayer.y = GLOBAL_SETTINGS.percent(newPlayer.posY,true) - newPlayer.height/2; 

 PLAYERS[obj.username] = newPlayer;
}
}
});

// CREATE <OtherCharacter> INSTANCE FOR NEW PLAYERS________________________________________

socket.on("new_player",(p: string) => {
let obj = JSON.parse(p);
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
 newPlayer.x = GLOBAL_SETTINGS.percent(newPlayer.posX,true) - newPlayer.width/2;
 newPlayer.y = GLOBAL_SETTINGS.percent(newPlayer.posY,true) - newPlayer.height/2; 

 PLAYERS[obj.username] = newPlayer;
});

// UPDATE OTHER PLAYERS_________________________________

socket.on("new_player_update",(p: string) => {
let player = JSON.parse(p);
if (player.username in PLAYERS) {
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
// plyr.width = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charWidth, true);
// plyr.height = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charHeight, true); 
plyr.x = (GLOBAL_SETTINGS.percent(posX - 1,true) - GLOBAL_SETTINGS.charWidth/2) - plyr.handWidth;
plyr.y = (GLOBAL_SETTINGS.percent(posY - 1,true) - GLOBAL_SETTINGS.charHeight/2) - plyr.handHeight; 
// plyr.fixedCenter = {x: plyr.x + GLOBAL_SETTINGS.charWidth/2, y: plyr.y + GLOBAL_SETTINGS.charHeight/2 };
// plyr.posX = posX;
// plyr.posY = posY;
}
});

// UPDATE THIS PLAYER___________________________________

export function update() {
let {rotation, running, speed, x, y, posX, posY, fixedCenter, username} = MAIN_CHARACTER;
__interface__.rotation = -RIGHT_CONTROL?.angle! || -LEFT_CONTROL?.angle! || rotation || 0;
__interface__.running = running;
__interface__.speed = speed;
// __interface__.x = x; 
// __interface__.y = y;
__interface__.posX = -Math.round((GLOBAL_SETTINGS.mapAnchor.x - GLOBAL_SETTINGS.globalCenter.x)/GLOBAL_SETTINGS.percent(1,true));
__interface__.posY =  -Math.round((GLOBAL_SETTINGS.mapAnchor.y - GLOBAL_SETTINGS.globalCenter.y)/GLOBAL_SETTINGS.percent(1,true));
__interface__.username = username;

socket.emit("new_update",JSON.stringify(__interface__));
}

// ENTER THIS PLAYER INTO SERVER___________________________________

export function new_user() {

let spd = /<\d\.?\d?>/.exec(MAIN_CHARACTER.username)!, s;

if (spd) {
s = spd[0]?.replace(/<|>/g,"");
MAIN_CHARACTER.username = MAIN_CHARACTER.username.replace(spd[0],"");
}

if (s) {
GLOBAL_SETTINGS.speedFactor = parseFloat(s);
}

// Create an <OtherCharacter> instance to pass to other clients...

  __interface__ = new OtherCharacter(0,0,MAIN_CHARACTER.username);

for (let prop in __interface__) {
 if (prop in MAIN_CHARACTER) {
  __interface__[prop] = MAIN_CHARACTER[prop];
}
} 

// Set corrdinates of where character will start at on map...
 __interface__.x = 0;
__interface__.y = 0; 

socket.emit("new_user",JSON.stringify(__interface__));
}
