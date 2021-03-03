
import "./styles.css";

// Aditional info

/* Speed clases: 0.1 (lowest speed) - 2 (top speed) 20 speed clases total */

// Initial Canvas And Global Setup...

const canvas = document.querySelector("canvas")!;
canvas.onclick = () => {
  document.body.requestFullscreen();
};

const ctx = canvas.getContext("2d")!;

// Default canvas settings...

function setDefaults(
  lineWidth?: boolean,
  strokeStyle?: boolean,
  fillStyle?: boolean,
  globalAlpha?: boolean,
  rotation?: boolean
): void {
  if (!lineWidth) {
    ctx.lineWidth = 2;
  }
  if (!strokeStyle) {
    ctx.strokeStyle = "black";
  }
  if (!fillStyle) {
    ctx.fillStyle = "white";
  }
  if (!globalAlpha) {
    ctx.globalAlpha = 1;
  }
}

setDefaults();

ctx.save();

// Common properties for accessability...

type joystick = undefined | number;

const GLOBAL_SETTINGS: {
  readonly charWidth: number;
  readonly charHeight: number;
  readonly controlSize: number;
  joystickSize: joystick;
  readonly scale: number;
  readonly speedFactor: number;
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
  width: window.innerWidth,
  height: window.innerHeight,
  prevDim: undefined,
  globalCenter: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  mapAnchor: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
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

// Default map...

let BACKGROUND = new Mapp(5000, 5000, () => {
  let { x, y } = GLOBAL_SETTINGS.mapAnchor;
  let { percent } = GLOBAL_SETTINGS;
  setDefaults();
  ctx.beginPath();
  ctx.rect(
    x - percent(60.5, true),
    y - percent(50, true),
    percent(125, true),
    percent(100, true)
  );
  ctx.rect(
    x - percent(25, true),
    y - percent(25, true),
    percent(50, true),
    percent(50, true)
  );
  ctx.stroke();
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

let LEFT_CONTROL: Control | undefined, RIGHT_CONTROL: Control | undefined;

// Anchor and render joysticks...

window.addEventListener("touchstart", (e) => {
  let { pageX, pageY } = e.touches![e.touches!.length - 1];

  let JOYSTICK = new CONTROL();
  JOYSTICK.touch = e.touches.length - 1;
  JOYSTICK.mouseCenter.x = pageX;
  JOYSTICK.mouseCenter.y = pageY;
  JOYSTICK.mouseX = pageX;
  JOYSTICK.mouseY = pageY;
  JOYSTICK.active = true;

  if (
    pageX > window.innerWidth / 2 &&
    e.touches.length !== 3 &&
    pageY > window.innerHeight / 2
  ) {
    if (RIGHT_CONTROL?.touch == undefined) {
      RIGHT_CONTROL = JOYSTICK;
    }
  } else if (
    pageX < window.innerWidth / 2 &&
    e.touches.length !== 3 &&
    pageY > window.innerHeight / 2
  ) {
    if (LEFT_CONTROL?.touch == undefined) {
      LEFT_CONTROL = JOYSTICK;
    }
  }
});

// Hide joysticks and stop character movements...

window.addEventListener("touchend", (e) => {
  if (LEFT_CONTROL && RIGHT_CONTROL && e.touches && e.touches.length == 1) {
    if (e.touches[0].pageX > window.innerWidth / 2) {
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

window.addEventListener("touchmove", (e) => {
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

const PLAYERS: {[index: string]: {render: Function}} = {};

// Defining positional types...

type eyePosType = "open" | "closed";
type handPosType = "top" | "middle" | "bottom";
type timeout = ReturnType<typeof setTimeout>;

// Interface for creating character instances...

interface Characters {
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
readonly blink: timeout;
readonly recalculate: () => void;
readonly drawHands: () => void;
readonly drawEyes: () => void;
readonly render: () => void;
}

// Class for other players...

class OtherCharacter implements Characters {
  constructor (x: number, y: number,rotation: number,username: string) {
    this.posX = x;
    this.posY = y;
    this.x = GLOBAL_SETTINGS.percent(x,true) - this.width/2;
    this.y = GLOBAL_SETTINGS.percent(y,true) - this.height/2;
    this.fixedCenter = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
this.rotation = rotation || 0;
this.username = username;
  }
 
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

recalculate(x?: number, y?: number): void {
    this.width = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charWidth, true);
    this.height = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charHeight, true); 
     this.x = GLOBAL_SETTINGS.percent(this.posX,true) - this.width/2;
    this.y = GLOBAL_SETTINGS.percent(this.posY,true) - this.height/2; 
       this.handWidth = GLOBAL_SETTINGS.percent(4, true);
    this.handHeight = GLOBAL_SETTINGS.percent(4, true);
    this.eyeDim = GLOBAL_SETTINGS.percent(3, true);
  }

  drawHands(): void {

   let x = GLOBAL_SETTINGS.mapAnchor.x + this.x;
    let y = GLOBAL_SETTINGS.mapAnchor.y + this.y; 

    ctx.lineWidth = 4;
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

    // Start running animation if left joystick is active:

    if (this.running) {
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
    } 

    this.drawHands();
    ctx.restore();
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = "15px Arial";
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
  constructor (username: string,x?: number, y?: number) {
    this.x = x || GLOBAL_SETTINGS.maxWidth - this.width / 2;
    this.y = y || GLOBAL_SETTINGS.maxHeight - this.height / 2;
    this.fixedX = GLOBAL_SETTINGS.width / 2 - this.width / 2;
    this.fixedY = GLOBAL_SETTINGS.height / 2 - this.height / 2;
    this.username = username;
    this.fixedCenter = {
      x: this.fixedX + this.width / 2,
      y: this.fixedY + this.height / 2
    };
  }
 
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
    ctx.lineWidth = 4;
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
setDefaults();
ctx.restore();
ctx.save();
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
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(this.username,this.fixedCenter.x,this.fixedCenter.y - GLOBAL_SETTINGS.percent(8,true) - this.height/2);
    setDefaults();
    ctx.restore();
    ctx.save();
  } 
}

// Defining main character instance...

const MAIN_CHARACTER = new MainCharacter("ZippCodder Lv.0.1");

// Auto Resizing Control...

window.addEventListener("resize", () => {
  resize();
});

function resize(init?: boolean): void {
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  GLOBAL_SETTINGS.prevDim = {
    width: GLOBAL_SETTINGS.width,
    height: GLOBAL_SETTINGS.height
  };

  if (!init) {
    GLOBAL_SETTINGS.mapAnchor.x =
      window.innerWidth / 2 +
      GLOBAL_SETTINGS.percent(
        ((GLOBAL_SETTINGS.mapAnchor.x - GLOBAL_SETTINGS.globalCenter.x) /
          GLOBAL_SETTINGS.width) *
          100,
        false,
        window.innerWidth
      );
   
    GLOBAL_SETTINGS.mapAnchor.y =
      window.innerHeight / 2 +
      GLOBAL_SETTINGS.percent(
        ((GLOBAL_SETTINGS.mapAnchor.y - GLOBAL_SETTINGS.globalCenter.y) /
          GLOBAL_SETTINGS.height) *
          100,
        false,
        window.innerHeight
      );
     }

  GLOBAL_SETTINGS.width = window.innerWidth;
  GLOBAL_SETTINGS.height = window.innerHeight;
  GLOBAL_SETTINGS.joystickSize = GLOBAL_SETTINGS.percent(
    GLOBAL_SETTINGS.controlSize,
    true
  );

  GLOBAL_SETTINGS.globalCenter = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  GLOBAL_SETTINGS.speed = GLOBAL_SETTINGS.percent(
    GLOBAL_SETTINGS.speedFactor,
    true
  );

  if (GLOBAL_ELEMENTS.length) {
    for (let i of GLOBAL_ELEMENTS) i?.recalculate();
  }

  MAIN_CHARACTER.recalculate();
}

resize(true);

const start: Function = (): void => {
  requestAnimationFrame(render);
};

function render(): void {
// Clear canvas...
  ctx.clearRect(0, 0, GLOBAL_SETTINGS.width, GLOBAL_SETTINGS.height);

// Render background...
  if (BACKGROUND) {
    BACKGROUND.render();
  }

// Render characters...
  if (Object.keys(PLAYERS).length) {
  for (let player in PLAYERS) PLAYERS[player].render();
  }

// Render objects...
   if (GLOBAL_ELEMENTS.length) {
    for (let OBJ of GLOBAL_ELEMENTS) OBJ.render()!;
  }

// Render main character...
  MAIN_CHARACTER.render();

// Render controls...
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

// Call next frame...
  requestAnimationFrame(render);
}

// Start running the frames...

start();

