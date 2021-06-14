import { ctx, GLOBAL_SETTINGS, setDefaults, DEFAULTS } from "./index.ts";

/* OBJECT DIKMENSIONS (for measurement) ____________________________
Spawn: 121*100
Bench: 25*50 (can change orientation)
Road: (Regular peice: 130*70, connectors: 70*70)
Booth: 35*60
Sign: 40*45
Hospital: 200*190
*/

/* REUSABLE OBJECTS ____________________________________*/

/* Spawn box (usually at center of map) __________*/

export function Spawn(cx: number, cy: number): void {
let { percent } = GLOBAL_SETTINGS;
let { x, y } = GLOBAL_SETTINGS.mapAnchor;
ctx.beginPath();
// outer peice
ctx.rect(
    x + percent(cx, true),
    y + percent(cy, true),
    percent(121, true),
    percent(100, true)
  );
ctx.rect(
   x + percent(cx+5, true),
   y + percent(cy+5, true),
   percent(111, true),
   percent(90, true)
);
// inner peice
  ctx.rect(
    x + percent(cx+35.5, true),
    y + percent(cy+25, true),
    percent(50, true),
    percent(50, true)
  ); 
ctx.stroke();
}

/* Common bench prop __________*/

type direction = "up" | "down" | "left" | "right";

export function Bench(cx: number, cy: number,dir: direction): void {
let { percent } = GLOBAL_SETTINGS;
let { x, y } = GLOBAL_SETTINGS.mapAnchor;
ctx.beginPath();
if (dir == "left") {
// main peice
ctx.rect(
    x + percent(cx, true),
    y + percent(cy, true),
    percent(20, true),
    percent(50, true)
  );
// middle stripe
  ctx.rect(
    x + percent(cx+8, true),
    y + percent(cy, true),
    percent(6, true),
    percent(50,true)
  );
//  first leg
  ctx.rect(
    x + percent(cx-5, true),
    y + percent(cy+2, true),
    percent(5, true),
    percent(3, true)
  );
// second leg
  ctx.rect(
    x + percent(cx-5, true),
    y + percent(cy+45, true),
    percent(5, true),
    percent(3, true)
  );
// perspective line
  ctx.moveTo(x + percent(cx+2, true), y + percent(cy, true));
  ctx.lineTo(x + percent(cx+2, true), y + percent(cy+50, true));
} else if (dir == "right") {
// main peice
ctx.rect(
    x + percent(cx, true),
    y + percent(cy, true),
    percent(20, true),
    percent(50, true)
  );
// middle stripe
  ctx.rect(
    x + percent(cx+6, true),
    y + percent(cy, true),
    percent(6, true),
    percent(50,true)
  );
//  first leg
  ctx.rect(
    x + percent(cx+20, true),
    y + percent(cy+2, true),
    percent(5, true),
    percent(3, true)
  );
// second leg
  ctx.rect(
    x + percent(cx+20, true),
    y + percent(cy+45, true),
    percent(5, true),
    percent(3, true)
  );
// perspective line
  ctx.moveTo(x + percent(cx+18, true), y + percent(cy, true));
  ctx.lineTo(x + percent(cx+18, true), y + percent(cy+50, true));
} else if (dir == "up") {
  // main peice
ctx.rect(
    x + percent(cx, true),
    y + percent(cy, true),
    percent(50, true),
    percent(20, true)
  );
// middle stripe
  ctx.rect(
    x + percent(cx, true),
    y + percent(cy+8, true),
    percent(50, true),
    percent(6,true)
  );
//  first leg
  ctx.rect(
    x + percent(cx+45, true),
    y + percent(cy-5, true),
    percent(3, true),
    percent(5, true)
  );
// second leg
  ctx.rect(
    x + percent(cx+2, true),
    y + percent(cy-5, true),
    percent(3, true),
    percent(5, true)
  );
// perspective line
  ctx.moveTo(x + percent(cx, true), y + percent(cy+2, true));
  ctx.lineTo(x + percent(cx+50, true), y + percent(cy+2, true));

} else if (dir == "down") {
  // main peice
ctx.rect(
    x + percent(cx, true),
    y + percent(cy, true),
    percent(50, true),
    percent(20, true)
  );
// middle stripe
  ctx.rect(
    x + percent(cx, true),
    y + percent(cy+6, true),
    percent(50, true),
    percent(6,true)
  );
//  first leg
  ctx.rect(
    x + percent(cx+45, true),
    y + percent(cy+20, true),
    percent(3, true),
    percent(5, true)
  );
// second leg
  ctx.rect(
    x + percent(cx+2, true),
    y + percent(cy+20, true),
    percent(3, true),
    percent(5, true)
  );
// perspective line
  ctx.moveTo(x + percent(cx, true), y + percent(cy+18, true));
  ctx.lineTo(x + percent(cx+50, true), y + percent(cy+18, true));
}
ctx.stroke();
} 

