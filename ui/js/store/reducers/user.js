import {ActionHandler, handleActions} from '../actionHandler';
const initialValue = '';
const deleteMeeting = new ActionHandler('DELETE_MEETING', () => initialValue);
const joinMeeting = new ActionHandler('JOIN_MEETING', (userId, action) => action.userId || userId);

const actions = [joinMeeting, deleteMeeting];

const userReducer = (userId = initialValue, action) => {
  const newUserId = handleActions(actions, userId, action);
  Object.freeze(newUserId);
  return newUserId;
};

export default userReducer;
