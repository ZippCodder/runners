(()=>{"use strict";var t={28:(t,e,i)=>{i.d(e,{Z:()=>r});var h=i(645),n=i.n(h)()((function(t){return t[1]}));n.push([t.id,"html,\nbody {\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  overscroll-behavior: contain;\n}\n\ncanvas {\nbackground: white;\n}\n\n",""]);const r=n},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=t(e);return e[2]?"@media ".concat(e[2]," {").concat(i,"}"):i})).join("")},e.i=function(t,i,h){"string"==typeof t&&(t=[[null,t,""]]);var n={};if(h)for(var r=0;r<this.length;r++){var s=this[r][0];null!=s&&(n[s]=!0)}for(var o=0;o<t.length;o++){var a=[].concat(t[o]);h&&n[a[0]]||(i&&(a[2]?a[2]="".concat(i," and ").concat(a[2]):a[2]=i),e.push(a))}},e}},379:(t,e,i)=>{var h,n=function(){var t={};return function(e){if(void 0===t[e]){var i=document.querySelector(e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}t[e]=i}return t[e]}}(),r=[];function s(t){for(var e=-1,i=0;i<r.length;i++)if(r[i].identifier===t){e=i;break}return e}function o(t,e){for(var i={},h=[],n=0;n<t.length;n++){var o=t[n],a=e.base?o[0]+e.base:o[0],c=i[a]||0,d="".concat(a," ").concat(c);i[a]=c+1;var l=s(d),u={css:o[1],media:o[2],sourceMap:o[3]};-1!==l?(r[l].references++,r[l].updater(u)):r.push({identifier:d,updater:g(u,e),references:1}),h.push(d)}return h}function a(t){var e=document.createElement("style"),h=t.attributes||{};if(void 0===h.nonce){var r=i.nc;r&&(h.nonce=r)}if(Object.keys(h).forEach((function(t){e.setAttribute(t,h[t])})),"function"==typeof t.insert)t.insert(e);else{var s=n(t.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(e)}return e}var c,d=(c=[],function(t,e){return c[t]=e,c.filter(Boolean).join("\n")});function l(t,e,i,h){var n=i?"":h.media?"@media ".concat(h.media," {").concat(h.css,"}"):h.css;if(t.styleSheet)t.styleSheet.cssText=d(e,n);else{var r=document.createTextNode(n),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(r,s[e]):t.appendChild(r)}}function u(t,e,i){var h=i.css,n=i.media,r=i.sourceMap;if(n?t.setAttribute("media",n):t.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(h+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleSheet)t.styleSheet.cssText=h;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(h))}}var f=null,p=0;function g(t,e){var i,h,n;if(e.singleton){var r=p++;i=f||(f=a(e)),h=l.bind(null,i,r,!1),n=l.bind(null,i,r,!0)}else i=a(e),h=u.bind(null,i,e),n=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(i)};return h(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;h(t=e)}else n()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===h&&(h=Boolean(window&&document&&document.all&&!window.atob)),h));var i=o(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var h=0;h<i.length;h++){var n=s(i[h]);r[n].references--}for(var a=o(t,e),c=0;c<i.length;c++){var d=s(i[c]);0===r[d].references&&(r[d].updater(),r.splice(d,1))}i=a}}}}},e={};function i(h){if(e[h])return e[h].exports;var n=e[h]={id:h,exports:{}};return t[h](n,n.exports,i),n.exports}i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var h in e)i.o(e,h)&&!i.o(t,h)&&Object.defineProperty(t,h,{enumerable:!0,get:e[h]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var h={};(()=>{i.d(h,{kg:()=>f,J3:()=>m,w3:()=>b,vM:()=>W,Iq:()=>H,HU:()=>v,Xl:()=>u,j_:()=>g});var t=i(379),e=i.n(t),n=i(28);function r(t,e,i){var h=f.percent,n=f.mapAnchor,r=n.x,s=n.y;u.beginPath(),"left"==i?(u.rect(r+h(t,!0),s+h(e,!0),h(20,!0),h(50,!0)),u.rect(r+h(t+8,!0),s+h(e,!0),h(6,!0),h(50,!0)),u.rect(r+h(t-5,!0),s+h(e+2,!0),h(5,!0),h(3,!0)),u.rect(r+h(t-5,!0),s+h(e+45,!0),h(5,!0),h(3,!0)),u.moveTo(r+h(t+2,!0),s+h(e,!0)),u.lineTo(r+h(t+2,!0),s+h(e+50,!0))):"right"==i?(u.rect(r+h(t,!0),s+h(e,!0),h(20,!0),h(50,!0)),u.rect(r+h(t+6,!0),s+h(e,!0),h(6,!0),h(50,!0)),u.rect(r+h(t+20,!0),s+h(e+2,!0),h(5,!0),h(3,!0)),u.rect(r+h(t+20,!0),s+h(e+45,!0),h(5,!0),h(3,!0)),u.moveTo(r+h(t+18,!0),s+h(e,!0)),u.lineTo(r+h(t+18,!0),s+h(e+50,!0))):"up"==i?(u.rect(r+h(t,!0),s+h(e,!0),h(50,!0),h(20,!0)),u.rect(r+h(t,!0),s+h(e+8,!0),h(50,!0),h(6,!0)),u.rect(r+h(t+45,!0),s+h(e-5,!0),h(3,!0),h(5,!0)),u.rect(r+h(t+2,!0),s+h(e-5,!0),h(3,!0),h(5,!0)),u.moveTo(r+h(t,!0),s+h(e+2,!0)),u.lineTo(r+h(t+50,!0),s+h(e+2,!0))):"down"==i&&(u.rect(r+h(t,!0),s+h(e,!0),h(50,!0),h(20,!0)),u.rect(r+h(t,!0),s+h(e+6,!0),h(50,!0),h(6,!0)),u.rect(r+h(t+45,!0),s+h(e+20,!0),h(3,!0),h(5,!0)),u.rect(r+h(t+2,!0),s+h(e+20,!0),h(3,!0),h(5,!0)),u.moveTo(r+h(t,!0),s+h(e+18,!0)),u.lineTo(r+h(t+50,!0),s+h(e+18,!0))),u.stroke()}function s(t,e,i){var h=f.percent,n=f.mapAnchor,r=n.x,s=n.y;u.beginPath(),"horizontal"==i?(u.rect(r+h(t,!0),s+h(e,!0),h(130,!0),h(10,!0)),u.rect(r+h(t,!0),s+h(e+60,!0),h(130,!0),h(10,!0)),u.rect(r+h(t+26,!0),s+h(e+33.5,!0),h(26,!0),h(3,!0)),u.rect(r+h(t+78,!0),s+h(e+33.5,!0),h(26,!0),h(3,!0))):"vertical"==i?(u.rect(r+h(t,!0),s+h(e,!0),h(10,!0),h(130,!0)),u.rect(r+h(t+60,!0),s+h(e,!0),h(10,!0),h(130,!0)),u.rect(r+h(t+33.5,!0),s+h(e+26,!0),h(3,!0),h(26,!0)),u.rect(r+h(t+33.5,!0),s+h(e+78,!0),h(3,!0),h(26,!0))):"L_corner"==i?(u.rect(r+h(t,!0),s+h(e,!0),h(60,!0),h(10,!0)),u.rect(r+h(t+60,!0),s+h(e,!0),h(10,!0),h(70,!0)),u.rect(r+h(t,!0),s+h(e+60,!0),h(10,!0),h(10,!0)),u.rect(r+h(t,!0),s+h(e+33.5,!0),h(26,!0),h(3,!0))):"R_corner"==i?(u.rect(r+h(t,!0),s+h(e,!0),h(10,!0),h(70,!0)),u.rect(r+h(t+10,!0),s+h(e,!0),h(60,!0),h(10,!0)),u.rect(r+h(t+60,!0),s+h(e+60,!0),h(10,!0),h(10,!0)),u.rect(r+h(t+44,!0),s+h(e+33.5,!0),h(26,!0),h(3,!0))):"U_corner"==i?(u.rect(r+h(t,!0),s+h(e,!0),h(10,!0),h(70,!0)),u.rect(r+h(t+10,!0),s+h(e+60,!0),h(60,!0),h(10,!0)),u.rect(r+h(t+60,!0),s+h(e,!0),h(10,!0),h(10,!0)),u.rect(r+h(t+44,!0),s+h(e+33.5,!0),h(26,!0),h(3,!0))):"D_corner"==i?(u.rect(r+h(t+60,!0),s+h(e,!0),h(10,!0),h(70,!0)),u.rect(r+h(t,!0),s+h(e+60,!0),h(60,!0),h(10,!0)),u.rect(r+h(t,!0),s+h(e,!0),h(10,!0),h(10,!0)),u.rect(r+h(t,!0),s+h(e+33.5,!0),h(26,!0),h(3,!0))):"L_conn"==i?(u.rect(r+h(t,!0),s+h(e,!0),h(10,!0),h(40,!0)),u.rect(r+h(t,!0),s+h(e+90,!0),h(10,!0),h(40,!0)),u.rect(r+h(t+60,!0),s+h(e,!0),h(10,!0),h(130,!0)),u.rect(r+h(t+33.5,!0),s+h(e+26,!0),h(3,!0),h(26,!0)),u.rect(r+h(t+33.5,!0),s+h(e+78,!0),h(3,!0),h(26,!0))):"R_conn"==i?(u.rect(r+h(t,!0),s+h(e,!0),h(10,!0),h(130,!0)),u.rect(r+h(t+60,!0),s+h(e,!0),h(10,!0),h(40,!0)),u.rect(r+h(t+60,!0),s+h(e+90,!0),h(10,!0),h(40,!0)),u.rect(r+h(t+33.5,!0),s+h(e+26,!0),h(3,!0),h(26,!0)),u.rect(r+h(t+33.5,!0),s+h(e+78,!0),h(3,!0),h(26,!0))):"U_conn"==i?(u.rect(r+h(t,!0),s+h(e,!0),h(40,!0),h(10,!0)),u.rect(r+h(t+90,!0),s+h(e,!0),h(40,!0),h(10,!0)),u.rect(r+h(t,!0),s+h(e+60,!0),h(130,!0),h(10,!0)),u.rect(r+h(t+26,!0),s+h(e+33.5,!0),h(26,!0),h(3,!0)),u.rect(r+h(t+78,!0),s+h(e+33.5,!0),h(26,!0),h(3,!0))):"D_conn"==i&&(u.rect(r+h(t,!0),s+h(e,!0),h(130,!0),h(10,!0)),u.rect(r+h(t,!0),s+h(e+60,!0),h(40,!0),h(10,!0)),u.rect(r+h(t+90,!0),s+h(e+60,!0),h(40,!0),h(10,!0)),u.rect(r+h(t+26,!0),s+h(e+33.5,!0),h(26,!0),h(3,!0)),u.rect(r+h(t+78,!0),s+h(e+33.5,!0),h(26,!0),h(3,!0))),u.stroke()}function o(t,e,i){var h=f.percent,n=f.mapAnchor,r=n.x,s=n.y;u.beginPath(),u.rect(r+h(t,!0),s+h(e,!0),h(35,!0),h(40,!0)),u.rect(r+h(t,!0),s+h(e-15,!0),h(35,!0),h(15,!0)),u.rect(r+h(t+5,!0),s+h(e+10,!0),h(25,!0),h(20,!0)),u.rect(r+h(t+2,!0),s+h(e+30,!0),h(31,!0),h(3,!0)),u.fillStyle="black",u.font=h(5,!0)+"px Arial",u.fillText(i,r+h(t+17.5,!0),s+h(e+7,!0)),"LOTTERY"==i?(u.rect(r+h(t+9.5,!0),s+h(e+22,!0),h(4,!0),h(8,!0)),u.rect(r+h(t+9.5,!0),s+h(e+26,!0),h(4,!0),h(2,!0)),u.rect(r+h(t+9.5,!0),s+h(e+28,!0),h(4,!0),h(2,!0)),u.rect(r+h(t+15.5,!0),s+h(e+18,!0),h(4,!0),h(12,!0)),u.rect(r+h(t+15.5,!0),s+h(e+22,!0),h(4,!0),h(2,!0)),u.rect(r+h(t+15.5,!0),s+h(e+26,!0),h(4,!0),h(2,!0)),u.rect(r+h(t+21.5,!0),s+h(e+20,!0),h(4,!0),h(8,!0)),u.rect(r+h(t+21.5,!0),s+h(e+24,!0),h(4,!0),h(2,!0)),u.rect(r+h(t+21.5,!0),s+h(e+26,!0),h(4,!0),h(2,!0)),u.rect(r+h(t+21.5,!0),s+h(e+28,!0),h(4,!0),h(2,!0))):"RANKINGS"==i&&(u.rect(r+h(t+7,!0),s+h(e+13,!0),h(21,!0),h(3,!0)),u.rect(r+h(t+7,!0),s+h(e+18,!0),h(21,!0),h(3,!0)),u.rect(r+h(t+7,!0),s+h(e+23,!0),h(21,!0),h(3,!0))),u.stroke()}function a(t,e){var i=f.percent,h=f.mapAnchor,n=h.x,r=h.y;u.beginPath(),u.rect(n+i(t-2,!0),r+i(e-2,!0),i(4,!0),i(4,!0)),u.rect(n+i(t+3,!0),r+i(e-2,!0),i(4,!0),i(4,!0)),u.rect(n+i(t-2,!0),r+i(e+3,!0),i(4,!0),i(4,!0)),u.rect(n+i(t+3,!0),r+i(e+3,!0),i(4,!0),i(4,!0)),u.stroke(),u.beginPath(),u.fillStyle="white",u.fillRect(n+i(t,!0),r+i(e,!0),i(5,!0),i(5,!0)),u.rect(n+i(t,!0),r+i(e,!0),i(5,!0),i(5,!0)),u.stroke(),g()}e()(n.Z,{insert:"head",singleton:!1}),n.Z.locals;var c,d=io({autoConnect:!1});d.on("players",(function(t){for(var e in t){var i=t[e];if(i.username!=b.username){var h=new W(0,0,i.username,0);for(var n in i)n in h&&(h[n]=i[n]);h.width=f.percent(f.charWidth,!0),h.height=f.percent(f.charHeight,!0),h.eyeDim=f.percent(3,!0),h.handWidth=f.percent(4,!0),h.handHeight=f.percent(4,!0),h.x=f.percent(i.posX,!0)-h.width/2,h.y=f.percent(i.posY,!0)-h.height/2,H[i.username]=h}}})),d.on("new_player_update",(function(t){if(!(t.username in H)){var e=new W(0,0,t.username,0);for(var i in t)i in e&&(e[i]=t[i]);e.width=f.percent(f.charWidth,!0),e.height=f.percent(f.charHeight,!0),e.eyeDim=f.percent(3,!0),e.handWidth=f.percent(4,!0),e.handHeight=f.percent(4,!0),e.x=f.percent(e.posX,!0)-e.width/2,e.y=f.percent(e.posY,!0)-e.height/2,H[t.username]=e}var h=H[t.username],n=t.rotation,r=t.running,s=t.speed,o=(t.x,t.y,t.posX),a=t.posY,c=(t.fixedCenter,t.username);"boolean"==typeof r?h.run(!1):h.run(!0),h.rotation=n,h.speed=s,h.username=c,h.x=f.percent(o-1,!0)-f.charWidth/2-h.handWidth,h.y=f.percent(a-1,!0)-f.charHeight/2-h.handHeight,h.posX=o,h.posY=a})),d.on("remove_player",(function(t){H[t]&&delete H[t]})),self.addEventListener("beforeunload",(function(){d.disconnect()}));var l=document.querySelector("canvas");l.onclick=function(){document.body.requestFullscreen()};var u=l.getContext("2d"),f={charWidth:15,charHeight:15,controlSize:20,joystickSize:void 0,scale:3,maxWidth:1e4,maxHeight:1e4,speedFactor:.1,speed:void 0,width:self.innerWidth,height:self.innerHeight,prevDim:void 0,globalCenter:{x:self.innerWidth/2,y:window.innerHeight/2},mapAnchor:{x:self.innerWidth/2,y:window.innerHeight/2},percent:function(t,e,i){return e?t/100*f.height/f.scale+t/100*f.width/f.scale:i?t/100*i:t/100*f.width}},p={lineWidth:window.innerWidth<=800?2:3,strokeStyle:"black",fillStyle:"white",globalAlpha:1,textAlign:"center",font:f.percent(5,!0)+" Arial"};function g(t,e,i,h,n,r){t||(u.lineWidth=p.lineWidth),e||(u.strokeStyle=p.strokeStyle),i||(u.fillStyle=p.fillStyle),h||(u.globalAlpha=p.globalAlpha),n||(u.textAlign=p.textAlign),r||(u.font=p.font)}g(),u.save();var m,v,y=new function(t,e,i){this.width=5e3,this.height=5e3,this.render=function(){var t=f.mapAnchor,e=t.x,i=t.y,h=f.percent;g(),u.beginPath(),function(t,e){var i=f.percent,h=f.mapAnchor,n=h.x,r=h.y;u.beginPath(),u.rect(n+i(t,!0),r+i(e,!0),i(121,!0),i(100,!0)),u.rect(n+i(t+5,!0),r+i(e+5,!0),i(111,!0),i(90,!0)),u.rect(n+i(t+35.5,!0),r+i(e+25,!0),i(50,!0),i(50,!0)),u.stroke()}(-60.5,-50),r(85.5,-25,"left"),r(-105.5,-25,"right"),r(-25,-95,"down"),r(-25,75,"up"),s(-65,-264.5,"U_conn"),s(-195,-264.5,"horizontal"),s(65,-264.5,"horizontal"),s(195,-264.5,"L_corner"),s(195,-194.5,"vertical"),s(195,-64.5,"R_conn"),s(195,65.5,"vertical"),s(195,195.5,"D_corner"),s(65,195.5,"horizontal"),s(-65,195.5,"D_conn"),s(-195,195.5,"horizontal"),s(-265,195.5,"U_corner"),s(-265,65.5,"vertical"),s(-265,-64.5,"L_conn"),s(-265,-194.5,"vertical"),s(-265,-264.5,"R_corner"),o(70.5,-170,"LOTTERY"),o(-105.5,-170,"RANKINGS"),o(-17.5,-170,"PVP"),u.rect(e+h(-125.5,!0),i+h(-115,!0),h(251,!0),h(230,!0)),u.stroke(),a(52.5,-153),a(-32,-125),a(-128.5,-170),a(-158.5,-84),a(-138.5,2),a(-115.5,132),a(56,150),a(146,132),a(154,90),a(173,82),a(156,-7),a(166,-28),a(133,-89),a(127,-145),a(156,-167),a(0,161),a(-134.5,162),a(-146,23)}}(5e3,5e3,(function(){var t=f.mapAnchor,e=t.x,i=t.y,h=f.percent;g(),u.beginPath(),function(t,e){var i=f.percent,h=f.mapAnchor,n=h.x,r=h.y;u.beginPath(),u.rect(n+i(t,!0),r+i(-50,!0),i(121,!0),i(100,!0)),u.rect(n+i(t+5,!0),r+i(-45,!0),i(111,!0),i(90,!0)),u.rect(n+i(-25,!0),r+i(-25,!0),i(50,!0),i(50,!0)),u.stroke()}(-60.5),r(85.5,-25,"left"),r(-105.5,-25,"right"),r(-25,-95,"down"),r(-25,75,"up"),s(-65,-264.5,"U_conn"),s(-195,-264.5,"horizontal"),s(65,-264.5,"horizontal"),s(195,-264.5,"L_corner"),s(195,-194.5,"vertical"),s(195,-64.5,"R_conn"),s(195,65.5,"vertical"),s(195,195.5,"D_corner"),s(65,195.5,"horizontal"),s(-65,195.5,"D_conn"),s(-195,195.5,"horizontal"),s(-265,195.5,"U_corner"),s(-265,65.5,"vertical"),s(-265,-64.5,"L_conn"),s(-265,-194.5,"vertical"),s(-265,-264.5,"R_corner"),o(70.5,-170,"LOTTERY"),o(-105.5,-170,"RANKINGS"),o(-17.5,-170,"PVP"),u.rect(e+h(-125.5,!0),i+h(-115,!0),h(251,!0),h(230,!0)),u.stroke(),a(52.5,-153),a(-32,-125),a(-128.5,-170),a(-158.5,-84),a(-138.5,2),a(-115.5,132),a(56,150),a(146,132),a(154,90),a(173,82),a(156,-7),a(166,-28),a(133,-89),a(127,-145),a(156,-167),a(0,161),a(-134.5,162),a(-146,23)})),x=function(){function t(){this.active=!1,this.mouseX=0,this.mouseY=0,this.angle=0,this.quad=0,this.distance=0,this.touch=void 0,this.mouseCenter={x:0,y:0}}return t.prototype.render=function(){g(),u.moveTo(this.mouseCenter.x,this.mouseCenter.y),u.beginPath(),f.joystickSize&&u.arc(this.mouseCenter.x,this.mouseCenter.y,f.joystickSize,0,2*Math.PI),u.globalAlpha=.5,u.fill(),u.stroke(),this.mouseX&&this.mouseY&&f.joystickSize&&(u.beginPath(),f.joystickSize&&u.arc(this.mouseX,this.mouseY,f.joystickSize/2||10,0,2*Math.PI),u.fillStyle="gray",u.globalAlpha=.5,u.fill()),u.stroke()},t}();self.addEventListener("touchstart",(function(t){var e=t.touches[t.touches.length-1],i=e.pageX,h=e.pageY,n=new x;n.touch=t.touches.length-1,n.mouseCenter.x=i,n.mouseCenter.y=h,n.mouseX=i,n.mouseY=h,n.active=!0,i>self.innerWidth/2&&3!==t.touches.length&&h>window.innerHeight/2?null==(null==v?void 0:v.touch)&&(v=n):i<self.innerWidth/2&&3!==t.touches.length&&h>self.innerHeight/2&&null==(null==m?void 0:m.touch)&&(m=n)})),self.addEventListener("touchend",(function(t){m&&v&&t.touches&&1==t.touches.length?t.touches[0].pageX>self.innerWidth/2?(m.distance=0,b.rotation=-(null==m?void 0:m.angle),m=void 0):(b.rotation=-(null==v?void 0:v.angle),v=void 0):(m&&(m.distance=0,b.rotation=-(null==m?void 0:m.angle),m=void 0),v&&(b.rotation=-(null==v?void 0:v.angle),v=void 0))})),self.addEventListener("touchmove",(function(t){function e(e){if(t.touches[e.touch]){var i,h=t.touches[e.touch],n=h.pageX,r=h.pageY,s=Math.round(Math.sqrt(Math.pow(n-e.mouseCenter.x,2)+Math.pow(r-e.mouseCenter.y,2))),o=Math.round(180*Math.atan((e.mouseCenter.x-n)/(e.mouseCenter.y-r))/Math.PI);(i=n<e.mouseCenter.x&&r>e.mouseCenter.y?1:n>e.mouseCenter.x&&r>e.mouseCenter.y?2:n>e.mouseCenter.x&&r<e.mouseCenter.y?3:0)>0&&(o=3==i?90*i+180-(90*i-o)+180:90*i+180-(90*i-o)),e.quad=i,s<f.joystickSize&&(e.mouseX=n,e.mouseY=r,e.angle=o*Math.PI/180,e.distance=s)}}v&&e(v),m&&e(m)}));var w=[],H={},W=function(){function t(t,e,i,h){var n=this;this.width=f.percent(f.charWidth,!0),this.height=f.percent(f.charHeight,!0),this.eyePos="open",this.running=!1,this.speed=.1,this.eyeDim=f.percent(3,!0),this.handWidth=f.percent(4,!0),this.handHeight=f.percent(4,!0),this.handPos="middle",this.blink=setInterval((function(){n.eyePos="closed",setTimeout((function(){n.eyePos="open"}),1e3)}),6e3),this.posX=t,this.posY=e,this.x=f.percent(t,!0)-this.width,this.y=f.percent(e,!0)-this.height,this.fixedCenter={x:this.x+this.width/2,y:this.y+this.height/2},this.rotation=h||0,this.username=i}return t.prototype.run=function(t){var e=this;if(t&&0==this.running){var i=200-100*this.speed+100;this.running=setInterval((function(){e.handPos="middle",setTimeout((function(){e.handPos="top",setTimeout((function(){e.handPos="bottom",setTimeout((function(){e.handPos="middle"}),i/3)}),i/3)}),i/3)}),i)}else t||!1===this.running||(clearInterval(this.running),this.running=!1)},t.prototype.recalculate=function(t,e){this.width=f.percent(f.charWidth,!0),this.height=f.percent(f.charHeight,!0),this.x=f.percent(this.posX,!0)-this.width/2,this.y=f.percent(this.posY,!0)-this.height/2,this.handWidth=f.percent(4,!0),this.handHeight=f.percent(4,!0),this.eyeDim=f.percent(3,!0)},t.prototype.drawHands=function(){var t=f.mapAnchor.x+this.x,e=f.mapAnchor.y+this.y;u.lineWidth=2*p.lineWidth,"middle"==this.handPos?(u.strokeRect(t-this.handWidth-1,e+this.height/2-this.handHeight/2,this.handWidth,this.handHeight),u.strokeRect(t+this.width+1,e+this.height/2-this.handHeight/2,this.handWidth,this.handHeight),u.fillRect(t-this.handWidth-1,e+this.height/2-this.handHeight/2,this.handWidth,this.handHeight),u.fillRect(t+this.width+1,e+this.height/2-this.handHeight/2,this.handWidth,this.handHeight)):"top"==this.handPos?(u.strokeRect(t-this.handWidth-1,e+this.height/2-this.handHeight/2-f.percent(2,!0),this.handWidth,this.handHeight),u.strokeRect(t+this.width+1,e+this.height/2-this.handHeight/2+f.percent(2,!0),this.handWidth,this.handHeight),u.fillRect(t-this.handWidth-1,e+this.height/2-this.handHeight/2-f.percent(2,!0),this.handWidth,this.handHeight),u.fillRect(t+this.width+1,e+this.height/2-this.handHeight/2+f.percent(2,!0),this.handWidth,this.handHeight)):(u.strokeRect(t-this.handWidth-1,e+this.height/2-this.handHeight/2+f.percent(2,!0),this.handWidth,this.handHeight),u.strokeRect(t+this.width+1,e+this.height/2-this.handHeight/2-f.percent(2,!0),this.handWidth,this.handHeight),u.fillRect(t-this.handWidth-1,e+this.height/2-this.handHeight/2+f.percent(2,!0),this.handWidth,this.handHeight),u.fillRect(t+this.width+1,e+this.height/2-this.handHeight/2-f.percent(2,!0),this.handWidth,this.handHeight))},t.prototype.drawEyes=function(){var t=f.mapAnchor.x+this.x,e=f.mapAnchor.y+this.y;u.fillStyle="black","open"==this.eyePos?(u.fillRect(t+this.width/5,e,this.eyeDim,this.eyeDim),u.fillRect(t+this.width/5*3,e,this.eyeDim,this.eyeDim)):(u.fillRect(t+this.width/5,e+this.eyeDim/2,this.eyeDim,this.eyeDim/4),u.fillRect(t+this.width/5*3,e+this.eyeDim/2,this.eyeDim,this.eyeDim/4))},t.prototype.render=function(){var t=f.mapAnchor.x+this.x,e=f.mapAnchor.y+this.y;u.beginPath(),g(),u.restore(),u.save(),u.translate(t+this.width/2,e+this.height/2),u.rotate(this.rotation),u.translate(-t+-this.width/2,-e+-this.height/2),u.fillStyle="white",u.fillRect(t,e,this.width,this.height),u.strokeRect(t,e,this.width,this.height),g(),this.drawEyes(),g(),this.drawHands(),u.restore(),u.save(),u.textAlign="center",u.font=f.percent(5,!0)+"px Arial",u.fillStyle="black",u.fillText(this.username,t+this.width/2,e-f.percent(8,!0)),g(),u.restore(),u.save(),u.beginPath()},t}(),b=new(function(){function t(t,e,i){var h=this;this.width=f.percent(f.charWidth,!0),this.height=f.percent(f.charHeight,!0),this.eyePos="open",this.rotation=0,this.running=!1,this.eyeDim=f.percent(3,!0),this.handWidth=f.percent(4,!0),this.handHeight=f.percent(4,!0),this.handPos="middle",this.blink=setInterval((function(){h.eyePos="closed",setTimeout((function(){h.eyePos="open"}),1e3)}),6e3),this.username=t,this.x=e||f.maxWidth-this.width/2,this.y=i||f.maxHeight-this.height/2,this.fixedX=f.width/2-this.width/2,this.fixedY=f.height/2-this.height/2,this.fixedCenter={x:this.fixedX+this.width/2,y:this.fixedY+this.height/2}}return t.prototype.recalculate=function(t,e){this.x=t||f.maxWidth-this.width/2,this.y=e||f.maxHeight-this.height/2,this.fixedX=f.width/2-this.width/2,this.fixedY=f.height/2-this.height/2,this.fixedCenter={x:this.fixedX+this.width/2,y:this.fixedY+this.height/2},this.width=f.percent(f.charWidth,!0),this.height=f.percent(f.charHeight,!0),this.handWidth=f.percent(4,!0),this.handHeight=f.percent(4,!0),this.eyeDim=f.percent(3,!0)},t.prototype.drawHands=function(){u.lineWidth=2*p.lineWidth,"middle"==this.handPos?(u.strokeRect(this.fixedX-this.handWidth-1,this.fixedY+this.height/2-this.handHeight/2,this.handWidth,this.handHeight),u.strokeRect(this.fixedX+this.width+1,this.fixedY+this.height/2-this.handHeight/2,this.handWidth,this.handHeight),u.fillRect(this.fixedX-this.handWidth-1,this.fixedY+this.height/2-this.handHeight/2,this.handWidth,this.handHeight),u.fillRect(this.fixedX+this.width+1,this.fixedY+this.height/2-this.handHeight/2,this.handWidth,this.handHeight)):"top"==this.handPos?(u.strokeRect(this.fixedX-this.handWidth-1,this.fixedY+this.height/2-this.handHeight/2-f.percent(2,!0),this.handWidth,this.handHeight),u.strokeRect(this.fixedX+this.width+1,this.fixedY+this.height/2-this.handHeight/2+f.percent(2,!0),this.handWidth,this.handHeight),u.fillRect(this.fixedX-this.handWidth-1,this.fixedY+this.height/2-this.handHeight/2-f.percent(2,!0),this.handWidth,this.handHeight),u.fillRect(this.fixedX+this.width+1,this.fixedY+this.height/2-this.handHeight/2+f.percent(2,!0),this.handWidth,this.handHeight)):(u.strokeRect(this.fixedX-this.handWidth-1,this.fixedY+this.height/2-this.handHeight/2+f.percent(2,!0),this.handWidth,this.handHeight),u.strokeRect(this.fixedX+this.width+1,this.fixedY+this.height/2-this.handHeight/2-f.percent(2,!0),this.handWidth,this.handHeight),u.fillRect(this.fixedX-this.handWidth-1,this.fixedY+this.height/2-this.handHeight/2+f.percent(2,!0),this.handWidth,this.handHeight),u.fillRect(this.fixedX+this.width+1,this.fixedY+this.height/2-this.handHeight/2-f.percent(2,!0),this.handWidth,this.handHeight))},t.prototype.drawEyes=function(){u.fillStyle="black","open"==this.eyePos?(u.fillRect(this.fixedX+this.width/5,this.fixedY,this.eyeDim,this.eyeDim),u.fillRect(this.fixedX+this.width/5*3,this.fixedY,this.eyeDim,this.eyeDim)):(u.fillRect(this.fixedX+this.width/5,this.fixedY+this.eyeDim/2,this.eyeDim,this.eyeDim/4),u.fillRect(this.fixedX+this.width/5*3,this.fixedY+this.eyeDim/2,this.eyeDim,this.eyeDim/4))},t.prototype.render=function(){var t=this;if(this.fixedX=f.width/2-this.width/2,this.fixedY=f.height/2-this.height/2,g(),u.restore(),u.save(),u.translate(this.fixedCenter.x,this.fixedCenter.y),u.rotate(-(null==v?void 0:v.angle)||-(null==m?void 0:m.angle)||this.rotation||0),u.translate(-this.fixedCenter.x,-this.fixedCenter.y),u.fillStyle="white",u.fillRect(this.fixedX,this.fixedY,this.width,this.height),u.strokeRect(this.fixedX,this.fixedY,this.width,this.height),g(),this.drawEyes(),g(),(null==f?void 0:f.speed)&&m&&!this.running&&(null==m?void 0:m.distance)>0){var e=200-100*f.speed+100;this.running=setInterval((function(){t.handPos="middle",setTimeout((function(){t.handPos="top",setTimeout((function(){t.handPos="bottom",setTimeout((function(){t.handPos="middle"}),e/3)}),e/3)}),e/3)}),e)}else this.running&&!(null==m?void 0:m.distance)&&(clearInterval(this.running),this.running=!1);this.drawHands(),u.restore(),u.save(),u.textAlign="center",u.font=f.percent(5,!0)+"px Arial",u.fillStyle="black",u.fillText(this.username,this.fixedCenter.x,this.fixedCenter.y-f.percent(8,!0)-this.height/2),g(),u.restore(),u.save()},t}())("Laya<0.2>");function k(t){if(l.style.width=self.innerWidth+"px",l.style.height=self.innerHeight+"px",l.width=self.innerWidth,l.height=self.innerHeight,f.prevDim={width:f.width,height:f.height},t||(f.mapAnchor.x=self.innerWidth/2+f.percent((f.mapAnchor.x-f.globalCenter.x)/f.width*100,!1,self.innerWidth),f.mapAnchor.y=self.innerHeight/2+f.percent((f.mapAnchor.y-f.globalCenter.y)/f.height*100,!1,self.innerHeight)),f.width=self.innerWidth,f.height=self.innerHeight,f.joystickSize=f.percent(f.controlSize,!0),f.globalCenter={x:self.innerWidth/2,y:self.innerHeight/2},f.speed=f.percent(f.speedFactor,!0),w.length)for(var e=0,i=w;e<i.length;e++){var h=i[e];null==h||h.recalculate()}if(Object.keys(H).length)for(var n in H)H[n].recalculate();b.recalculate()}self.addEventListener("resize",(function(){k(),p.lineWidth=window.innerWidth<=800?2:3,p.font=f.percent(5,!0)+" Arial"})),function(){var t;if(b.username){d.connect();var e=/<\d\.?\d?>/.exec(b.username),i=void 0;for(var h in e?(i=null===(t=e[0])||void 0===t?void 0:t.replace(/<|>/g,""),b.username=b.username.replace(e[0],"")+" Lv."+10*Number(i)):b.username=b.username+" Lv."+10*f.speedFactor,i&&(f.speedFactor=Number(i)),c=new W(0,0,b.username))h in b&&(c[h]=b[h]);c.speed=f.speedFactor,c.x=0,c.y=0,d.emit("new_user",c)}}(),k(!0),requestAnimationFrame((function t(){if(u.clearRect(0,0,f.width,f.height),y&&y.render(),Object.keys(H).length)for(var e in H)H[e].render();if(w.length)for(var i=0,h=w;i<h.length;i++)h[i].render();if(b.render(),null==m?void 0:m.active){m.render();var n=f,r=n.mapAnchor,s=n.speed;if(n.percent,s)switch(s*=5,m.quad){case 0:r.x+=s,r.y+=s;break;case 1:r.x+=s,r.y-=s;break;case 2:r.x-=s,r.y-=s;break;case 3:r.x-=s,r.y+=s}}(null==v?void 0:v.active)&&v.render(),function(){if(d.connected){var t=b.rotation,e=b.running,i=(b.speed,b.x,b.y,b.posX,b.posY,b.fixedCenter,b.username);c.rotation=-(null==v?void 0:v.angle)||-(null==m?void 0:m.angle)||t||0,c.running=e,c.speed=f.speedFactor,c.posX=-Math.round((f.mapAnchor.x-f.globalCenter.x)/f.percent(1,!0)),c.posY=-Math.round((f.mapAnchor.y-f.globalCenter.y)/f.percent(1,!0)),c.username=i,d.emit("new_update",c)}}(),requestAnimationFrame(t)}))})()})();