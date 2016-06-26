import {createLogger} from '../logger';

const loggingMiddleware = store => next => action => {
  const logger = createLogger('Middleware: Logging');
  logger.debug('Entering store', action, store.getState().locked);
  const result = next(action);
  logger.debug('Leaving store', result, store.getState().locked);
  return result;
};

const afterActionLogger = createLogger('Middleware: After Action');
const afterActionMiddleware = (actionType, callback) => store => next => action => {
  afterActionLogger.debug('Entering');
  if(actionType === action.type){
    afterActionLogger.debug('Action matched');
    const result = next(action);
    afterActionLogger.debug('Action dispatched');
    const newAction = callback(store, result);
    afterActionLogger.debug('Callback invoked. Result: ', newAction);
    return newAction;
  }
  afterActionLogger.debug('No match, continuing');
  return next(action);
};

const beforeActionLogger = createLogger('Middleware: Before Action');
const beforeActionMiddleware = (actionType, callback) => store => next => action => {
  beforeActionLogger.debug('Entering');
  if(actionType === action.type){
    beforeActionLogger.debug('Type matched, invoking callback', action.type);
    const newAction = callback(store, action);
    beforeActionLogger.debug('Callback complete. Result:', newAction);
    return next(newAction);
  }
  beforeActionLogger.debug('No match, continuing');
  return next(action);
};

export {loggingMiddleware, afterActionMiddleware, beforeActionMiddleware};
