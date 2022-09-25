import 'winston-daily-rotate-file';
import { relative } from 'path';
import {
	createLogger,
	transports as _transports,
	format as _format,
} from 'winston';

export function loggerOnlyGlobal(filename: string) {
	const loggerGlobal = globalLogger(filename);
	return {
		info: function info(...args: any) {
			loggerGlobal.info(...args);
			console.log(...args);
		},
		warn: function warn(...args: any) {
			loggerGlobal.warn(...args);
			console.log(...args);
		},
		error: function error(...args: any) {
			loggerGlobal.info(...args);
			console.error(...args);
		},
		inTerminal: {
			info: function info(...args: any) {
				console.log(...args);
			},
			warn: function warn(...args: any) {
				console.warn(...args);
			},
			error: function error(...args: any) {
				console.error(...args);
			},
		},
		inFile: {
			info: function info(...args: any) {
				loggerGlobal.log(...args);
			},
			warn: function warn(...args: any) {
				loggerGlobal.warn(...args);
			},
			error: function error(...args: any) {
				loggerGlobal.error(...args);
			},
		},
	};
}

export function logger(filename: string, localLogPath: string) {
	const loggerGlobal = globalLogger(filename);
	const loggerLocal = localLogger(filename, localLogPath);

	return {
		info: function info(...args: any) {
			loggerGlobal.info(...args);
			loggerLocal.info(...args);
			console.log(...args);
		},
		warn: function warn(...args: any) {
			loggerGlobal.warn(...args);
			loggerLocal.warn(...args);
			console.warn(...args);
		},
		error: function error(...args: any) {
			loggerGlobal.info(...args);
			loggerLocal.info(...args);
			console.error(...args);
		},
		inTerminal: {
			info: function info(...args: any) {
				console.log(...args);
			},
			warn: function warn(...args: any) {
				console.warn(...args);
			},
			error: function error(...args: any) {
				console.error(...args);
			},
		},
		inFile: {
			info: function info(...args: any) {
				loggerGlobal.log(...args);
				loggerLocal.log(...args);
			},
			warn: function warn(...args: any) {
				loggerGlobal.warn(...args);
				loggerLocal.warn(...args);
			},
			error: function error(...args: any) {
				loggerGlobal.error(...args);
				loggerLocal.error(...args);
			},
		},
	};
}

const globalLogger = (filename: string) => {
	//@ts-ignore
	const logger = new createLogger({
		transports: [
			new _transports.DailyRotateFile({
				level: 'info',
				maxFiles: 10,
				filename: './logs/%DATE%_info.log',
				format: _format.combine(
					_format.splat(),
					_format.timestamp(),
					_format.printf((info) => {
						return `${info.timestamp} ${relative(process.cwd(), filename)} ${
							info.level
						}: ${info.message}`;
					})
				),
			}),
			new _transports.DailyRotateFile({
				level: 'warn',
				maxFiles: 10,
				filename: './logs/%DATE%_warn.log',
				format: _format.combine(
					_format.splat(),
					_format.timestamp(),
					_format.printf((warn) => {
						return `${warn.timestamp} ${relative(process.cwd(), filename)} ${
							warn.level
						}: ${warn.message}`;
					})
				),
			}),
			new _transports.DailyRotateFile({
				level: 'error',
				maxFiles: 10,
				filename: './logs/%DATE%_error.log',
				format: _format.combine(
					_format.splat(),
					_format.timestamp(),
					_format.printf((error) => {
						return `${error.timestamp} ${relative(process.cwd(), filename)} ${
							error.level
						}: ${error.message}`;
					})
				),
			}),
		],
	});
	return logger;
};

const localLogger = (filename: string, moduleRelativePath: string) => {
	//@ts-ignore
	const logger = new createLogger({
		transports: [
			new _transports.DailyRotateFile({
				level: 'info',
				maxFiles: 10,
				filename: moduleRelativePath + './logs/%DATE%_info.log',
				format: _format.combine(
					_format.splat(),
					_format.timestamp(),
					_format.printf((info) => {
						return `${info.timestamp} ${relative(process.cwd(), filename)} ${
							info.level
						}: ${info.message}`;
					})
				),
			}),
			new _transports.DailyRotateFile({
				level: 'warn',
				maxFiles: 10,
				filename: moduleRelativePath + './logs/%DATE%_warn.log',
				format: _format.combine(
					_format.splat(),
					_format.timestamp(),
					_format.printf((warn) => {
						return `${warn.timestamp} ${relative(process.cwd(), filename)} ${
							warn.level
						}: ${warn.message}`;
					})
				),
			}),
			new _transports.DailyRotateFile({
				level: 'error',
				maxFiles: 10,
				filename: moduleRelativePath + './logs/%DATE%_error.log',
				format: _format.combine(
					_format.splat(),
					_format.timestamp(),
					_format.printf((error) => {
						return `${error.timestamp} ${relative(process.cwd(), filename)} ${
							error.level
						}: ${error.message}`;
					})
				),
			}),
		],
	});
	return logger;
};
