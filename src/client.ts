// @ts-ignore
const socket = io()!;

import {
MAIN_CHARACTER,
PLAYERS,
GLOBAL_SETTINGS,
OtherCharacter
} from "./index.ts";

let __interface__: OtherCharacter;

// CREATE OTHER PLAYERS_______________________________

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
// @ts-ignore
 if (typeof running == "boolean") plyr.run(true);
 plyr.rotation = rotation;
 plyr.speed = speed;
 plyr.username = username;
 plyr.width = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charWidth, true);
 plyr.height = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charHeight, true); 
 plyr.x = GLOBAL_SETTINGS.percent(posX,true) - plyr.width/2;
 plyr.y = GLOBAL_SETTINGS.percent(posY,true) - plyr.height/2; 
 plyr.fixedCenter = {x: plyr.x + GLOBAL_SETTINGS.charWidth/2, y: plyr.y + GLOBAL_SETTINGS.charHeight/2 };
 plyr.posX = posX;
 plyr.posY = posY;
}
});

// UPDATE THIS PLAYER___________________________________

/*  Properties that must me updated:
 
rotation: number;    
running: boolean | timeout;                                                  speed?: number;                                                              posX?: number;                                                               
posY?: number;           
x: number;                                                                   y: number;     
fixedCenter: {x: number, y: number};     
                                    
*/

export function update() {
let {rotation, running, speed, x, y, posX, posY, fixedCenter, username} = MAIN_CHARACTER;
__interface__.rotation = rotation;
__interface__.running = running;
__interface__.speed = speed;
__interface__.x = x; 
__interface__.y = y;
__interface__.posX = posX;
__interface__.posY = posY;
__interface__.username = username;

socket.emit("new_update",JSON.stringify(__interface__));
}

// ENTER THIS PLAYER INTO SERVER___________________________________

export function new_user() {

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
