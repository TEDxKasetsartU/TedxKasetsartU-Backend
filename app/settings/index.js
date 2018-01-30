const path = require("path");
const dirname = path.resolve(__dirname, "../..");

const env = process.env.NODE_ENV || "development";
const prefix = "/api";
const version = "/v2";
module.exports = {
    root: dirname,
    api: {
        l: require(dirname + "/app/apis/custom_logger"),
        r: require(dirname + "/app/apis/response"),
    },
    model: require(dirname + "/app/models"),
    database: {
        fixtures: require(dirname + "/app/db/fixtures"),
        loader: require(dirname + "/app/db/fixtures/loader"),
    },
    controller: {
        default: require(dirname + "/app/controllers/default"),
        event: require(dirname + "/app/controllers/event_controller"),
    },
    route: {
        object: require(dirname + "/app/routes/default")
    },
    docs: {
        m: require(dirname + "/app/apidocs/member.docs.js"),
    },
    config: require(dirname + "/app/config/config.json"),
    app_setting: require(dirname + "/package.json"),
    env: env,
    server: {
        url: (env === "production") ? "https://tedxku-backend.herokuapp.com" : process.env.URL || "http://127.0.0.1",
        port: process.env.PORT || 3000,
        setting: require(dirname + "/app/settings/server"),
        prefix: prefix,
        version: version,
        path: prefix + version + "/"
    }
};