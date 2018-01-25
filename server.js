const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid/v1");


const env = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;

const app = express();

// logging
const assignId = (req, res, next) => {
    req.id = uuid();
    next();
};

logger.token("id", function getId(req) {
    return req.id;
});

app.use(assignId);

if (env == "development") {
    app.use(logger(":method :url (:status) - :response-time ms"));
} else if (env == "test") {
    app.use(logger("tiny"));
} else {
    app.use(logger("[:date[clf]] :id :method :url :status - :response-time ms"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Require our routes into the application.
const indexRoute = require("./app/routes");

const ignore = ["create", "delete", "update"];

/**
 * 
 */
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
}]);

const server = app.listen(port, () => {
    console.log("RESTful API server started on: " + port + " as '" + env + "'");
});

module.exports = {
    app: app,
    server: server
};