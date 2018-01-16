const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);

const Schema = mongoose.Schema;

const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.json`)[env];

const db = {};

if (config.use_env_variable) {
    mongoose.connect(process.env[config.use_env_variable], {
        useMongoClient: true
    });
} else {
    let url = "mongodb://" + config.host + ":" + config.port;
    mongoose.connect(url, {
        useMongoClient: true
    });
}

mongoose.Promise = require("bluebird"); // promise library

fs.readdirSync(__dirname)
    .filter(file =>
        (file.indexOf(".") !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === ".js"))
    .forEach(file => {
        db[file.split(".")[0]] = require(path.join(__dirname, file));
    });

db.mongoose = mongoose;
db.Schema = Schema;

module.exports = db;