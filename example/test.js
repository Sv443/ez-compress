const ez = require("../index.js");
const fs = require("fs");

const testFile = "test5";

ez.changeChar(""); // use "\u0001" instead of the default "\u00A4" character
// best option is a char that is high up on this list (https://unicode-table.com/) and that doesn't at all occur in your to-be-encoded data





// HTML encode

var encoded = ez.encode.HTML(fs.readFileSync("./example/res/" + testFile + ".html"));
fs.writeFileSync("./example/res/HTMLencoded.html", encoded);

var decoded = ez.decode.HTML(fs.readFileSync("./example/res/HTMLencoded.html"));
fs.writeFileSync("./example/res/HTMLencoded.html", decoded);




// HTML + JS encode

var encoded = ez.encode.HTML(ez.encode.JS(fs.readFileSync("./example/res/" + testFile + ".html")));
fs.writeFileSync("./example/res/JS+HTMLencoded.txt", encoded);



// HTML + JS + CSS encode

var encoded = ez.encode.CSS(ez.encode.HTML(ez.encode.JS(fs.readFileSync("./example/res/" + testFile + ".html"))));
fs.writeFileSync("./example/res/fullEncoded.txt", encoded);

var decoded = ez.decode.CSS(ez.decode.HTML(ez.decode.JS(fs.readFileSync("./example/res/fullEncoded.txt"))));
fs.writeFileSync("./example/res/fullDecoded.txt", decoded);






console.log("\x1b[32m\x1b[1mSuccess!\x1b[0m\n");