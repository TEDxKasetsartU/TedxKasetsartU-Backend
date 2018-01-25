const fs = require("fs");
const env = process.env.NODE_ENV || "development";


let folder = "";
if (env == "development" || env == "test") {
    folder = "/mock";
} else {
    folder = "/real";
}

// get mock data from https://www.mockaroo.com

let files = {};

fs.readdirSync(`${__dirname}${folder}`)
    .filter(file =>
        (file.indexOf(".") !== 0) &&
        (file.slice(-5) === ".json"))
    .forEach(file => {
        files[file.split(".")[0]] = JSON.parse(fs.readFileSync(`${__dirname}${folder}/${file}`));
    });

module.exports = files;