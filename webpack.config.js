const path = require("path");

module.exports = {
entry: { 
main: "./src/index.ts",
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
rules: [{test: /\.ts$/,use: "ts-loader"},{test: /\.css$/,use: ["style-loader","css-loader"]}]
}
}
