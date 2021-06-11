import { ctx, GLOBAL_SETTINGS } from "./index.ts";

/* REUSABLE OBJECTS */

/* Spawn box (usually at center of map) __________*/

export function Spawn(cx: number, cy: number): void {
let { percent } = GLOBAL_SETTINGS;
let { x, y } = GLOBAL_SETTINGS.mapAnchor;
// outer peice
ctx.rect(
    x + percent(cx, true),
    y + percent(cy, true),
    percent(121, true),
    percent(100, true)
  );
// inner peice
  ctx.rect(
    x + percent(cx+35.5, true),
    y + percent(cy+25, true),
    percent(50, true),
    percent(50, true)
  ); 
}

/* Common bench prop __________*/

type direction = "up" | "down" | "left" | "right";

export function Bench(cx: number, cy: number,dir: direction): void {
let { percent } = GLOBAL_SETTINGS;
let { x, y } = GLOBAL_SETTINGS.mapAnchor;
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
// (-25,-95)
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
// (-25,-95)
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
} 
