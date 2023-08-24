import winston from "winston";
import path from "path";
import "winston-daily-rotate-file";

function dailyLogger(object) {
    const { level } = object;
    const name = object;
    const datePattern = 'DD-MM-YYYY';

    return new winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
        ),
        transports: [
            new winston.transports.DailyRotateFile({
                name,
                filename: path.join(__dirname, '../', 'logs/%DATE%', `${name}.log`),
                datePattern,
                level: level || 'info',
            }),
        ]
    });
}

export default { dailyLogger };