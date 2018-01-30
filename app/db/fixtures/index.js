const fs = require("fs");
const env = process.env.NODE_ENV || "development";


let folder = "";
if (env == "production" || env == "prod")
    folder = "/real";
else
    folder = "/mock";

// get mock data from https://www.mockaroo.com

let files = {
    "json": {},
    "js": {}
};

fs.readdirSync(`${__dirname}${folder}`)
    .filter(file =>
        (file.indexOf(".") !== 0))
    .forEach(file => {
        if (file.slice(-5) == ".json") {
            files.json[file.split(".")[0]] = JSON.parse(fs.readFileSync(`${__dirname}${folder}/${file}`));
        } else if (file.slice(-3) == ".js") {
            files.js[file.split(".")[0]] = require(`${__dirname}${folder}/${file}`);
        }
    });

module.exports = files;