
import "./styles.css";

// Aditional info

/* Speed clases: 0.1 (lowest speed) - 5 (top speed)*/

// Initial Canvas And Global Setup...

// SET PLAYERS USERNAME BEFORE ENTERING ROOM_________________

export let username: string = "Laya<0.2>";

// SET PLAYERS USERNAME BEFORE ENTERING ROOM__________________

const canvas = document.querySelector("canvas")!;
canvas.onclick = () => {
  document.body.requestFullscreen();
};

export const ctx = canvas.getContext("2d")!;

// Common properties for accessability...

type joystick = undefined | number;

export const GLOBAL_SETTINGS: {
  readonly charWidth: number;
  readonly charHeight: number;
  readonly controlSize: number;
  joystickSize: joystick;
  readonly scale: number;
  speedFactor: number;
  speed: undefined | number;
  width: number;
  height: number;
  prevDim: undefined | object;
  globalCenter: {x: number, y: number};
  mapAnchor: {x: number, y: number};
  percent: (num: number, h?: boolean,o?: number) => number;
  readonly maxWidth: number;
  readonly maxHeight: number;
 } = {
  charWidth: 15,
  charHeight: 15,
  controlSize: 20,
  joystickSize: undefined,
  scale: 3,
  maxWidth: 10000,
  maxHeight: 10000,
  speedFactor: 0.1,
  speed: undefined,
  width: self.innerWidth,
  height: self.innerHeight,
  prevDim: undefined,
  globalCenter: { x: self.innerWidth / 2, y: window.innerHeight / 2 },
  mapAnchor: { x: self.innerWidth / 2, y: window.innerHeight / 2 },
  percent: function (num: number, h?: boolean, o?: number): number {
    if (h) {
      return (
        ((num / 100) * GLOBAL_SETTINGS.height) / GLOBAL_SETTINGS.scale +
        ((num / 100) * GLOBAL_SETTINGS.width) / GLOBAL_SETTINGS.scale
      );
    } else if (o) {
      return (num / 100) * o;
    }
    return (num / 100) * GLOBAL_SETTINGS.width;
  }
};

// Default canvas settings...

export const DEFAULTS = {
lineWidth: (self.innerWidth <= 800) ? (self.innerWidth <= 400) ? 2:2.5 :3,
strokeStyle: "black",
fillStyle: "white",
globalAlpha: 1,
textAlign: "center",
font: `${GLOBAL_SETTINGS.percent(5, true)} Arial`
}

export function setDefaults(
  lineWidth?: boolean,
  strokeStyle?: boolean,
  fillStyle?: boolean,
  globalAlpha?: boolean,
  textAlign?: boolean,
  font?: boolean
): void {
  if (!lineWidth) {
    ctx.lineWidth =  DEFAULTS.lineWidth; 
  }
  if (!strokeStyle) {
    ctx.strokeStyle = DEFAULTS.strokeStyle;
  }
  if (!fillStyle) {
    ctx.fillStyle = DEFAULTS.fillStyle;
  }
  if (!globalAlpha) {
    ctx.globalAlpha = DEFAULTS.globalAlpha;
  }
  if (!textAlign) {
    //@ts-ignore
    ctx.textAlign = DEFAULTS.textAlign; 
  }
  if (!font) {
    ctx.font = DEFAULTS.font;
  }
}

setDefaults();

ctx.save();

// Class for making maps...

class Mapp {
  constructor(width: number, height: number, render: Function) {
    this.width = width;
    this.height = height;
    this.render = render;
  }

width;
height;
render;
}

import { Spawn, Bench, Road, Booth, Flower } from "./lib.ts";

// Default map...
 
