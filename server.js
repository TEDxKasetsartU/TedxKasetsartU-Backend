const express = require("express");
const morgan = require("morgan");
const Logger = require("./app/apis/custom_logger").logger;
const bodyParser = require("body-parser");
const uuid = require("uuid/v1");
const package = require("./package.json");


const env = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;

const app = express();

// logging
const assignId = (req, res, next) => {
    req.id = uuid();
    next();
};

morgan.token("id", function getId(req) {
    return req.id;
});

app.use(assignId);
app.use(morgan(function (tokens, req, res) {
    // const id = req.id;
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const status = tokens.status(req, res);
    // const content_length = tokens.res(req, res, "content-length");
    const res_time = tokens["response-time"](req, res);
    Logger.log("info", {
        "title": method,
        "message": `(${status}) - ${res_time}`,
        "url": url
    });
}));

// if (env == "development") {
//     app.use(morgan(":method :url (:status) - :response-time ms"));
// } else if (env == "test") {
//     app.use(morgan("tiny"));
// } else {
//     app.use(morgan("[:date[clf]] :id :method :url :status - :response-time ms"));
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Require our routes into the application.
const indexRoute = require("./app/routes");

const ignore = ["create", "delete", "update"];

indexRoute(app, {
    "default_path": "/api",
    "version": "v1",
    "fixtures": require("./app/db/fixtures/index")
}, [{
    "model": {
        "object": require("./app/models").speaker,
        "clear": true
    },
    "controller": {
        "ignore": ignore
    }
}, {
    "model": {
        "object": require("./app/models").member,
        "clear": true
    },
    "controller": {
        "ignore": ignore
    }
}, {
    "model": {
        "object": require("./app/models").location,
        "clear": true
    },
    "controller": {
        "ignore": ignore
    }
}, {
    "model": {
        "object": require("./app/models").banner,
        "clear": true
    },
    "controller": {
        "ignore": ignore
    }
}, {
    "model": {
        "object": require("./app/models").event
    }
}]);

app.get("/", (req, res) => {
    require("./app/apis/response").set_200(res, "Empty page, learn more on document");
});

/**
 * 
 * @api {get} /version get app version
 * @apiName GetVersion
 * @apiGroup version
 * @apiVersion  0.2.0-beta.2
 * 
 * @apiSuccess (200) {Object} response Response object
 * @apiSuccess (200) {Boolean} response.complete complete flag
 * @apiSuccess (200) {String} response.result version as string
 * 
 * @apiSuccessExample  {Object} Success-Example:
 * {
 *      "complete": true,
 *      "result": "0.2.0-beta.2"
 * }
 * 
 */
app.get("/version", (req, res) => {
    require("./app/apis/response").set_200(res, package["version"]);
});

const server = app.listen(port, () => {
    const supportsColor = require("supports-color");
    const chalk = require("chalk");

    if (supportsColor.stdout) {
        Logger.log("info", "Terminal stdout supports color");
    }

    if (supportsColor.stdout.has256) {
        Logger.log("info", "Terminal stdout supports 256 colors");
    }

    if (supportsColor.stderr.has16m) {
        Logger.log("info", "Terminal stderr supports 16 million colors (truecolor)");
    }

    Logger.log("info", "RESTful API server started on: " + port + " as '" + chalk `{red.underline ${env}}` + "'");
});

module.exports = {
    app: app,
    server: server
};