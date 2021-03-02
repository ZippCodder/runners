const http = require("http");
const fs = require("fs");

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
  fs.readFile("./dist/index.bundle.js",(err,data) => {
    if (!err) {
  res.setHeader("Content-Type","text/javascript");
  res.end(data);
} else {
res.writeHead(500);
res.end();
}
})
} else if (req.url == "/style.css") {
   fs.readFile("./statics/style.bundle.css",(err,data) => {
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
 console.log("\x1b[32m%s\x1b[0m","Application is listening on port " + process.env.PORT);
})
