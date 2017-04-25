const sendMessage = (text, userName) => {
  return {
    type: 'POST_MESSAGE',
    text,
    by: userName
  };
};

const joinChat = (chat) => {
  const action = {
    type: 'JOIN_CHAT'
  };
  return Object.assign({}, action, chat);
};

const addParticipant = participant => {
  return {
    type: 'ADD_PARTICIPANT',
    participant
  };
};

const removeParticipant = participantId => {
  return {
    type: 'REMOVE_PARTICIPANT',
    participantId
  };
};

export {
  sendMessage,
  joinChat,
  addParticipant,
  removeParticipant,
};
