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

export {createMeeting, postTopic, changePhase, removeTopic, upVote};
