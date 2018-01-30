const express = require("express");

const setting = require("./app/settings");

const Logger = setting.api.l.logger;
const responseUtil = setting.api.r;

const env = setting.env;
const server_info = setting.server;

const port = server_info.port;
const server_setting = server_info.setting;

const app = express();
server_setting(app, Logger);

const Route = setting.route.object;

Route.default(app, responseUtil, Logger);
Route.create(app, server_info.path, new setting.controller.event(setting.model.event), {
    fixture: {
        load: true,
        clear: true
    },
    action: ["get", "list"],
    customs: [{
        name: "list_years",
        type: "list",
        method: "list_year",
        path: "/years"
    }, {
        name: "list_filter_year",
        type: "list",
        method: "list_by_year",
        path: "/:year"
    }]
});

// Route.create(app, server_info.path, new setting.controller.default(setting.model.member), {
//     fixture: {
//         load: true,
//         clear: true
//     },
//     action: ["create", "get", "list", "update", "delete"],
// });

// Route.create(app, server_info.path, new setting.controller.default(setting.model.speaker), {
//     fixture: {
//         load: true,
//         clear: true
//     },
//     action: ["create", "get", "list", "update", "delete"],
// });

app.listen(port, () => {
    const chalk = require("chalk");
    Logger.log("info", "RESTful API server started on: " + port + " as '" + chalk `{red.underline ${env}}` + "'");
});

module.exports = app;