let DEFAULT_BACKGROUND = new Mapp(5000, 5000, () => {
  let { x, y } = GLOBAL_SETTINGS.mapAnchor;
  let { percent } = GLOBAL_SETTINGS;
  setDefaults();
  ctx.beginPath();
Spawn(-60.5, -50);
Bench(85.5,-25,"left");
Bench(-105.5,-25,"right");
Bench(-25,-95,"down");
Bench(-25,75,"up");
Road(-65,-264.5,"U_conn");
Road(-195,-264.5,"horizontal");
Road(65,-264.5,"horizontal");
Road(195,-264.5,"L_corner");
Road(195,-194.5,"vertical");
Road(195,-64.5,"R_conn");
Road(195,65.5,"vertical");
Road(195,195.5,"D_corner");
Road(65,195.5,"horizontal");
Road(-65,195.5,"D_conn");
Road(-195,195.5,"horizontal");
Road(-265,195.5,"U_corner");
Road(-265,65.5,"vertical");
Road(-265,-64.5,"L_conn");
Road(-265,-194.5,"vertical");
Road(-265,-264.5,"R_corner");
Booth(70.5,-170,"LOTTERY");
Booth(-105.5,-170,"RANKINGS");
Booth(-17.5,-170,"PVP");
// Center stripe
ctx.rect(
x + percent(-125.5, true),
y + percent(-115, true),
percent(251, true),
percent(230, true)
);
ctx.stroke();
// Center stripe
Flower(52.5,-153);
Flower(-32,-125);
Flower(-128.5,-170);
Flower(-158.5,-84);
Flower(-138.5,2);
Flower(-115.5,132);
Flower(56,150);
Flower(146,132);
Flower(154,90);
Flower(173,82);
Flower(156,-7);
Flower(166,-28);
Flower(133,-89);
Flower(127,-145);
Flower(156,-167);
Flower(0,161);
Flower(-134.5,162);
Flower(-146,23);
});

// Class for creating joysticks...

interface Control {
active: boolean;
mouseX: number;
mouseY: number;
angle: number;
quad: number;
distance: number;
mouseCenter: {x: number, y: number};
render: () => void;
touch: undefined | number;
}

class CONTROL implements Control {
  active = false;
  mouseX = 0;
  mouseY = 0;
  angle = 0;
  quad = 0;
  distance = 0;
  touch: number | undefined = undefined;
  mouseCenter = { x: 0, y: 0 };
  render() {
    setDefaults();
    ctx.moveTo(this.mouseCenter.x, this.mouseCenter.y);
    ctx.beginPath();
if (GLOBAL_SETTINGS.joystickSize) {
    ctx.arc(
      this.mouseCenter.x,
      this.mouseCenter.y,
      GLOBAL_SETTINGS.joystickSize,
      0,
      2 * Math.PI
    );
}
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.stroke();
    if (this.mouseX && this.mouseY && GLOBAL_SETTINGS.joystickSize) {
      ctx.beginPath();
if (GLOBAL_SETTINGS.joystickSize) {
      ctx.arc(
        this.mouseX,
        this.mouseY,
        GLOBAL_SETTINGS.joystickSize / 2 || 10,
        0,
        2 * Math.PI
      );
}
      ctx.fillStyle = "gray";
      ctx.globalAlpha = 0.5;
      ctx.fill();
    }
    ctx.stroke();
  }
}

// Left and right joystick...

export let LEFT_CONTROL: Control | undefined, RIGHT_CONTROL: Control | undefined;

// Anchor and render joysticks...

self.addEventListener("touchstart", (e) => {
  let { pageX, pageY } = e.touches![e.touches!.length - 1];

  let JOYSTICK = new CONTROL();
  JOYSTICK.touch = e.touches.length - 1;
  JOYSTICK.mouseCenter.x = pageX;
  JOYSTICK.mouseCenter.y = pageY;
  JOYSTICK.mouseX = pageX;
  JOYSTICK.mouseY = pageY;
  JOYSTICK.active = true;

  if (
    pageX > self.innerWidth / 2 && e.touches.length !== 3 && pageY > window.innerHeight / 2) {
    if (RIGHT_CONTROL?.touch == undefined) {
      RIGHT_CONTROL = JOYSTICK;
    }
  } else if (
    pageX < self.innerWidth / 2 &&
    e.touches.length !== 3 &&
    pageY > self.innerHeight / 2
  ) {
    if (LEFT_CONTROL?.touch == undefined) {
      LEFT_CONTROL = JOYSTICK;
    }
  }
});

// Hide joysticks and stop character movements...

