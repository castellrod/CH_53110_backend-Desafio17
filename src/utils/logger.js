const { createLogger, format, transports } = require('winston');
const {combine} = format;
const path = require('path');

const logLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue'
    }
};

const devLogger = createLogger({
    levels: logLevels.levels,
    format: combine(
        format.colorize(),
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.printf(({level, message, timestamp, stack}) => {
            return `${timestamp} ${level}: ${stack || message}`;
        })
    ),
    transports: [
        new transports.Console({level: 'debug'}),
        new transports.File({
            filename: path.join(__dirname, '../logs/error.log'),
            level: 'error',
            format: format.combine(
                format.uncolorize(),
                format.timestamp(),
                format.json()
            )
        }),
    ]
});



const prodLogger = createLogger({
    levels: logLevels.levels,
    format: combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.json()
    ),
    transports: [
        new transports.Console({level: 'info'}),
        new transports.File({
            filename: path.join(__dirname, '../logs/error.log'),
            level: 'error',
            format: format.combine(
                format.uncolorize(),
                format.timestamp(),
                format.json()
            )
        }),
    ]
});

const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;


const { addColors } = require('winston/lib/winston/config');

addColors(logLevels.colors);

module.exports = logger;