import {
  createStore,
  combineReducers
} from 'redux';

import participantReducer from './reducers/participants';
import userReducer from './reducers/user';
import messagesReducer from './reducers/messages';

let reducers = combineReducers({
  participants: participantReducer,
  userId: userReducer,
  messages: messagesReducer,
});

const attachDevTools = () => {
  return window.devToolsExtension ? window.devToolsExtension() : undefined;
};
let store = createStore(reducers, {}, process.title === 'browser' ? attachDevTools() : undefined);

const createNewStore = createStore.bind(this, reducers);
export {createNewStore as createStore};
export default store;
