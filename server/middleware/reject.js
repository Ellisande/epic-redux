import {createLogger} from '../logger';
const logger = createLogger('Middleware: Reject');

const rejectIfNotPhase = (phase, actionType) => {
  return store => next => action => {
    logger.debug('Enter');
    const isPhase = store.getState().phase === phase;
    if(!isPhase && action.type === actionType){
      logger.warn(`Rejected Action ${action.type} from ${action.userId}`);
      //Eat the action, its not allowed in this phase
      return next({type: 'DO_NOTHING'});
    }
    logger.debug('Allowed action');
    return next(action);
  };
};

const rejectIfNotHost = hostActionTypes => store => next => action => {
  logger.debug('Entering', store.getState().participants);
  const currentUser = store.getState().participants.find(participant => participant.id === action.userId);
  logger.debug('Current user', currentUser);
  const userIsHost = currentUser && currentUser.host;
  logger.debug('Is host', userIsHost);
  if(hostActionTypes.includes(action.type) && !userIsHost){
    logger.warn(`Rejected action ${action.type} from ${action.userId}`);
    return next({type: 'DO_NOTHING'});
  }
  logger.debug('Allowed action', action.type);
  return next(action);
};

const rejectIfNotHostUnlessNoHosts = hostActionTypes => store => next => action => {
  logger.debug('Entering', store.getState().participants);
  const currentUser = store.getState().participants.find(participant => participant.id === action.userId);
  logger.debug('Current user', currentUser);
  const userIsHost = currentUser && currentUser.host;
  logger.debug('Is host', userIsHost);
  const atLeastOneHost = store.getState().participants.find(participant => participant.host);
  if(hostActionTypes.includes(action.type) && !userIsHost && atLeastOneHost){
    logger.warn(`Rejected action ${action.type} from ${action.userId}`);
    return next({type: 'DO_NOTHING'});
  }
  logger.debug('Allowed action', action.type);
  return next(action);
};

const rejectTopics = rejectIfNotPhase('submit', 'POST_TOPIC');
const rejectUpVotes = rejectIfNotPhase('vote', 'UP_VOTE');
const rejectDownVotes = rejectIfNotPhase('vote', 'DOWN_VOTE');
const rejectDelete = rejectIfNotPhase('merge', 'REMOVE_TOPIC');
const rejectNextTopic = rejectIfNotPhase('discuss', 'NEXT_TOPIC');
const rejectWhenNotHost = rejectIfNotHost(['SET_PHASE_MERGE', 'SET_PHASE_DISCUSS', 'SET_PHASE_COMPLETE', 'REMOVE_TOPIC', 'NEXT_TOPIC', 'SET_LOCKED', 'APPROVE_KNOCKER', 'REJECT_KNOCKER', 'ALLOW_KNOCKING', 'DISABLE_KNOCKING']);
const rejectWhenNotHostUnlessNone = rejectIfNotHostUnlessNoHosts(['SET_NEW_HOSTS', 'DELETE_MEETING']);
const rejectMiddleware = [rejectWhenNotHost, rejectWhenNotHostUnlessNone, rejectTopics, rejectUpVotes, rejectDownVotes, rejectDelete, rejectNextTopic];

export default rejectMiddleware;
