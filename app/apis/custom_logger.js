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
const chalk = require("chalk");

const defaultFormat = (info, opts) => {
    const setting = require("../settings");

    let header = chalk `{cyan ${info.timestamp}} {cyanBright [${info.label}-${setting.env}]} ${info.level}: `;

    if (typeof info.message == "string")
        header += `${info.message}`;
    if (info.message.title)
        // header += `${info.message.title}`;
        header += chalk `{magentaBright.bold ${info.message.title}}`;
    if (info.message.url) {
        let url = (setting.env === "production") ? setting.server.url : setting.server.url + ":" + setting.server.port;
        // header += ` ${url}${info.message.url}`;
        header += chalk ` {blueBright.underline ${url}${info.message.url}}`;
    }
    if (info.message.message)
        // header += ` ${info.message.message}`;
        header += chalk ` {greenBright ${info.message.message}}`;

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