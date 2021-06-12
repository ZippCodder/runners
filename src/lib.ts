import { ctx, GLOBAL_SETTINGS, setDefaults, DEFAULTS } from "./index.ts";

/* OBJECT DIKMENSIONS (for measurement) ____________________________
Spawn: 121*100
Bench: 25*50 (can change orientation)
Road: (Regular peice: 130*70, connectors: 70*70)
Booth: 35*60
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