/* Road segment prop _________________*/

type peice = "horizontal" | "vertical" | "L_corner" | "R_corner" | "U_corner" | "D_corner" | "L_conn" | "R_conn" | "U_conn" | "D_conn";

export function Road(cx: number,cy: number,peice: peice): void {
let { percent } = GLOBAL_SETTINGS;
let { x, y } = GLOBAL_SETTINGS.mapAnchor;
ctx.beginPath();
if (peice == "horizontal") {
// top curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(130, true),
  percent(10, true)
);
// bottom curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy+60, true),
  percent(130, true),
  percent(10, true)
);
// first stripe
ctx.rect(
  x + percent(cx+26, true),
  y + percent(cy+33.5, true),
  percent(26, true),
  percent(3, true)
);
// second stripe
ctx.rect(
  x + percent(cx+78, true),
  y + percent(cy+33.5, true),
  percent(26, true),
  percent(3, true)
);
} else if (peice == "vertical") {
// left curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(10, true),
  percent(130, true)
);
// right curb
ctx.rect(
  x + percent(cx+60, true),
  y + percent(cy, true),
  percent(10, true),
  percent(130, true)
);
// first stripe
ctx.rect(
  x + percent(cx+33.5, true),
  y + percent(cy+26, true),
  percent(3, true),
  percent(26, true)
);
// second stripe
ctx.rect(
  x + percent(cx+33.5, true),
  y + percent(cy+78, true),
  percent(3, true),
  percent(26, true)
);
} else if (peice == "L_corner") {
// first curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(60, true),
  percent(10, true)
);
// second curb
ctx.rect(
  x + percent(cx+60, true),
  y + percent(cy, true),
  percent(10, true),
  percent(70, true)
);
// square
ctx.rect(
  x + percent(cx, true),
  y + percent(cy+60, true),
  percent(10, true),
  percent(10, true)
);
// stripe
ctx.rect(
  x + percent(cx, true),
  y + percent(cy+33.5, true),
  percent(26, true),
  percent(3, true)
);
} else if (peice == "R_corner") {
// first curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(10, true),
  percent(70, true)
);
// second curb
ctx.rect(
  x + percent(cx+10, true),
  y + percent(cy, true),
  percent(60, true),
  percent(10, true)
);
// square
ctx.rect(
  x + percent(cx+60, true),
  y + percent(cy+60, true),
  percent(10, true),
  percent(10, true)
);
// stripe
ctx.rect(
  x + percent(cx+44, true),
  y + percent(cy+33.5, true),
  percent(26, true),
  percent(3, true)
);
} else if (peice == "U_corner") {
// first curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(10, true),
  percent(70, true)
);
// second curb
ctx.rect(
  x + percent(cx+10, true),
  y + percent(cy+60, true),
  percent(60, true),
  percent(10, true)
);
// square
ctx.rect(
  x + percent(cx+60, true),
  y + percent(cy, true),
  percent(10, true),
  percent(10, true)
);
// stripe
ctx.rect(
  x + percent(cx+44, true),
  y + percent(cy+33.5, true),
  percent(26, true),
  percent(3, true)
);
} else if (peice == "D_corner") {
// first curb
ctx.rect(
  x + percent(cx+60, true),
  y + percent(cy, true),
  percent(10, true),
  percent(70, true)
);
// second curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy+60, true),
  percent(60, true),
  percent(10, true)
);
// square
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(10, true),
  percent(10, true)
);
// stripe
ctx.rect(
  x + percent(cx, true),
  y + percent(cy+33.5, true),
  percent(26, true),
  percent(3, true)
);

} else if (peice == "L_conn") {
// left curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(10, true),
  percent(40, true)
);
ctx.rect(
  x + percent(cx, true),
  y + percent(cy+90, true),
  percent(10, true),
  percent(40, true)
);
// right curb
ctx.rect(
  x + percent(cx+60, true),
  y + percent(cy, true),
  percent(10, true),
  percent(130, true)
);
// first stripe
ctx.rect(
  x + percent(cx+33.5, true),
  y + percent(cy+26, true),
  percent(3, true),
  percent(26, true)
);
// second stripe
ctx.rect(
  x + percent(cx+33.5, true),
  y + percent(cy+78, true),
  percent(3, true),
  percent(26, true)
);
} else if (peice == "R_conn") {
// left curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(10, true),
  percent(130, true)
);
// right curb
ctx.rect(
  x + percent(cx+60, true),
  y + percent(cy, true),
  percent(10, true),
  percent(40, true)
);
ctx.rect(
  x + percent(cx+60, true),
  y + percent(cy+90, true),
  percent(10, true),
  percent(40, true)
);
// first stripe
ctx.rect(
  x + percent(cx+33.5, true),
  y + percent(cy+26, true),
  percent(3, true),
  percent(26, true)
);
// second stripe
ctx.rect(
  x + percent(cx+33.5, true),
  y + percent(cy+78, true),
  percent(3, true),
  percent(26, true)
);
} else if (peice == "U_conn") {
// top curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(40, true),
  percent(10, true)
);
ctx.rect(
 x + percent(cx+90, true),
 y + percent(cy, true),
 percent(40, true),
 percent(10, true)
);
// bottom curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy+60, true),
  percent(130, true),
  percent(10, true)
);
// first stripe
ctx.rect(
  x + percent(cx+26, true),
  y + percent(cy+33.5, true),
  percent(26, true),
  percent(3, true)
);
// second stripe
ctx.rect(
  x + percent(cx+78, true),
  y + percent(cy+33.5, true),
  percent(26, true),
  percent(3, true)
);
} else if (peice == "D_conn") {
// top curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(130, true),
  percent(10, true)
);
// bottom curb
ctx.rect(
  x + percent(cx, true),
  y + percent(cy+60, true),
  percent(40, true),
  percent(10, true)
);
ctx.rect(
  x + percent(cx+90, true),
  y + percent(cy+60, true),
  percent(40, true),
  percent(10, true)
);
// first stripe
ctx.rect(
  x + percent(cx+26, true),
  y + percent(cy+33.5, true),
  percent(26, true),
  percent(3, true)
);
// second stripe
ctx.rect(
  x + percent(cx+78, true),
  y + percent(cy+33.5, true),
  percent(26, true),
  percent(3, true)
);
}
ctx.stroke();
}

