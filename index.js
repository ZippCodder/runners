const http = require("http");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const server = http.createServer();

module.exports.server = server
require("./server.js");

server.on("request",(req,res) => {
if (req.url == "/") {
fs.readFile("./src/index.html",(err,data) => {
  if (!err && data) {
  res.writeHead(200,{"Content-Type": "text/html"});
  res.end(data);
} else {
res.writeHead(404);
res.end();
}
});
} else {
fs.readFile("./dist" + req.url,(err,data) => {
  if (!err && data) {
 let contentType;
 switch (path.extname(req.url)) {
 case ".css": contentType = "text/css";
 break;
 case ".js": contentType = "text/html";
 break;
 case ".html": contentType = "text/html";
}
 res.writeHead(200,{"Content-Type": contentType});
 res.end(data);
} else {
res.writeHead(404);
res.end();
}
});
}
});

server.listen(process.env.PORT,() => {
 console.log("\x1b[32m%s\x1b[0m","Application is listening on port " + process.env.PORT);
})
