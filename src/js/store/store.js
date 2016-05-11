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


let reducers = combineReducers({
  meetings: meetingReducer,
  participants: participantReducer,
  userId: userReducer,
  phase: phaseReducer,
  roomName: roomNameReducer,
  timer: (timer = 350000) => timer,
  phaseVotes: (phaseVotes = []) => phaseVotes,
  topics: topicsReducer,
  locked: lockedReducer,
  newHosts: newHostsReducer
});

let store = createStore(reducers);

const createNewStore = createStore.bind(this, reducers);
export {createNewStore as createStore};
export default store;
