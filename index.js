const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const server = http.createServer();

server.on("request",(req,res) => {
if (req.url == "/") {
  fs.readFile("./statics/index.html",(err,data) => {
 if (!err) {
res.setHeader("Content-Type","text/html");
res.end(data);
} else {
res.writeHead(500);
res.end();
}
});
} else if (req.url == "/index.js") {
  fs.readFile("./statics/index.js",(err,data) => {
    if (!err) {
  res.setHeader("Content-Type","text/javascript");
  res.end(data);
} else {
res.writeHead(500);
res.end();
}
})
} else if (req.url == "/style.css") {
   fs.readFile("./statics/style.css",(err,data) => {
     if (!err) {
  res.setHeader("Content-Type","text/css");
  res.end(data);
} else {
res.writeHead(500);
res.end();
} 
})
} else {
 res.writeHead(404);
 res.end();
}
});

server.listen(process.env.PORT,() => {
 console.log("Application is listening on port " + process.env.PORT);
})
