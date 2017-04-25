const initialValue = [];

const messageReducer = (messages = initialValue, action) => {
  if(action.type === 'JOIN_CHAT'){
    return action.messages || messages;
  }
  if(action.type === 'POST_MESSAGE'){
    const {text, by} = action;
    return [...messages, {text, by}];
  }
  return messages;
};

export default messageReducer;
