import {ActionHandler, handleActions} from '../actionHandler';
const initialValue = [];

const joinMeeting = new ActionHandler('JOIN_MEETING', (messages, action) => action.messages);

const sendMessage = new ActionHandler('POST_MESSAGE', (messages, action) => {
  const {text, by} = action;
  return [...messages, {text, by}];
});

const actions = [joinMeeting, sendMessage];

const messageReducer = (messages = initialValue, action) => {
  const newMessages = handleActions(actions, messages, action);
  newMessages.forEach(message => Object.freeze(message));
  Object.freeze(newMessages);
  return newMessages;
};

export default messageReducer;