/* Booths _____________*/

type label = "LOTTERY" | "RANKINGS" | "PVP";

export function Booth(cx: number,cy: number,label: label): void {
let { percent } = GLOBAL_SETTINGS;
let { x, y } = GLOBAL_SETTINGS.mapAnchor;
ctx.beginPath();
 ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(35, true),
  percent(40, true) 
); 
ctx.rect(
  x + percent(cx, true),
  y + percent(cy-15, true),
  percent(35, true),
  percent(15, true)
);
ctx.rect(
  x + percent(cx+5, true),
  y + percent(cy+10, true),
  percent(25, true),
  percent(20, true)
);
ctx.rect(
  x + percent(cx+2, true),
  y + percent(cy+30, true),
  percent(31, true),
  percent(3, true)
);
ctx.fillStyle = "black";
ctx.font = `${percent(5, true)}px Arial`;
ctx.fillText(
  label,
  x + percent(cx+17.5, true),
  y + percent(cy+7, true)
);
if (label == "LOTTERY") {
// First stack
ctx.rect(
  x + percent(cx+9.5, true),
  y + percent(cy+22, true),
  percent(4, true),
  percent(8, true)
);
ctx.rect(
  x + percent(cx+9.5, true),
  y + percent(cy+26, true),
  percent(4, true),
  percent(2, true)
);
ctx.rect(
  x + percent(cx+9.5, true),
  y + percent(cy+28, true),
  percent(4, true),
  percent(2, true)
);
// Second stack
ctx.rect(
  x + percent(cx+15.5, true),
  y + percent(cy+18, true),
  percent(4, true),
  percent(12, true)
);
ctx.rect(
  x + percent(cx+15.5, true),
  y + percent(cy+22, true),
  percent(4, true),
  percent(2, true)
);
ctx.rect(
  x + percent(cx+15.5, true),
  y + percent(cy+26, true),
  percent(4, true),
  percent(2, true)
);
// Third stack
ctx.rect(
  x + percent(cx+21.5, true),
  y + percent(cy+20, true),
  percent(4, true),
  percent(8, true)
);
ctx.rect(
  x + percent(cx+21.5, true),
  y + percent(cy+24, true),
  percent(4, true),
  percent(2, true)
);
ctx.rect(
  x + percent(cx+21.5, true),
  y + percent(cy+26, true),
  percent(4, true),
  percent(2, true)
);
ctx.rect(
  x + percent(cx+21.5, true),
  y + percent(cy+28, true),
  percent(4, true),
  percent(2, true)
);
} else if (label == "RANKINGS") {
ctx.rect(
  x + percent(cx+7, true),
  y + percent(cy+13, true),
  percent(21, true),
  percent(3, true)
);
ctx.rect(
  x + percent(cx+7, true),
  y + percent(cy+18, true),
  percent(21, true),
  percent(3, true)
);
ctx.rect(
  x + percent(cx+7, true),
  y + percent(cy+23, true),
  percent(21, true),
  percent(3, true)
);
} else if (label == "PVP") {
ctx.rect(
  x + percent(cx+16.5, true),
  y + percent(cy+24, true),
  percent(2, true),
  percent(4, true)
);
ctx.rect(
  x + percent(cx+14.5, true),
  y + percent(cy+23, true),
  percent(6, true),
  percent(1, true)
);
ctx.moveTo(x + percent(cx+16, true), y + percent(cy+23, true));
ctx.lineTo(x + percent(cx+16, true), y + percent(cy+15, true));
ctx.lineTo(x + percent(cx+17.5, true), y + percent(cy+12, true));
ctx.moveTo(x + percent(cx+19, true), y + percent(cy+23, true));
ctx.lineTo(x + percent(cx+19, true), y + percent(cy+15, true));
ctx.lineTo(x + percent(cx+17.5, true), y + percent(cy+12, true));
ctx.moveTo(x + percent(cx+17.5, true), y + percent(cy+23, true));
ctx.lineTo(x + percent(cx+17.5, true), y + percent(cy+12, true));
}
ctx.stroke();
}

