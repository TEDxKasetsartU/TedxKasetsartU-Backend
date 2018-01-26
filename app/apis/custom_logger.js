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
    let header = chalk `{blue ${info.timestamp}} {blueBright [${info.label}]} ${info.level}: `;

    if (typeof info.message == "string") {
        header += `${info.message}`;
    }
    if (info.message.title) {
        header += chalk `{red.bold ${info.message.title}}`;
    }
    if (info.message.url) {
        const env = process.env.NODE_ENV || "development";
        let prefix = "http://localhost:3000";

        if (env == "development") {
            prefix = "http://localhost:3000";
        } else if (env == "citest" || env == "test") {
            prefix = "http://localhost:3000";
        } else {
            prefix = "https://tedxku-backend.herokuapp.com";
        }
        header += chalk ` {green.underline ${prefix}${info.message.url}}`;
    }
    if (info.message.message) {
        header += chalk ` {blue ${info.message.message}}`;
    }

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

module.exports = {
    logger,
    defaultFormat
};