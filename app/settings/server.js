/**
 * config file for setting express application
 * 
 * @name ServerSetting
 * 
 * @param {Object} expressApp express app
 * @param {Object} Logger logger for log
 * 
 * @version 0.3.0
 * @author Kamontat Chantrachirathumrong
 */
module.exports = (expressApp, Logger) => {
    const morgan = require("morgan");
    const bodyParser = require("body-parser");
    const session = require("express-session");

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

    // app.set("trust proxy", 1); // trust first proxy
    expressApp.use(session({
        secret: "something",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true,
            maxAge: 10 * 60 * 100 // 10 minutes | 600,000 ms
        }
    }));
};