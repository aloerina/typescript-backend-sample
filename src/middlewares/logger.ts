import pino from 'pino';

let logLevel = 'debug';
if (process.env.LOG_LEVEL) logLevel = process.env.LOG_LEVEL;

export const logger = pino({
  level: logLevel,
  formatters: {
    bindings: () => {
      return { pid: undefined };
    },
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
