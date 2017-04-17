import {ActionHandler, handleActions} from '../actionHandler';
const initialValue = [];

const joinChat = new ActionHandler('JOIN_CHAT', (messages, action) => action.messages);

const sendMessage = new ActionHandler('POST_MESSAGE', (messages, action) => {
  const {text, by} = action;
  return [...messages, {text, by}];
});

const actions = [joinChat, sendMessage];

const messageReducer = (messages = initialValue, action) => {
  const newMessages = handleActions(actions, messages, action);
  newMessages.forEach(message => Object.freeze(message));
  Object.freeze(newMessages);
  return newMessages;
};

export default messageReducer;
