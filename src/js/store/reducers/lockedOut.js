import {ActionHandler, handleActions} from '../actionHandler';

const initialValue = false;
const deleteMeeting = new ActionHandler('DELETE_MEETING', () => initialValue);

const lockOutToggle = new ActionHandler('LOCKED_OUT', (lockedOut = false, action) => {
  return action.lockedOut;
});

const actions = [lockOutToggle, deleteMeeting];

const lockedOutReducer = (lockedOut = initialValue, action) => {
  const newLockedOut = handleActions(actions, lockedOut, action);
  Object.freeze(newLockedOut);
  return newLockedOut;
};

export default lockedOutReducer;
