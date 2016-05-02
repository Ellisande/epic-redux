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
    type: 'CHANGE_PHASE',
    phase: nextPhase
  };
};

const removeTopic = topicId => {
  return {
    type: 'REMOVE_TOPIC',
    id: topicId
  };
};

const upVote = (topic, user) => {
  return {
    type: 'UP_VOTE',
    topic,
    user
  };
};

const downVote = (topic, user) => {
  return {
    type: 'DOWN_VOTE',
    topic,
    user
  };
};

const setCurrentTopic = (topic) => {
  return {
    type: 'SET_CURRENT_TOPIC',
    topic
  };
};

const setHost = (isHost) => {
  return {
    type: 'SET_HOST',
    isHost
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

export {createMeeting, postTopic, changePhase, removeTopic, upVote, downVote, setCurrentTopic, setHost, setLocked, setNewHosts};