/* Flower prop______________*/

export function Flower(cx: number,cy: number): void {
  let { percent } = GLOBAL_SETTINGS;
  let { x, y } = GLOBAL_SETTINGS.mapAnchor;
ctx.beginPath();
ctx.rect(
  x + percent(cx-2, true),
  y + percent(cy-2, true),
  percent(4, true),
  percent(4, true)
);
ctx.rect(
  x + percent(cx+3, true),
  y + percent(cy-2, true),
  percent(4, true),
  percent(4, true)
);
ctx.rect(
  x + percent(cx-2, true),
  y + percent(cy+3, true),
  percent(4, true),
  percent(4, true)
);
ctx.rect(
  x + percent(cx+3, true),
  y + percent(cy+3, true),
  percent(4, true),
  percent(4, true)
);
ctx.stroke();
ctx.beginPath();
ctx.fillStyle = "white";
ctx.fillRect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(5, true),
  percent(5, true)
);
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(5, true),
  percent(5, true)
);
ctx.stroke();
setDefaults();
}

/* Sign prop __________________________*/

export function Sign(cx: number, cy: number,message: string): void {
 let { percent } = GLOBAL_SETTINGS;
 let { x, y } = GLOBAL_SETTINGS.mapAnchor;
 let [ topText, bottomText ] = message.split(" ");
 ctx.beginPath();
ctx.fillRect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(40, true),
  percent(20, true)
);
ctx.fillRect(
  x + percent(cx+17.5, true),
  y + percent(cy+20, true),
  percent(5, true),
  percent(25, true)
);
ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(40, true),
  percent(20, true)
);
ctx.rect(
  x + percent(cx+17.5, true),
  y + percent(cy+20, true),
  percent(5, true),
  percent(25, true)
);
ctx.fillStyle = "black";
ctx.font = `${percent(7, true)}px Arial`;
if (topText && bottomText) {
ctx.fillText(topText,x + percent(cx+20, true),y + percent(cy+8, true));
ctx.fillText(bottomText,x + percent(cx+20, true),y + percent(cy+17, true));
} else {
ctx.fillText(topText,x + percent(cx+20, true),y + percent(cy+13, true));
}
ctx.stroke();
setDefaults();
}

