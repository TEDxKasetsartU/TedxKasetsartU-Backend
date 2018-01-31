const {
    createLogger,
    format,
    transports,
    config
} = require("winston");
const {
    combine,
    timestamp,
    label,
    printf
} = format;

// FIXME: implement colors in logging
const colors = require("colors");
const util = require("util");

const defaultFormat = (info) => {
    const setting = require("../settings");
    const defaultTo = (prefix = "", value, profix = "") => {
        return value == null || value !== value ? "" : prefix + value + profix;
    };

    let header = `${info.timestamp} [${info.label}-${setting.env}] ${info.level}: `;
    let url = (setting.env === "production") ? setting.server.url : setting.server.url + ":" + setting.server.port;

    if (typeof info.message == "string")
        header += `${info.message}`;
    else
        header += util.format("%s%s%s", `${info.message.title}`, `${defaultTo(" |> ", info.message.message)}`, `${defaultTo(" <=< " + url, info.message.url, " >=>")}`);
    return header;
};

const logFormat = printf(defaultFormat);

const level = process.env.NODE_ENV === "production" ? "info" : "silly";

const logger = createLogger({
    level: level,
    levels: config.npm.levels,
    format: combine(
        format.colorize(),
        format.splat(),
        label({
            label: "TEDxKU"
        }),
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console({
            colorize: true
        })
    ]
});

// new transports.File({
//     colorize: false,
//     filename: "logs/error.log",
//     level: "error"
// }),
// new transports.File({
//     colorize: false,
//     filename: "logs/combined.log"
// }),

const show_api_path = (action, url) => {
    logger.log("info", {
        "title": action,
        "url": url
    });
};

module.exports = {
    logger,
    defaultFormat,
    util: {
        show_api_path: show_api_path
    }
};