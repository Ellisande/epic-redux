import pino from 'pino';
const createLogger = (loggerName, level) => pino({
  name: loggerName,
  level: level || 'warn'
});
export default createLogger();
export {createLogger};
