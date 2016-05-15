import {ActionHandler, handleActions} from '../actionHandler';

const lockOutToggle = new ActionHandler('LOCKED_OUT', (lockedOut = false, action) => {
  return action.lockedOut;
});

const actions = [lockOutToggle];

const lockedOutReducer = (lockedOut = false, action) => {
  const newLockedOut = handleActions(actions, lockedOut, action);
  Object.freeze(newLockedOut);
  return newLockedOut;
};

export default lockedOutReducer;
