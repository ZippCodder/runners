// @ts-ignore
const socket = io()!;

import {
MAIN_CHARACTER,
PLAYERS,
GLOBAL_SETTINGS,
OtherCharacter
} from "./index.ts";

let __interface__: OtherCharacter;

socket.on("new_player",(player: string) => {
let obj = JSON.parse(player);
let newPlayer = new OtherCharacter(0,0,obj.username,0);
for (let prop in obj) {
if (prop in newPlayer) {
newPlayer[prop] = obj[prop];
}
}
 PLAYERS[obj.username] = newPlayer;
});

socket.on("new_player_update",(player: OtherCharacter) => {
if (player.username in PLAYERS) {
 PLAYERS[player.username] = player;
}
});

export function update() {
 for (let prop in __interface__) {
 if (prop in MAIN_CHARACTER) {
  __interface__[prop] = MAIN_CHARACTER[prop];
}
}

socket.emit("new_update",JSON.stringify(__interface__));
}

// ENTER THIS USER INTO SERVER...

export function new_user() {

// Create an <OtherCharacter> instance to pass to other clients...

  __interface__ = new OtherCharacter(0,0,MAIN_CHARACTER.username);

for (let prop in __interface__) {
 if (prop in MAIN_CHARACTER) {
  __interface__[prop] = MAIN_CHARACTER[prop];
}
} 

// Set corrdinates of where character will start at on map...

__interface__.x = 0 - __interface__.width/2;
__interface__.y = 0 - __interface__.height/2;

socket.emit("new_user",JSON.stringify(__interface__));
}
