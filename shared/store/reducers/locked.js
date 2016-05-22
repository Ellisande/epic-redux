import {ActionHandler, handleActions} from '../actionHandler';

const initialValue = false;
const deleteMeeting = new ActionHandler('DELETE_MEETING', () => initialValue);

const joinMeeting = new ActionHandler('JOIN_MEETING', (locked, action) => action.locked);
const setLocked = new ActionHandler('SET_LOCKED', (locked, action) => action.locked);

const actions = [joinMeeting, setLocked, deleteMeeting];

const lockedReducer = (locked = initialValue, action) => {
  const newLocked = handleActions(actions, locked, action);
  Object.freeze(newLocked);
  return newLocked;
};

export default lockedReducer;
