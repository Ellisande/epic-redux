import {ActionHandler, handleActions} from '../actionHandler';
const initialValue = [];
const deleteMeeting = new ActionHandler('DELETE_MEETING', () => initialValue);
const joinMeeting = new ActionHandler('JOIN_MEETING', (messages, action) => action.messages);

const sendMessage = new ActionHandler('POST_MESSAGE', (messages, action) => {
  const {text, by} = action;
  return [...messages, {text, by}];
});

const removeMessage = new ActionHandler('REMOVE_MESSAGE', (messages, action) => messages.filter(message => message.text !== action.id));

const actions = [joinMeeting, sendMessage, removeMessage, deleteMeeting];

const messageReducer = (messages = initialValue, action) => {
  const newMessages = handleActions(actions, messages, action);
  newMessages.forEach(message => Object.freeze(message));
  Object.freeze(newMessages);
  return newMessages;
};

export default messageReducer;
