const fs = require("fs");
const path = require("path");

const routers = {};

fs.readdirSync(__dirname)
    .filter(file =>
        (file.indexOf(".") !== 0) &&
        (file.slice(-3) === ".js"))
    .forEach(file => {
        if (file != "index.js") {
            routers[file.split(".")[0]] = require(path.join(__dirname, file));
        }
    });

module.exports = routers;