self.addEventListener("touchend", (e) => {
  if (LEFT_CONTROL && RIGHT_CONTROL && e.touches && e.touches.length == 1) {
    if (e.touches[0].pageX > self.innerWidth / 2) {
      LEFT_CONTROL.distance = 0;
      MAIN_CHARACTER.rotation = -LEFT_CONTROL?.angle;
      LEFT_CONTROL = undefined;
    } else {
      MAIN_CHARACTER.rotation = -RIGHT_CONTROL?.angle;
      RIGHT_CONTROL = undefined;
    }
  } else {
    if (LEFT_CONTROL) {
      LEFT_CONTROL.distance = 0;
      MAIN_CHARACTER.rotation = -LEFT_CONTROL?.angle;
      LEFT_CONTROL = undefined;
    }
    if (RIGHT_CONTROL) {
      MAIN_CHARACTER.rotation = -RIGHT_CONTROL?.angle;
      RIGHT_CONTROL = undefined;
    }
  }
});

// Update joystick and character movements...

self.addEventListener("touchmove", (e) => {
  function calc(CONTROLS: Control): void {
    if (e.touches[<number>CONTROLS.touch]!) {
      let { pageX, pageY } = e.touches[<number>CONTROLS.touch]!;
      let quad;

      let distance = Math.round(
        Math.sqrt(
          Math.pow(pageX - CONTROLS.mouseCenter.x, 2) +
            Math.pow(pageY - CONTROLS.mouseCenter.y, 2)
        )
      );

      let angle = Math.round(
        (Math.atan(
          (CONTROLS.mouseCenter.x - pageX) / (CONTROLS.mouseCenter.y - pageY)
        ) *
          180) /
          Math.PI
      );

      if (pageX < CONTROLS.mouseCenter.x && pageY > CONTROLS.mouseCenter.y) {
        quad = 1;
      } else if (
        pageX > CONTROLS.mouseCenter.x &&
        pageY > CONTROLS.mouseCenter.y
      ) {
        quad = 2;
      } else if (
        pageX > CONTROLS.mouseCenter.x &&
        pageY < CONTROLS.mouseCenter.y
      ) {
        quad = 3;
      } else {
        quad = 0;
      }

      if (quad > 0) {
        if (quad == 3) {
          angle = quad * 90 + 180 - (quad * 90 - angle) + 180;
        } else {
          angle = quad * 90 + 180 - (quad * 90 - angle);
        }
      }

      CONTROLS.quad = quad;
      if (distance < <number>GLOBAL_SETTINGS.joystickSize) {
        CONTROLS.mouseX = pageX;
        CONTROLS.mouseY = pageY;
        CONTROLS.angle = (angle * Math.PI) / 180;
        CONTROLS.distance = distance;
      }
    }
  }
  if (RIGHT_CONTROL) {
    calc(RIGHT_CONTROL);
  }
  if (LEFT_CONTROL) {
    calc(LEFT_CONTROL);
  }
});

// Put other objects here for rendering...

const GLOBAL_ELEMENTS: Array<any> = [];

// Put other player objects here for management and rendering...
// Oragnized by <username>:<OtherCharacter instance>

export const PLAYERS: {[index: string]: Characters} = {};

// Defining positional types...

type eyePosType = "open" | "closed";
type handPosType = "top" | "middle" | "bottom";
type timeout = ReturnType<typeof setTimeout>;

// Class for creating character instances...

interface Characters {
[index: string]: any;
width: number;
height: number;
eyePos: eyePosType;
rotation: number;
running: boolean | timeout;
eyeDim: number;
username: string;
speed?: number;
posX?: number;
posY?: number;
x: number;
y: number;
handWidth: number;
handHeight: number;
fixedCenter: {x: number, y: number};
handPos: handPosType;
readonly run?: (boo: boolean) => void;
readonly blink: timeout;
readonly recalculate: () => void;
readonly drawHands: () => void;
readonly drawEyes: () => void;
readonly render: () => void;
}

// Class for other players...

export class OtherCharacter implements Characters {
  constructor (x: number, y: number,username: string,rotation?: number) {
    this.posX = x;
    this.posY = y;
    this.x = GLOBAL_SETTINGS.percent(x,true) - this.width;
    this.y = GLOBAL_SETTINGS.percent(y,true) - this.height;
    this.fixedCenter = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
this.rotation = rotation || 0;
this.username = username;
  }

