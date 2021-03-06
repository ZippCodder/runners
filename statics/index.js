// Aditional info
/* Speed clases: 0.1 (lowest speed) - 2 (top speed) 20 speed clases total */
// Initial Canvas And Global Setup...
var canvas = document.querySelector("canvas");
canvas.onclick = function () {
    document.body.requestFullscreen();
};
var ctx = canvas.getContext("2d");
// Default canvas settings...
function setDefaults(lineWidth, strokeStyle, fillStyle, globalAlpha, rotation) {
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
var GLOBAL_SETTINGS = {
    charWidth: 15,
    charHeight: 15,
    controlSize: 25,
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
    percent: function (num, h, o) {
        if (h) {
            return (((num / 100) * GLOBAL_SETTINGS.height) / GLOBAL_SETTINGS.scale +
                ((num / 100) * GLOBAL_SETTINGS.width) / GLOBAL_SETTINGS.scale);
        }
        else if (o) {
            return (num / 100) * o;
        }
        return (num / 100) * GLOBAL_SETTINGS.width;
    }
};
// Class for making maps...
var Mapp = /** @class */ (function () {
    function Mapp(width, height, render) {
        this.width = width;
        this.height = height;
        this.render = render;
    }
    return Mapp;
}());
// Default map...
var BACKGROUND = new Mapp(5000, 5000, function () {
    var _a = GLOBAL_SETTINGS.mapAnchor, x = _a.x, y = _a.y;
    var percent = GLOBAL_SETTINGS.percent;
    setDefaults();
    ctx.beginPath();
    ctx.rect(x - percent(60.5, true), y - percent(50, true), percent(125, true), percent(100, true));
    ctx.rect(x - percent(25, true), y - percent(25, true), percent(50, true), percent(50, true));
    ctx.stroke();
});
var CONTROL = /** @class */ (function () {
    function CONTROL() {
        this.active = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.angle = 0;
        this.quad = 0;
        this.distance = 0;
        this.touch = undefined;
        this.mouseCenter = { x: 0, y: 0 };
    }
    CONTROL.prototype.render = function () {
        setDefaults();
        ctx.moveTo(this.mouseCenter.x, this.mouseCenter.y);
        ctx.beginPath();
        ctx.arc(this.mouseCenter.x, this.mouseCenter.y, GLOBAL_SETTINGS.joystickSize, 0, 2 * Math.PI);
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.stroke();
        if (this.mouseX && this.mouseY) {
            ctx.beginPath();
            ctx.arc(this.mouseX, this.mouseY, GLOBAL_SETTINGS.joystickSize / 2 || 10, 0, 2 * Math.PI);
            ctx.fillStyle = "gray";
            ctx.globalAlpha = 0.5;
            ctx.fill();
        }
        ctx.stroke();
    };
    return CONTROL;
}());
// Left and right joystick...
var LEFT_CONTROL, RIGHT_CONTROL;
// Anchor and render joysticks...
window.addEventListener("touchstart", function (e) {
    var _a = e.touches[e.touches.length - 1], pageX = _a.pageX, pageY = _a.pageY;
    var JOYSTICK = new CONTROL();
    JOYSTICK.touch = e.touches.length - 1;
    JOYSTICK.mouseCenter.x = pageX;
    JOYSTICK.mouseCenter.y = pageY;
    JOYSTICK.mouseX = pageX;
    JOYSTICK.mouseY = pageY;
    JOYSTICK.active = true;
    if (pageX > window.innerWidth / 2 &&
        e.touches.length !== 3 &&
        pageY > window.innerHeight / 2) {
        if ((RIGHT_CONTROL === null || RIGHT_CONTROL === void 0 ? void 0 : RIGHT_CONTROL.touch) == undefined) {
            RIGHT_CONTROL = JOYSTICK;
        }
    }
    else if (pageX < window.innerWidth / 2 &&
        e.touches.length !== 3 &&
        pageY > window.innerHeight / 2) {
        if ((LEFT_CONTROL === null || LEFT_CONTROL === void 0 ? void 0 : LEFT_CONTROL.touch) == undefined) {
            LEFT_CONTROL = JOYSTICK;
        }
    }
});
// Hide joysticks and stop character movements...
window.addEventListener("touchend", function (e) {
    if (e.touches.length == 1) {
        if (e.touches[0].pageX > window.innerWidth / 2) {
            LEFT_CONTROL.distance = 0;
            MAIN_CHARACTER.rotation = -(LEFT_CONTROL === null || LEFT_CONTROL === void 0 ? void 0 : LEFT_CONTROL.angle);
            LEFT_CONTROL = undefined;
        }
        else {
            MAIN_CHARACTER.rotation = -(RIGHT_CONTROL === null || RIGHT_CONTROL === void 0 ? void 0 : RIGHT_CONTROL.angle);
            RIGHT_CONTROL = undefined;
        }
    }
    else {
        if (LEFT_CONTROL) {
            LEFT_CONTROL.distance = 0;
            MAIN_CHARACTER.rotation = -(LEFT_CONTROL === null || LEFT_CONTROL === void 0 ? void 0 : LEFT_CONTROL.angle);
            LEFT_CONTROL = undefined;
        }
        if (RIGHT_CONTROL) {
            MAIN_CHARACTER.rotation = -(RIGHT_CONTROL === null || RIGHT_CONTROL === void 0 ? void 0 : RIGHT_CONTROL.angle);
            RIGHT_CONTROL = undefined;
        }
    }
});
// Update joystick and character movements...
window.addEventListener("touchmove", function (e) {
    function calc(CONTROLS) {
        if (e.touches[CONTROLS.touch]) {
            var _a = e.touches[CONTROLS.touch], pageX = _a.pageX, pageY = _a.pageY;
            var quad = void 0;
            var distance = Math.round(Math.sqrt(Math.pow(pageX - CONTROLS.mouseCenter.x, 2) +
                Math.pow(pageY - CONTROLS.mouseCenter.y, 2)));
            var angle = Math.round((Math.atan((CONTROLS.mouseCenter.x - pageX) / (CONTROLS.mouseCenter.y - pageY)) *
                180) /
                Math.PI);
            if (pageX < CONTROLS.mouseCenter.x && pageY > CONTROLS.mouseCenter.y) {
                quad = 1;
            }
            else if (pageX > CONTROLS.mouseCenter.x &&
                pageY > CONTROLS.mouseCenter.y) {
                quad = 2;
            }
            else if (pageX > CONTROLS.mouseCenter.x &&
                pageY < CONTROLS.mouseCenter.y) {
                quad = 3;
            }
            else {
                quad = 0;
            }
            if (quad > 0) {
                if (quad == 3) {
                    angle = quad * 90 + 180 - (quad * 90 - angle) + 180;
                }
                else {
                    angle = quad * 90 + 180 - (quad * 90 - angle);
                }
            }
            CONTROLS.quad = quad;
            if (distance < GLOBAL_SETTINGS.joystickSize) {
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
var GLOBAL_ELEMENTS = [];
var MainCharacter = /** @class */ (function () {
    function MainCharacter(x, y) {
        var _this = this;
        this.width = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charWidth, true);
        this.height = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.charHeight, true);
        this.eyePos = "open";
        this.rotation = 0;
        this.running = false;
        this.eyeDim = GLOBAL_SETTINGS.percent(3, true);
        this.handWidth = GLOBAL_SETTINGS.percent(4, true);
        this.handHeight = GLOBAL_SETTINGS.percent(4, true);
        this.handPos = "middle";
        this.blink = setInterval(function () {
            _this.eyePos = "closed";
            setTimeout(function () {
                _this.eyePos = "open";
            }, 1000);
        }, 6000);
        this.x = x || GLOBAL_SETTINGS.maxWidth - this.width / 2;
        this.y = y || GLOBAL_SETTINGS.maxHeight - this.height / 2;
        this.fixedX = GLOBAL_SETTINGS.width / 2 - this.width / 2;
        this.fixedY = GLOBAL_SETTINGS.height / 2 - this.height / 2;
        this.fixedCenter = {
            x: this.fixedX + this.width / 2,
            y: this.fixedY + this.height / 2
        };
    }
    // do some refactoring when the page is resized:
    MainCharacter.prototype.recalculate = function (x, y) {
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
    };
    MainCharacter.prototype.drawHands = function () {
        ctx.lineWidth = 4;
        if (this.handPos == "middle") {
            ctx.strokeRect(this.fixedX - this.handWidth - 1, this.fixedY + this.height / 2 - this.handHeight / 2, this.handWidth, this.handHeight);
            ctx.strokeRect(this.fixedX + this.width + 1, this.fixedY + this.height / 2 - this.handHeight / 2, this.handWidth, this.handHeight);
            ctx.fillRect(this.fixedX - this.handWidth - 1, this.fixedY + this.height / 2 - this.handHeight / 2, this.handWidth, this.handHeight);
            ctx.fillRect(this.fixedX + this.width + 1, this.fixedY + this.height / 2 - this.handHeight / 2, this.handWidth, this.handHeight);
        }
        else if (this.handPos == "top") {
            ctx.strokeRect(this.fixedX - this.handWidth - 1, this.fixedY +
                this.height / 2 -
                this.handHeight / 2 -
                GLOBAL_SETTINGS.percent(2, true), this.handWidth, this.handHeight);
            ctx.strokeRect(this.fixedX + this.width + 1, this.fixedY +
                this.height / 2 -
                this.handHeight / 2 +
                GLOBAL_SETTINGS.percent(2, true), this.handWidth, this.handHeight);
            ctx.fillRect(this.fixedX - this.handWidth - 1, this.fixedY +
                this.height / 2 -
                this.handHeight / 2 -
                GLOBAL_SETTINGS.percent(2, true), this.handWidth, this.handHeight);
            ctx.fillRect(this.fixedX + this.width + 1, this.fixedY +
                this.height / 2 -
                this.handHeight / 2 +
                GLOBAL_SETTINGS.percent(2, true), this.handWidth, this.handHeight);
        }
        else {
            ctx.strokeRect(this.fixedX - this.handWidth - 1, this.fixedY +
                this.height / 2 -
                this.handHeight / 2 +
                GLOBAL_SETTINGS.percent(2, true), this.handWidth, this.handHeight);
            ctx.strokeRect(this.fixedX + this.width + 1, this.fixedY +
                this.height / 2 -
                this.handHeight / 2 -
                GLOBAL_SETTINGS.percent(2, true), this.handWidth, this.handHeight);
            ctx.fillRect(this.fixedX - this.handWidth - 1, this.fixedY +
                this.height / 2 -
                this.handHeight / 2 +
                GLOBAL_SETTINGS.percent(2, true), this.handWidth, this.handHeight);
            ctx.fillRect(this.fixedX + this.width + 1, this.fixedY +
                this.height / 2 -
                this.handHeight / 2 -
                GLOBAL_SETTINGS.percent(2, true), this.handWidth, this.handHeight);
        }
    };
    MainCharacter.prototype.drawEyes = function () {
        ctx.fillStyle = "black";
        if (this.eyePos == "open") {
            ctx.fillRect(this.fixedX + this.width / 5, this.fixedY, this.eyeDim, this.eyeDim);
            ctx.fillRect(this.fixedX + (this.width / 5) * 3, this.fixedY, this.eyeDim, this.eyeDim);
        }
        else {
            ctx.fillRect(this.fixedX + this.width / 5, this.fixedY + this.eyeDim / 2, this.eyeDim, this.eyeDim / 4);
            ctx.fillRect(this.fixedX + (this.width / 5) * 3, this.fixedY + this.eyeDim / 2, this.eyeDim, this.eyeDim / 4);
        }
    };
    MainCharacter.prototype.render = function () {
        var _this = this;
        this.fixedX = GLOBAL_SETTINGS.width / 2 - this.width / 2;
        this.fixedY = GLOBAL_SETTINGS.height / 2 - this.height / 2;
        setDefaults();
        ctx.restore();
        ctx.save();
        ctx.translate(this.fixedCenter.x, this.fixedCenter.y);
        ctx.rotate(-(RIGHT_CONTROL === null || RIGHT_CONTROL === void 0 ? void 0 : RIGHT_CONTROL.angle) || -(LEFT_CONTROL === null || LEFT_CONTROL === void 0 ? void 0 : LEFT_CONTROL.angle) || this.rotation || 0);
        ctx.translate(-this.fixedCenter.x, -this.fixedCenter.y);
        ctx.fillStyle = "white";
        ctx.fillRect(this.fixedX, this.fixedY, this.width, this.height);
        ctx.strokeRect(this.fixedX, this.fixedY, this.width, this.height);
        setDefaults();
        this.drawEyes();
        setDefaults();
        // Start running animation if left joystick is active:
        if (!this.running && (LEFT_CONTROL === null || LEFT_CONTROL === void 0 ? void 0 : LEFT_CONTROL.distance) > 0) {
            var time_1 = 200 - GLOBAL_SETTINGS.speed * 100 + 100;
            this.running = setInterval(function () {
                _this.handPos = "middle";
                setTimeout(function () {
                    _this.handPos = "top";
                    setTimeout(function () {
                        _this.handPos = "bottom";
                        setTimeout(function () {
                            _this.handPos = "middle";
                        }, time_1 / 3);
                    }, time_1 / 3);
                }, time_1 / 3);
            }, time_1);
        }
        else if (this.running && !(LEFT_CONTROL === null || LEFT_CONTROL === void 0 ? void 0 : LEFT_CONTROL.distance)) {
            clearInterval(this.running);
            this.running = false;
        }
        this.drawHands();
        setDefaults();
        ctx.restore();
        ctx.save();
    };
    return MainCharacter;
}());
var MAIN_CHARACTER = new MainCharacter();
// Auto Resizing Control...
window.addEventListener("resize", function () {
    resize();
});
function resize(init) {
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
                GLOBAL_SETTINGS.percent(((GLOBAL_SETTINGS.mapAnchor.x - GLOBAL_SETTINGS.globalCenter.x) /
                    GLOBAL_SETTINGS.width) *
                    100, false, window.innerWidth);
        GLOBAL_SETTINGS.mapAnchor.y =
            window.innerHeight / 2 +
                GLOBAL_SETTINGS.percent(((GLOBAL_SETTINGS.mapAnchor.y - GLOBAL_SETTINGS.globalCenter.y) /
                    GLOBAL_SETTINGS.height) *
                    100, false, window.innerHeight);
    }
    GLOBAL_SETTINGS.width = window.innerWidth;
    GLOBAL_SETTINGS.height = window.innerHeight;
    GLOBAL_SETTINGS.joystickSize = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.controlSize, true);
    GLOBAL_SETTINGS.globalCenter = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };
    GLOBAL_SETTINGS.speed = GLOBAL_SETTINGS.percent(GLOBAL_SETTINGS.speedFactor, true);
    if (GLOBAL_ELEMENTS.length) {
        for (var _i = 0, GLOBAL_ELEMENTS_1 = GLOBAL_ELEMENTS; _i < GLOBAL_ELEMENTS_1.length; _i++) {
            var i = GLOBAL_ELEMENTS_1[_i];
            i === null || i === void 0 ? void 0 : i.recalculate();
        }
    }
    MAIN_CHARACTER.recalculate();
}
resize(true);
var start = function () {
    requestAnimationFrame(render);
};
function render() {
    ctx.clearRect(0, 0, GLOBAL_SETTINGS.width, GLOBAL_SETTINGS.height);
    if (BACKGROUND) {
        BACKGROUND.render();
    }
    if (GLOBAL_ELEMENTS.length) {
        for (var _i = 0, GLOBAL_ELEMENTS_2 = GLOBAL_ELEMENTS; _i < GLOBAL_ELEMENTS_2.length; _i++) {
            var OBJ = GLOBAL_ELEMENTS_2[_i];
            OBJ.render();
        }
    }
    MAIN_CHARACTER.render();
    if (LEFT_CONTROL === null || LEFT_CONTROL === void 0 ? void 0 : LEFT_CONTROL.active) {
        LEFT_CONTROL.render();
        var mapAnchor = GLOBAL_SETTINGS.mapAnchor, speed = GLOBAL_SETTINGS.speed, percent = GLOBAL_SETTINGS.percent;
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
    if (RIGHT_CONTROL === null || RIGHT_CONTROL === void 0 ? void 0 : RIGHT_CONTROL.active) {
        RIGHT_CONTROL.render();
    }
    requestAnimationFrame(render);
}
// Start running the frames...
start();
