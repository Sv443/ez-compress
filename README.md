# ez-compress
Compress known sequences of chars a bit to lower the traffic between two devices. This is not really that practical, I just wanted to make my own compression for some reason.

<br><br><br><br><br><br><br><br>

# Installation:

```
npm i --save ez-compress
```





<br><br><br><br>

# Usage:

```js
const ez = require("ez-compress");
const rawHTML = `
<!DOCTYPE html>
<html>
	<body>
		<div>Hello World!</div>
	</body>
</html>
`;

var compressedHTML = ez.encode.HTML(rawHTML);

/*   RESULT:
`
%¤?S%¤hd>
¤hh>
¤hº¤hb>
¤h¦¤hvHello World!¤hV
¤hº¤hB>
¤hH>
`
*/
```
<br><br><br>
## Compressing multiple languages:
```js
const ez = require("ez-compress");
const rawHTML = fs.readFileSync("./index.html"); // big HTML file with HTML, CSS and JS

var compressedHTML = ez.encode.HTML(ez.encode.CSS(ez.encode.JS(rawHTML)));

// WARNING!
// decode in the same sequence, else problems might occur
// example for this one:

var decompressedHTML = ez.decode.HTML(ez.decode.CSS(ez.decode.JS(compressedHTML)));
```
<br><br><br>
## Changing the default char:
```js
ez.changeChar("¥"); // this makes the package use "\u00A5" instead of the default "\u00A4" character
// best option is a char that is as high up as possible on this list (https://unicode-table.com/) and that doesn't at all occur in your to-be-compressed data
```





<br><br><br><br><br><br><br><br>

# Supported Languages:
- Web:
  - HTML
  - JS
  - CSS



<br><br><br><br><br><br><br><br>

# Planned Languages:
- Backend-JS (Node)
- PHP



<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

# Sequences:
Beginning of File/String/Whatever was encoded: `%$?S%`<br>
Syntax: `$lc`<br><br>
- `$`: the set / default (`¤`) escape char<br>
- `l`: the language char from the table below<br>
- `c`: a character from one of the js files in the regexes folder<br>
(`%`, `?` and `S` are fixed chars)


## Language Chars:
| Language | Char |
| --- | --- |
| HTML | `h` |
| Web-JavaScript | `j` |
| CSS | `c` |

## Planned:
| Language | Char |
| --- | --- |
| PHP | `p` |
| NodeJS | `J` |
