const path = require("path");
const dirname = path.resolve(__dirname, "../..");

const env = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;

const deployed = env === "production" || env === "staging" ? true : false;
// FIXME: Fix code
// const deployed = false;

const url = deployed
    ? "https://tedxku-backend.herokuapp.com"
    : process.env.URL || `http://127.0.0.1:${port}`;

const l = require(dirname + "/app/apis/custom_logger");
const r = require(dirname + "/app/apis/response");
const m = require(dirname + "/app/models");
const f = require(dirname + "/app/db/fixtures");
const a = require(dirname + "/app/db/fixtures/loader");
const d = require(dirname + "/app/controllers/default");
const e = require(dirname + "/app/controllers/event_controller");
const o = require(dirname + "/app/routes/default");
const u = require(dirname + "/app/routes/routers");
const v = require(dirname + "/app/apidocs/event.docs.js");
const c = require(dirname + "/app/config/config.json");
const s = require(dirname + "/package.json");
const t = require(dirname + "/app/settings/server");
const express = require("express");
const expressApp = express();

module.exports = {
    root: dirname,
    api: {
        l: l,
        r: r
    },
    model: m,
    database: {
        fixtures: f,
        loader: a
    },
    controller: {
        default: d,
        event: e
    },
    route: {
        object: o
    },
    router: u,
    docs: {
        v: v
    },
    config: c,
    app_setting: s,
    env: env,
    is_deploy: deployed,
    server: {
        express: express,
        expressApp: expressApp,
        url: url,
        port: port,
        setting: t
    }
};
