const {
    createLogger,
    format,
    transports
} = require("winston");
const {
    combine,
    timestamp,
    label,
    printf
} = format;

// FIXME: implement colors in logging
// const colors = require("colors");
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
        header += util.format("%s%s%s", `${info.message.title.toUpperCase()}`, `${defaultTo(" |> ", info.message.message)}`, `${defaultTo(" <=< " + url, info.message.url, " >=>")}`);
    return header;
};

const logFormat = printf(defaultFormat);

const logger = createLogger({
    format: combine(
        format.splat(),
        label({
            label: "TEDxKU"
        }),
        timestamp(),
        logFormat
    ),
    transports: [new transports.Console()]
});

const logger_file = createLogger({
    format: combine(
        label({
            label: "TEDxKU"
        }),
        timestamp(),
        format.splat(),
        format.json(),
        format.prettyPrint()
    ),
    transports: [new transports.Console()]
});

new transports.File({
    filename: "logs/verbose.log"
});

logger_file.info("test message %d", 123);

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