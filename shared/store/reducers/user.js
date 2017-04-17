import {ActionHandler, handleActions} from '../actionHandler';
const initialValue = '';

const joinChat = new ActionHandler('JOIN_CHAT', (userId, action) => action.userId || userId);

const actions = [joinChat];

const userReducer = (userId = initialValue, action) => {
  const newUserId = handleActions(actions, userId, action);
  Object.freeze(newUserId);
  return newUserId;
};

export default userReducer;
