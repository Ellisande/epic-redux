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

const removeMessage = messageId => {
  return {
    type: 'REMOVE_MESSAGE',
    id: messageId
  };
};

const joinMeeting = (meeting) => {
  const action = {
    type: 'JOIN_MEETING'
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

const setRoomName = roomName => {
  return {
    type: 'SET_ROOM_NAME',
    roomName
  };
};

export {
  createMeeting,
  sendMessage,
  removeMessage,
  joinMeeting,
  addParticipant,
  removeParticipant,
  setRoomName
};
