const createMeeting = (meetingName) => {
  return {
    type: 'CREATE_MEETING',
    name: meetingName
  };
};

const filterMeetings = (meetingFilter) => {
  const filter = new RegExp(meetingFilter, 'ig');
  return {
    type: 'FILTER_MEETINGS',
    filter
  };
};

const postTopic = (topic, userName) => {
  return {
    type: 'POST_TOPIC',
    title: topic,
    by: userName
  };
};

const removeTopic = topicId => {
  return {
    type: 'REMOVE_TOPIC',
    id: topicId
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
  filterMeetings,
  postTopic,
  removeTopic,
  joinMeeting,
  addParticipant,
  removeParticipant,
  setRoomName
};