/* Hospital _____________________________*/

export function Hospital(cx: number, cy: number): void {
let { percent } = GLOBAL_SETTINGS;
let { x, y } = GLOBAL_SETTINGS.mapAnchor;
ctx.beginPath();
// main peice
 ctx.rect(
  x + percent(cx, true),
  y + percent(cy, true),
  percent(200, true),
  percent(150, true)
);
// porch
ctx.rect(
  x + percent(cx+55, true),
  y + percent(cy+150, true),
  percent(90, true),
  percent(40, true)
);  
// door
ctx.rect(
  x + percent(cx+65, true),
  y + percent(cy+110, true),
  percent(70, true),
  percent(40, true)
);
// handlebar 1 
ctx.rect(
  x + percent(cx+70, true),
  y + percent(cy+135, true),
  percent(25, true),
  percent(3, true)
);
 ctx.moveTo(x + percent(cx+72, true), y + percent(cy+135, true));
ctx.lineTo(x + percent(cx+72, true), y + percent(cy+133, true));
 ctx.moveTo(x + percent(cx+93, true), y + percent(cy+135, true));
ctx.lineTo(x + percent(cx+93, true), y + percent(cy+133, true));
// handlebar 2
ctx.rect(
  x + percent(cx+105, true),
  y + percent(cy+135, true),
  percent(25, true),
  percent(3, true)
);
 ctx.moveTo(x + percent(cx+107, true), y + percent(cy+135, true));
ctx.lineTo(x + percent(cx+107, true), y + percent(cy+133, true));
 ctx.moveTo(x + percent(cx+128, true), y + percent(cy+135, true));
ctx.lineTo(x + percent(cx+128, true), y + percent(cy+133, true));
// main window 1
ctx.rect(
  x + percent(cx+15, true),
  y + percent(cy+100, true),
  percent(35, true),
  percent(20, true)
);
ctx.rect(
  x + percent(cx+13, true),
  y + percent(cy+120, true),
  percent(39, true),
  percent(3, true)
);
// main window 2
ctx.rect(
  x + percent(cx+150, true),
  y + percent(cy+100, true),
  percent(35, true),
  percent(20, true)
);
ctx.rect(
  x + percent(cx+148, true),
  y + percent(cy+120, true),
  percent(39, true),
  percent(3, true)
);
// door window 1
ctx.rect(
  x + percent(cx+77.5, true),
  y + percent(cy+115, true),
  percent(10, true),
  percent(15, true)
);
// door window 2
ctx.rect(
  x + percent(cx+112.5, true),
  y + percent(cy+115, true),
  percent(10, true),
  percent(15, true)
);
// logo
ctx.font = `${percent(35, true)}px Arial`;
ctx.textAlign = "center";
ctx.strokeText("+",x + percent(cx+100, true),y + percent(cy+105, true));
// door line
ctx.moveTo(x + percent(cx+100, true), y + percent(cy+110, true));
ctx.lineTo(x + percent(cx+100, true), y + percent(cy+150, true));
// building line
ctx.moveTo(x + percent(cx, true),y + percent(cy+80, true));
ctx.lineTo(x + percent(cx+200, true),y + percent(cy+80, true));
ctx.stroke();
setDefaults();
}

/* Fence ____________________________*/

export function Fence(cx: number,cy: number): void {
 let { percent } = GLOBAL_SETTINGS;
 let { x, y } = GLOBAL_SETTINGS.mapAnchor;
}
