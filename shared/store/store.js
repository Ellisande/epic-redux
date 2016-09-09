import {
  createStore,
  combineReducers
} from 'redux';

import participantReducer from './reducers/participants';
import meetingReducer from './reducers/meetings';
import phaseReducer from './reducers/phase';
import lockedReducer from './reducers/locked';
import newHostsReducer from './reducers/newHosts';
import userReducer from './reducers/user';
import topicsReducer from './reducers/topics';
import roomNameReducer from './reducers/roomName';
import lockedOutReducer from './reducers/lockedOut';
import allowKnockingReducer from './reducers/allowKnocking';
import knockersReducer from './reducers/knockers';


let reducers = combineReducers({
  meetings: meetingReducer,
  meetingFilter: (meetingFilter = '', action) => {
    if(action.type === 'FILTER_MEETINGS'){
      return action.filter || '';
    }
    return meetingFilter;
  },
  participants: participantReducer,
  userId: userReducer,
  phase: phaseReducer,
  roomName: roomNameReducer,
  timer: (timer = 350000) => timer,
  phaseVotes: (phaseVotes = []) => phaseVotes,
  topics: topicsReducer,
  locked: lockedReducer,
  newHosts: newHostsReducer,
  lockedOut: lockedOutReducer,
  allowKnocking: allowKnockingReducer,
  knockers: knockersReducer
});

const attachDevTools = () => {
  return window.devToolsExtension ? window.devToolsExtension() : undefined;
};
let store = createStore(reducers, {}, process.title === 'browser' ? attachDevTools() : undefined);

const createNewStore = createStore.bind(this, reducers);
export {createNewStore as createStore};
export default store;
