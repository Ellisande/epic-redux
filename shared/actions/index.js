const createMeeting = (meetingName) => {
  return {
    type: 'CREATE_MEETING',
    name: meetingName
  };
};

const sendMessage = (text, userName) => {
  return {
    type: 'POST_MESSAGE',
    text,
    by: userName
  };
};

const joinChat = (meeting) => {
  const action = {
    type: 'JOIN_CHAT'
  };
  return Object.assign({}, action, meeting);
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
  createMeeting,
  sendMessage,
  joinChat,
  addParticipant,
  removeParticipant,
};
