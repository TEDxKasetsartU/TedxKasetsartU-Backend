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
const chalk = require("chalk");

const defaultFormat = (info) => {
    const setting = require("../settings");

    let header = chalk `{blue ${info.timestamp}} {blueBright [${info.label}-${setting.env}]} ${info.level}: `;

    if (typeof info.message == "string")
        header += `${info.message}`;
    if (info.message.title)
        header += chalk `{red.bold ${info.message.title}}`;
    if (info.message.url) {
        let url = (setting.env === "production") ? setting.server.url : setting.server.url + ":" + setting.server.port;
        header += chalk ` {green.underline ${url}${info.message.url}}`;
    }
    if (info.message.message)
        header += chalk ` {blue ${info.message.message}}`;

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