const createMeeting = (meetingName) => {
  return {
    type: 'CREATE_MEETING',
    name: meetingName
  };
};

const postTopic = (topic, userName) => {
  return {
    type: 'POST_TOPIC',
    title: topic,
    by: userName
  };
};

const changePhase = (nextPhase = 'submit') => {
  return {
    type: `SET_PHASE_${nextPhase.toUpperCase()}`,
    phase: nextPhase
  };
};

const removeTopic = topicId => {
  return {
    type: 'REMOVE_TOPIC',
    id: topicId
  };
};

const upVote = (topic, userId) => {
  return {
    type: 'UP_VOTE',
    topic,
    userId
  };
};

const downVote = (topic, userId) => {
  return {
    type: 'DOWN_VOTE',
    topic,
    userId
  };
};

const nextTopic = () => {
  return {
    type: 'NEXT_TOPIC'
  };
};

const setHost = (participantId, isHost) => {
  return {
    type: 'SET_HOST',
    isHost,
    id: participantId
  };
};

const setLocked = locked => {
  return {
    type: 'SET_LOCKED',
    locked
  };
};

const setNewHosts = newHosts => {
  return {
    type: 'SET_NEW_HOSTS',
    newHosts
  };
};

const joinMeeting = (meeting) => {
  return {
    type: 'JOIN_MEETING',
    user: meeting.user,
    participants: meeting.participants,
    topics: meeting.topics,
    phase: meeting.phase,
    roomName: meeting.roomName,
    timer: meeting.timer,
    locked: meeting.locked,
    newHosts: meeting.newHosts
  };
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

const deleteMeeting = (meetingName) => {
  return {
    type: 'DELETE_MEETING',
    name: meetingName
  };
};

const shrinkMeeting = (meetingName) => {
  return {
    type: 'SHRINK_MEETING',
    name: meetingName
  };
};

const growMeeting = meetingName => {
  return {
    type: 'GROW_MEETING',
    name: meetingName
  };
};

const lockedOut = (isLockedOut) => {
  return {
    type: 'LOCKED_OUT',
    lockedOut: isLockedOut
  };
};

export {createMeeting, postTopic, changePhase, removeTopic, upVote, downVote, nextTopic, setHost, setLocked, setNewHosts, joinMeeting, addParticipant, removeParticipant, deleteMeeting, shrinkMeeting, growMeeting, lockedOut};