  [index: string]: any; 
  x: number;
  y: number;
  posX: number;
  posY: number;
  fixedCenter: {x: number,y: number};
  rotation: number;
  username: string;
  width = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charWidth, true);
  height = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charHeight, true);
  eyePos: eyePosType = "open";
  running: boolean | timeout = false;
  speed: number = 0.1;
  eyeDim = GLOBAL_SETTINGS.percent(3, true);
  handWidth = GLOBAL_SETTINGS.percent(4, true);
  handHeight = GLOBAL_SETTINGS.percent(4, true);
  handPos: handPosType = "middle";
  blink: timeout = setInterval(() => {
    this.eyePos = "closed";
    setTimeout(() => {
      this.eyePos = "open";
    }, 1000);
  }, 6000);

run(boo: boolean) {
 if (boo && this.running == false) {
 let time = 200 - this.speed * 100 + 100;

      this.running = setInterval(() => {
        this.handPos = "middle";
        setTimeout(() => {
          this.handPos = "top";
          setTimeout(() => {
            this.handPos = "bottom";
            setTimeout(() => {
              this.handPos = "middle";
            }, time / 3);
          }, time / 3);
        }, time / 3);
      }, time);

} else if (!boo && this.running !== false) {
clearInterval(this.running as timeout);
this.running = false;
}
}

