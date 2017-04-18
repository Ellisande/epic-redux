import {createLogger} from '../logger';

const loggingMiddleware = store => next => action => {
  const logger = createLogger('Middleware: Logging');
  logger.debug('Entering store', action, store.getState().locked);
  const result = next(action);
  logger.debug('Leaving store', result, store.getState().locked);
  return result;
};

export {loggingMiddleware};
