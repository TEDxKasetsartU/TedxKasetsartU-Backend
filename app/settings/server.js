const morgan_callback = Logger => {
    return (tokens, req, res) => {
        const id = tokens.id(req, res);
        const method = tokens.method(req, res);
        const url = tokens.url(req, res);
        const status = tokens.status(req, res);
        const content_length = tokens.res(req, res, "content-length");
        const res_time = tokens["response-time"](req, res);
        Logger.log("info", {
            title: "Server requested",
            message: `Request id ${id}`,
            request: {
                name: "",
                method: `${method}`,
                url: url
            },
            other: {
                status: status,
                content_length: content_length,
                time: `${res_time} ms`
            }
        });
    };
};

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
module.exports = (expressApp, setting) => {
    const morgan = require("morgan");
    const bodyParser = require("body-parser");

    const uuid = require("uuid/v1");
    const sign_session_id = (req, res, next) => {
        req.id = uuid();
        next();
    };

    morgan.token("id", req => req.id);

    expressApp.use(sign_session_id);
    expressApp.use(morgan(morgan_callback(setting.api.l.logger)));
    expressApp.use(bodyParser.json()); // for parse 'application/json'

    // expressApp.use(bodyParser.urlencoded({
    // extended: false
    // })); // for parse 'application/x-www-form-urlencoded'
};
