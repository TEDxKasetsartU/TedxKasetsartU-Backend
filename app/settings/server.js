module.exports = (expressApp, responseUtil, Logger) => {
    const morgan = require("morgan");
    const bodyParser = require("body-parser");

    // const uuid = require("uuid/v1");
    // morgan.token("id", function getId(req) {
    //     return req.id;
    // });
    // expressApp.use((req, res, next) => {
    //     req.id = uuid();
    //     next();
    // });

    expressApp.use(morgan((tokens, req, res) => {
        // const id = req.id;
        const method = tokens.method(req, res);
        const url = tokens.url(req, res);
        const status = tokens.status(req, res);
        // const content_length = tokens.res(req, res, "content-length");
        const res_time = tokens["response-time"](req, res);
        Logger.log("info", {
            "title": method,
            "message": `(${status}) - ${res_time} ms`,
            "url": url
        });
    }));

    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({
        extended: false
    }));

    Logger.log("info", {
        "title": "GET-EMPTY",
        "url": "/"
    });
    expressApp.get("/", (req, res) => {
        responseUtil.set_200(res, "Empty page, learn more on document");
    });

    Logger.log("info", {
        "title": "GET-VERSION",
        "url": "/version"
    });
    expressApp.get("/version", (req, res) => {
        const app_setting = require("./settings").app_setting;
        responseUtil.set_200(res, app_setting.version);
    });
};