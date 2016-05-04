import {createStore} from '../src/js/store';
import {applyMiddleware} from 'redux';
import afterMiddleware from '../src/js/store/afterMiddleware';
const createRoom = (spark, participant) => {
  const cb = action => console.log(action);
  const store = createStore({}, applyMiddleware(afterMiddleware(cb)));
  return {
    sparks: [spark],
    store,
  };
};
