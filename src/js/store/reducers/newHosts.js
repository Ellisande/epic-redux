import {ActionHandler, handleActions} from '../actionHandler';

const joinMeeting = new ActionHandler('JOIN_MEETING', (newHosts, action) => action.newHosts);
const setNewHosts = new ActionHandler('SET_NEW_HOSTS', (newHosts, action) => action.newHosts);

const actions = [joinMeeting, setNewHosts];

const newHostsReducer = (newHosts = [], action) => {
  const newNewHosts = handleActions(actions, newHosts, action);
  Object.freeze(newNewHosts);
  return newNewHosts;
};

export default newHostsReducer;
