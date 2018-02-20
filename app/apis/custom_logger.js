const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

// FIXME: implement colors in logging const colors = require("colors");
// const util = require("util");

/**
 * @example {
 *      title: "",
 *      message: "",
 *      request: {
 *          url: "",
 *          method: "",
 *          name: ""
 *      }
 * }
 * @param {*} info
 */
const defaultFormat = info => {
    const setting = require("../settings");
    /* const colors = */ require("colors");

    const defaultTo = (prefix = "", value, postfix = "") => {
        return value == null || value !== value ? "" : prefix + value + postfix;
    };

    const optional = value => {
        return value == null || value !== value ? {} : value;
    };
    // remove null, undefined, empty string, empty object
    const remove_empty = obj => {
        Object.entries(obj).forEach(([key, val]) => {
            if (val && typeof val === "object") remove_empty(val);
            else if (val == null || val == undefined || val == "")
                delete obj[key];
            if (val && typeof val === "object" && Object.keys(val).length === 0)
                delete obj[key];
        });
    };

    let result = {
        timestamp: info.timestamp,
        label: info.label,
        environment: setting.env
    };

    if (typeof info.message == "string") {
        result[info.level] = {
            message: info.message
        };
    } else {
        result[info.level] = {
            title: `${defaultTo("", info.message.title, "")}`,
            message: `${defaultTo("|> ", info.message.message, " <|")}`,
            request: {
                name: `${defaultTo(
                    "",
                    optional(info.message.request).name,
                    ""
                )}`,
                method: `${defaultTo(
                    "",
                    optional(info.message.request).method,
                    ""
                )}`,
                url: `${defaultTo(
                    " <=< " + setting.server.url,
                    optional(info.message.request).url,
                    " >=>"
                )}`
            },
            other: optional(info.message.other)
        };
    }
    remove_empty(result);
    if (setting.is_deploy == false) {
        const jsome = require("jsome");
        jsome.colors.attr = ["green" , "bold"];
        jsome.colors.str = "blue";
        result = jsome.getColoredString(result);
    } else {
        // result = JSON.stringify(result, null, setting.is_deploy ? 4 : 0);
        result = JSON.stringify(result, null, 4);
    }
    return result;
};

const error_file = new transports.File({
    filename: "logs/error.error",
    level: "warn",
    colorize: true
});
const log_file = new transports.File({
    filename: "logs/information.log",
    level: "verbose",
    colorize: true
});
const verbose_file = new transports.File({
    filename: "logs/verbose.log",
    level: "silly",
    colorize: true
});
const exception_file = new transports.File({
    filename: "logs/exception.error",
    colorize: true
});
const console = new transports.Console({ level: "silly", colorize: true });

// logger object
const logger = createLogger({
    format: combine(
        format.splat(),
        label({ label: "TEDxKU" }),
        timestamp(),
        printf(defaultFormat)
    ),
    transports: [console],
    exceptionHandlers: [exception_file],
    exitOnError: false
});

const _setup = (logger, deploy) => {
    logger.clear();
    if (deploy) {
        logger
            .add(error_file)
            .add(log_file)
            .add(verbose_file);
    } else logger.add(console);
    return logger;
};

const _log = (type, opt) => {
    const settings = require("../settings");
    _setup(logger, settings.is_deploy).log(type, opt);
};

// utils
const show_api_path = (name, method, url) => {
    _log("info", {
        title: name,
        message: "show available path",
        request: {
            method: method,
            url: url
        }
    });
};

const show_info = (title, message) => {
    _log("info", {
        title: title,
        message: message
    });
};

module.exports = {
    log: {
        verbose: opt => {
            _log("debug", opt);
        },
        info: opt => {
            _log("verbose", opt);
        },
        warning: opt => {
            _log("warning", opt);
        },
        error: opt => {
            _log("error", opt);
        }
    },
    logger: _setup(logger, require("../settings").is_deploy),
    format: {
        default: defaultFormat
    },
    utils: {
        show_api_path: show_api_path,
        show_info: show_info
    }
};