recalculate(x?: number, y?: number): void {
    this.width = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charWidth, true);
    this.height = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charHeight, true) 
     this.x = GLOBAL_SETTINGS.percent(this.posX,true) - this.width/2;
    this.y = GLOBAL_SETTINGS.percent(this.posY,true) - this.height/2; 
       this.handWidth = GLOBAL_SETTINGS.percent(4, true);
    this.handHeight = GLOBAL_SETTINGS.percent(4, true);
    this.eyeDim = GLOBAL_SETTINGS.percent(3, true);
  }

  drawHands(): void {

   let x = GLOBAL_SETTINGS.mapAnchor.x + this.x;
    let y = GLOBAL_SETTINGS.mapAnchor.y + this.y; 

    ctx.lineWidth = DEFAULTS.lineWidth*2;
    if (this.handPos == "middle") {
      ctx.strokeRect(
        x - this.handWidth - 1,
        y + this.height / 2 - this.handHeight / 2,
        this.handWidth,
        this.handHeight
      );
      ctx.strokeRect(
        x + this.width + 1,
        y + this.height / 2 - this.handHeight / 2,
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        x - this.handWidth - 1,
        y + this.height / 2 - this.handHeight / 2,
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        x + this.width + 1,
        y + this.height / 2 - this.handHeight / 2,
        this.handWidth,
        this.handHeight
      );
    } else if (this.handPos == "top") {
      ctx.strokeRect(
        x - this.handWidth - 1,
        y +
          this.height / 2 -
          this.handHeight / 2 -
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.strokeRect(
        x + this.width + 1,
        y +
          this.height / 2 -
          this.handHeight / 2 +
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        x - this.handWidth - 1,
        y +
          this.height / 2 -
          this.handHeight / 2 -
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        x + this.width + 1,
        y +
          this.height / 2 -
          this.handHeight / 2 +
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
    } else {
      ctx.strokeRect(
        x - this.handWidth - 1,
        y +
          this.height / 2 -
          this.handHeight / 2 +
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.strokeRect(
        x + this.width + 1,
        y +
          this.height / 2 -
          this.handHeight / 2 -
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        x - this.handWidth - 1,
        y +
          this.height / 2 -
          this.handHeight / 2 +
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        x + this.width + 1,
        y +
          this.height / 2 -
          this.handHeight / 2 -
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
    }
  }

  drawEyes(): void {

   let x = GLOBAL_SETTINGS.mapAnchor.x + this.x;
    let y = GLOBAL_SETTINGS.mapAnchor.y + this.y; 

    ctx.fillStyle = "black";
    if (this.eyePos == "open") {
      ctx.fillRect(
        x + this.width / 5,
        y,
        this.eyeDim,
        this.eyeDim
      );
      ctx.fillRect(
        x + (this.width / 5) * 3,
        y,
        this.eyeDim,
        this.eyeDim
      );
    } else {
      ctx.fillRect(
        x + this.width / 5,
        y + this.eyeDim / 2,
        this.eyeDim,
        this.eyeDim / 4
      );
      ctx.fillRect(
        x + (this.width / 5) * 3,
        y + this.eyeDim / 2,
        this.eyeDim,
        this.eyeDim / 4
      );
    }
  }

render(): void { 

     let x = GLOBAL_SETTINGS.mapAnchor.x + this.x;
     let y = GLOBAL_SETTINGS.mapAnchor.y + this.y; 

    ctx.beginPath();
    setDefaults();
    ctx.restore();
    ctx.save();
    ctx.translate(x + this.width/2, y + this.height/2);
    ctx.rotate(this.rotation);
    ctx.translate(-x + -(this.width/2), -y + -(this.height/2));
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, this.width, this.height);
    ctx.strokeRect(x, y, this.width, this.height);
    setDefaults();
    this.drawEyes();
    setDefaults();
    this.drawHands();
    ctx.restore();
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = `${GLOBAL_SETTINGS.percent(5,true)}px Arial`;
    ctx.fillStyle = "black";
    ctx.fillText(this.username,x + this.width/2,y - GLOBAL_SETTINGS.percent(8,true));
    setDefaults();
    ctx.restore();
    ctx.save();
   ctx.beginPath();
  }

}

// Class for main characters...

class MainCharacter implements Characters {
  constructor (username: string, x?: number, y?: number) {
    this.username = username;
    this.x = x || GLOBAL_SETTINGS.maxWidth - this.width / 2;
    this.y = y || GLOBAL_SETTINGS.maxHeight - this.height / 2;
    this.fixedX = GLOBAL_SETTINGS.width / 2 - this.width / 2;
    this.fixedY = GLOBAL_SETTINGS.height / 2 - this.height / 2;
    this.fixedCenter = {
      x: this.fixedX + this.width / 2,
      y: this.fixedY + this.height / 2
    };
  }
 
  [index: string]: any;
  x: number;
  y: number;
  fixedX: number;
  fixedY: number;
  fixedCenter: {x: number,y: number};
  username: string;
  width = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charWidth, true);
  height = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charHeight, true);
  eyePos: eyePosType = "open";
  rotation = 0;
  running: boolean | timeout = false;
  eyeDim = GLOBAL_SETTINGS.percent(3, true);
  handWidth = GLOBAL_SETTINGS.percent(4, true);
  handHeight = GLOBAL_SETTINGS.percent(4, true);
  handPos: handPosType = "middle";
  blink: timeout = setInterval(() => {
    this.eyePos = "closed";
    setTimeout(() => {
      this.eyePos = "open";
    }, 1000);
  }, 6000);

  // do some refactoring when the page is resized:

  recalculate(x?: number, y?: number): void {
    this.x = x || GLOBAL_SETTINGS.maxWidth - this.width / 2;
    this.y = y || GLOBAL_SETTINGS.maxHeight - this.height / 2;
    this.fixedX = GLOBAL_SETTINGS.width / 2 - this.width / 2;
    this.fixedY = GLOBAL_SETTINGS.height / 2 - this.height / 2;
    this.fixedCenter = {
      x: this.fixedX + this.width / 2,
      y: this.fixedY + this.height / 2
    };
    this.width = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charWidth, true);
    this.height = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charHeight, true);
    this.handWidth = GLOBAL_SETTINGS.percent(4, true);
    this.handHeight = GLOBAL_SETTINGS.percent(4, true);
    this.eyeDim = GLOBAL_SETTINGS.percent(3, true);
  }

  drawHands(): void {
    ctx.lineWidth = DEFAULTS.lineWidth*2;
    if (this.handPos == "middle") {
      ctx.strokeRect(
        this.fixedX - this.handWidth - 1,
        this.fixedY + this.height / 2 - this.handHeight / 2,
        this.handWidth,
        this.handHeight
      );
      ctx.strokeRect(
        this.fixedX + this.width + 1,
        this.fixedY + this.height / 2 - this.handHeight / 2,
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        this.fixedX - this.handWidth - 1,
        this.fixedY + this.height / 2 - this.handHeight / 2,
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        this.fixedX + this.width + 1,
        this.fixedY + this.height / 2 - this.handHeight / 2,
        this.handWidth,
        this.handHeight
      );
    } else if (this.handPos == "top") {
      ctx.strokeRect(
        this.fixedX - this.handWidth - 1,
        this.fixedY +
          this.height / 2 -
          this.handHeight / 2 -
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.strokeRect(
        this.fixedX + this.width + 1,
        this.fixedY +
          this.height / 2 -
          this.handHeight / 2 +
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        this.fixedX - this.handWidth - 1,
        this.fixedY +
          this.height / 2 -
          this.handHeight / 2 -
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        this.fixedX + this.width + 1,
        this.fixedY +
          this.height / 2 -
          this.handHeight / 2 +
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
    } else {
      ctx.strokeRect(
        this.fixedX - this.handWidth - 1,
        this.fixedY +
          this.height / 2 -
          this.handHeight / 2 +
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.strokeRect(
        this.fixedX + this.width + 1,
        this.fixedY +
          this.height / 2 -
          this.handHeight / 2 -
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        this.fixedX - this.handWidth - 1,
        this.fixedY +
          this.height / 2 -
          this.handHeight / 2 +
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
      ctx.fillRect(
        this.fixedX + this.width + 1,
        this.fixedY +
          this.height / 2 -
          this.handHeight / 2 -
          GLOBAL_SETTINGS.percent(2, true),
        this.handWidth,
        this.handHeight
      );
    }
  }

  drawEyes(): void {
    ctx.fillStyle = "black";
    if (this.eyePos == "open") {
      ctx.fillRect(
        this.fixedX + this.width / 5,
        this.fixedY,
        this.eyeDim,
        this.eyeDim
      );
      ctx.fillRect(
        this.fixedX + (this.width / 5) * 3,
        this.fixedY,
        this.eyeDim,
        this.eyeDim
      );
    } else {
      ctx.fillRect(
        this.fixedX + this.width / 5,
        this.fixedY + this.eyeDim / 2,
        this.eyeDim,
        this.eyeDim / 4
      );
      ctx.fillRect(
        this.fixedX + (this.width / 5) * 3,
        this.fixedY + this.eyeDim / 2,
        this.eyeDim,
        this.eyeDim / 4
      );
    }
  }

  render(): void {
    this.fixedX = GLOBAL_SETTINGS.width / 2 - this.width / 2;
    this.fixedY = GLOBAL_SETTINGS.height / 2 - this.height / 2;

    setDefaults();
    ctx.restore();
    ctx.save();
    ctx.translate(this.fixedCenter.x, this.fixedCenter.y);
    ctx.rotate(
      -RIGHT_CONTROL?.angle! || -LEFT_CONTROL?.angle! || this.rotation || 0
    );
    ctx.translate(-this.fixedCenter.x, -this.fixedCenter.y);
    ctx.fillStyle = "white";
    ctx.fillRect(this.fixedX, this.fixedY, this.width, this.height);
    ctx.strokeRect(this.fixedX, this.fixedY, this.width, this.height);
    setDefaults();
    this.drawEyes();
    setDefaults();

    // Start running animation if left joystick is active:

    if (GLOBAL_SETTINGS?.speed && LEFT_CONTROL && !this.running && LEFT_CONTROL?.distance > 0) {
      let time = 200 - GLOBAL_SETTINGS.speed * 100 + 100;

      this.running = setInterval(() => {
        this.handPos = "middle";
        setTimeout(() => {
          this.handPos = "top";
          setTimeout(() => {
            this.handPos = "bottom";
            setTimeout(() => {
              this.handPos = "middle";
            }, time / 3);
          }, time / 3);
        }, time / 3);
      }, time);
    } else if (this.running && !LEFT_CONTROL?.distance) {
      clearInterval(this.running as timeout);
      this.running = false;
    }

    this.drawHands();
    ctx.restore();
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = `${GLOBAL_SETTINGS.percent(5,true)}px Arial`;
    ctx.fillStyle = "black";
    ctx.fillText(this.username,this.fixedCenter.x,this.fixedCenter.y - GLOBAL_SETTINGS.percent(8,true) - this.height/2);
    setDefaults();
    ctx.restore();
    ctx.save();
  }
}

// Defining main character instance...

export const MAIN_CHARACTER = new MainCharacter(username);

// Auto Resizing Control...

self.addEventListener("resize", () => {
  resize();
  DEFAULTS.lineWidth = (self.innerWidth <= 800) ? (self.innerWidth <= 400) ? 2:2.5:3,
  DEFAULTS.font = `${GLOBAL_SETTINGS.percent(5, true)} Arial`;
});

function resize(init?: boolean): void {
  canvas.style.width = self.innerWidth + "px";
  canvas.style.height = self.innerHeight + "px";
  canvas.width = self.innerWidth;
  canvas.height = self.innerHeight;

  GLOBAL_SETTINGS.prevDim = {
    width: GLOBAL_SETTINGS.width,
    height: GLOBAL_SETTINGS.height
  };

  if (!init){
    GLOBAL_SETTINGS.mapAnchor.x =
      self.innerWidth / 2 +
      GLOBAL_SETTINGS.percent(
        ((GLOBAL_SETTINGS.mapAnchor.x - GLOBAL_SETTINGS.globalCenter.x) /
          GLOBAL_SETTINGS.width) *
          100,
        false,
        self.innerWidth
      );
   
    GLOBAL_SETTINGS.mapAnchor.y =
      self.innerHeight / 2 +
      GLOBAL_SETTINGS.percent(
        ((GLOBAL_SETTINGS.mapAnchor.y - GLOBAL_SETTINGS.globalCenter.y) /
          GLOBAL_SETTINGS.height) *
          100,
        false,
        self.innerHeight
      );
     }

  GLOBAL_SETTINGS.width = self.innerWidth;
  GLOBAL_SETTINGS.height = self.innerHeight;
  GLOBAL_SETTINGS.joystickSize = GLOBAL_SETTINGS.percent(
    GLOBAL_SETTINGS.controlSize,
    true
  );

  GLOBAL_SETTINGS.globalCenter = {
    x: self.innerWidth / 2,
    y: self.innerHeight / 2
  };

  GLOBAL_SETTINGS.speed = GLOBAL_SETTINGS.percent(
    GLOBAL_SETTINGS.speedFactor,
    true
  );

  if (GLOBAL_ELEMENTS.length) {
    for (let i of GLOBAL_ELEMENTS) i?.recalculate();
  }

 if (Object.keys(PLAYERS).length) {
  for (let player in PLAYERS) PLAYERS[player].recalculate();
  } 

  MAIN_CHARACTER.recalculate();
}

const start: Function = (): void => {
  requestAnimationFrame(render);
};

// IMPORT SERVER COMMUNICATION FUNCTIONS__________________________

import {
new_user,
update
} from "./client.ts";

new_user();

// Initilize dimension sizing___________________________

resize(true);

function render(): void {
  ctx.clearRect(0, 0, GLOBAL_SETTINGS.width, GLOBAL_SETTINGS.height);

  if (DEFAULT_BACKGROUND) {
    DEFAULT_BACKGROUND.render();
  }

// Render characters...
  if (Object.keys(PLAYERS).length) {
  for (let player in PLAYERS) PLAYERS[player].render();
  }

// Render objects...
   if (GLOBAL_ELEMENTS.length) {
    for (let OBJ of GLOBAL_ELEMENTS) OBJ.render()!;
  }

  MAIN_CHARACTER.render();

  if (LEFT_CONTROL?.active) {
    LEFT_CONTROL.render();
    let { mapAnchor, speed, percent } = GLOBAL_SETTINGS!;
 if (speed) {
    speed *= 5;

    switch (LEFT_CONTROL.quad) {
      case 0:
        mapAnchor.x += speed;
        mapAnchor.y += speed;
        break;
      case 1:
        mapAnchor.x += speed;
        mapAnchor.y -= speed;
        break;
      case 2:
        mapAnchor.x -= speed;
        mapAnchor.y -= speed;
        break;
      case 3:
        mapAnchor.x -= speed;
        mapAnchor.y += speed;
        break;
    }
 }
  }

  if (RIGHT_CONTROL?.active) {
    RIGHT_CONTROL.render();
  }

update();

// Call next frame...
  requestAnimationFrame(render);
}

// Start running the frames...

start();
