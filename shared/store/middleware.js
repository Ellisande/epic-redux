import {createLogger} from '../utils/logger';
const rejectIfNotPhase = (phase, actionType) => {
  const logger = createLogger(`Middleware: Reject ${phase} ${actionType}`);
  return store => next => action => {
    logger.debug('Enter');
    const isPhase = store.getState().phase === phase;
    if(!isPhase && action.type === actionType){
      logger.warn(`Rejected Action ${action.type} from ${action.id}`);
      //Eat the action, its not allowed in this phase
      return next({type: 'DO_NOTHING'});
    }
    logger.debug('Allowed action');
    return next(action);
  };
};

const rejectIfNotHost = hostActionTypes => store => next => action => {
  const logger = createLogger('Middleware: Reject Not Host');
  logger.debug('Entering');
  const currentUser = store.getState().participants.find(participant => participant.id === action.id);
  logger.debug('Current user', currentUser);
  const userIsHost = currentUser && currentUser.host;
  logger.debug('Is host', userIsHost);
  if(hostActionTypes.includes(action.type) && !userIsHost){
    logger.warn(`Rejected action ${action.type} from ${action.id}`);
    return next({type: 'DO_NOTHING'});
  }
  logger.debug('Allowed action', action.type);
  return next(action);
};

const logIt = () => next => action => {
  const logger = createLogger('Middleware: Logging');
  logger.debug('Entering store', action);
  const result = next(action);
  logger.debug('Leaving store', result);
  return result;
};

const rejectTopics = rejectIfNotPhase('submit', 'POST_TOPIC');
const rejectUpVotes = rejectIfNotPhase('vote', 'UP_VOTE');
const rejectDownVotes = rejectIfNotPhase('vote', 'DOWN_VOTE');
const rejectDelete = rejectIfNotPhase('merge', 'REMOVE_TOPIC');
const rejectNextTopic = rejectIfNotPhase('discuss', 'NEXT_TOPIC');
const rejectWhenNotHost = rejectIfNotHost(['SET_PHASE_MERGE', 'SET_PHASE_DISCUSS', 'SET_PHASE_COMPLETE', 'REMOVE_TOPIC', 'NEXT_TOPIC', 'SET_LOCKED', 'SET_NEW_HOSTS', 'DELETE_MEETING', 'APPROVE_KNOCKER', 'REJECT_KNOCKER', 'ALLOW_KNOCKING', 'DISABLE_KNOCKING']);
const rejectMiddleware = [rejectWhenNotHost, rejectTopics, rejectUpVotes, rejectDownVotes, rejectDelete, rejectNextTopic];

const afterAction = (actionType, callback) => store => action => next => {
  if(actionType === action.type){
    const result = next(action);
    const newAction = callback(store, result);
    return newAction;
  }
  return next(action);
};

const beforeAction = (actionType, callback) => store => action => next => {
  if(actionType === action.type){
    const newAction = callback(store, action);
    return next(newAction);
  }
  return next(action);
};

export {rejectTopics, rejectUpVotes, rejectDownVotes, rejectDelete, rejectNextTopic, rejectMiddleware, logIt, afterAction, beforeAction};
