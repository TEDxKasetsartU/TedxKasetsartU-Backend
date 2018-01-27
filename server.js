const express = require("express");
const morgan = require("morgan");
const Logger = require("./app/apis/custom_logger").logger;
const bodyParser = require("body-parser");
const uuid = require("uuid/v1");
const app_setting = require("./package.json");

const env = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;
const app = express();

morgan.token("id", function getId(req) {
    return req.id;
});

app.use((req, res, next) => {
    req.id = uuid();
    next();
});

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Require our routes into the application.
const indexRoute = require("./app/routes");

const ignore = ["create", "delete", "update"];

module.exports = indexRoute(app, {
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
    },
    "controller": {
        "object": require("./app/controllers/event_controller")
    },
    "functions": [
        (express, model, controller, path_name, path_pl_name, log_func) => {
            if (controller.can_do("list")) {
                log_func("list (year)", path_pl_name + "/:year");
            }
            express.get(path_pl_name + "/:year", (req, res) => {
                return controller.list_by_year(req, res);
            });
        }
    ]
}]).then(() => {
    /**
     * 
     * @api {GET} / error page
     * @apiName EmptyPage
     * @apiGroup Error
     * @apiVersion  0.2.0-beta.2
     * 
     * @apiSuccess (200) {json} message empty page message
     * 
     * @apiSuccessExample  {json} Request-Example:
       {
           "complete": true,
           "result":"Empty page, learn more on document"
        }
     * 
     */
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
        require("./app/apis/response").set_200(res, app_setting["version"]);
    });

    return new Promise((res) => {
        const server = app.listen(port, () => {
            const chalk = require("chalk");

            Logger.log("info", "RESTful API server started on: " + port + " as '" + chalk `{red.underline ${env}}` + "'");
        });

        res({
            "app": app,
            "server": server
        });
    });
});