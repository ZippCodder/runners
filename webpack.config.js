const path = require("path");

module.exports = {
entry: { 
main: "./src/index.ts",
style: "./src/style.css"
},
devServer: {
contentBase: "./src",
port: 5000
},
output: {
path: path.resolve(__dirname,"./dist"),
filename: "[name].bundle.js"
},
module: {
rules: [{test: /\.ts$/,use: "ts-loader"},{test: /\.css$/,use: "css-loader"}]
}
}
