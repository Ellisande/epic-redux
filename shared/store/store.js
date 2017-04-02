import {
  createStore,
  combineReducers
} from 'redux';

import participantReducer from './reducers/participants';
import meetingReducer from './reducers/meetings';
import userReducer from './reducers/user';
import topicsReducer from './reducers/topics';
import roomNameReducer from './reducers/roomName';

let reducers = combineReducers({
  meetings: meetingReducer,
  participants: participantReducer,
  userId: userReducer,
  roomName: roomNameReducer,
  topics: topicsReducer,
});

const attachDevTools = () => {
  return window.devToolsExtension ? window.devToolsExtension() : undefined;
};
let store = createStore(reducers, {}, process.title === 'browser' ? attachDevTools() : undefined);

const createNewStore = createStore.bind(this, reducers);
export {createNewStore as createStore};
export default store;
