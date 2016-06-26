import {createLogger} from '../logger';
import {deleteMeeting, setNewHosts} from '../../shared/actions';
import _ from 'lodash';

const deleteOnLockedAndEmpty = ({getState, dispatch}) => next => action => {
  const logger = createLogger('Middleware: Cleanup Locked & Empty');
  logger.debug('Checking locked and empty');
  const {roomName} = getState();
  const result = next(action);
  const updatedState = getState();
  if(updatedState.locked && _.isEmpty(updatedState.participants)){
    logger.warn(`Everyone left the locked meeting ${roomName}. Cleaning it up`);
    dispatch(deleteMeeting());
  }
  return result;
};

const allowHostsIfNone = ({getState, dispatch}) => next => action => {
  const logger = createLogger('Middleware: Reset Allow Hosts');
  logger.debug('Checking for no hosts and no new hosts allowed');
  const result = next(action);
  const updatedState = getState();
  const hosts = updatedState.participants.filter(participant => participant.host);
  logger.debug(`Are hosts allowed: ${updatedState.newHosts} Are there any hosts: ${_.isEmpty(hosts)}`);
  if(!updatedState.newHosts && _.isEmpty(hosts)){
    logger.info('There were no hosts, and new hosts were not allowed, so new hosts were unlocked');
    dispatch(setNewHosts(true));
  }
  return result;
};

const cleanupMiddleware = [deleteOnLockedAndEmpty, allowHostsIfNone];
export default cleanupMiddleware;
