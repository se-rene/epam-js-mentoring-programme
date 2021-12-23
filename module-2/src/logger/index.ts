import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, splat, colorize, printf } = format;

export default createLogger({
	format: combine(
		timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
		splat(),
		colorize(),
		printf(
			({ level, message, timestamp }) =>
				`${timestamp} | ${level}: ${
					typeof message === "string" ? message : JSON.stringify(message)
				}`
		)
	),
	transports: [new transports.Console()],
});
