/*

This package doesn't use an algorithm to encode stuff but rather uses a "database" to replace known and often used statements to placeholders.
This is NOT a perfect encoding method, it is intended for small scale web servers and APIs to possibly save a bit of bandwidth.

My tests:
    ONLY HTML:
        - 12.1 kilobyte HTML+JS+CSS file -> 11.6 kilobytes    (6.5% reduction)    (more professional HTML file)
        - 61.7 kilobyte HTML+JS+CSS file -> 59.7 kilobytes    (3.2% reduction)     (page had much text, CSS and JavaScript which were not encoded)

    HTML + JS (NO CSS):
        - 133 kilobyte HTML+JS+CSS file -> 123 kilobytes    (7.5% reduction)    (note: CSS is still not encoded)
        - 224 kilobyte HTML+JS+CSS file -> 210 kilobytes    (6.2% reduction)    (CSS also not included in encoding)
*/



var esC = "¤";

const tables = {
    HTML: require("./regexes/html.js"),
    JS: require("./regexes/js.js"),
    CSS: require("./regexes/css.js")
};



var verification = `%${esC}?S%`;

const encode = {
    HTML: content => {
        tables.HTML.forEach(tEntry => {
            content = content.toString().replace(new RegExp(tEntry.real, "gm"), esC + tEntry.tiny);
        });
        return (!content.includes(verification) ? verification : "") + content;
    },
    JS: content => {
        tables.JS.forEach(tEntry => {
            content = content.toString().replace(new RegExp(tEntry.real, "gm"), esC + tEntry.tiny);
        });
        return (!content.includes(verification) ? verification : "") + content;
    },
    CSS: content => {
        tables.CSS.forEach(tEntry => {
            content = content.toString().replace(new RegExp(tEntry.real, "gm"), esC + tEntry.tiny);
        });
        return (!content.includes(verification) ? verification : "") + content;
    }
};

const decode = {
    HTML: content => {
        tables.HTML.forEach(tEntry => {
            content = content.toString().replace(new RegExp(esC + tEntry.tiny, "gm"), tEntry.real.replace(/\\/gm, ""));
        });
        return (!content.includes(verification) ? content : content.replace(verification, ""));
    },
    JS: content => {
        tables.JS.forEach(tEntry => {
            content = content.toString().replace(new RegExp(esC + tEntry.tiny, "gm"), tEntry.real.replace(/\\/gm, ""));
        });
        return (!content.includes(verification) ? content : content.replace(verification, ""));
    },
    CSS: content => {
        tables.CSS.forEach(tEntry => {
            content = content.toString().replace(new RegExp(esC + tEntry.tiny, "gm"), tEntry.real.replace(/\\/gm, ""));
        });
        return (!content.includes(verification) ? content : content.replace(verification, ""));
    }
};

const toBase64 = {
    HTML: content => new Buffer.from(encode.HTML(content), "base64").toString("utf8"),
    JS: content => new Buffer.from(encode.JS(content), "base64").toString("utf8")
};

module.exports.changeChar = newChar => {
    esC = newChar;
    verification = `%${newChar}?S%`;
}
module.exports.base64 = toBase64;
module.exports.decode = decode;
module.exports.encode = encode;