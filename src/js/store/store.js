import {
  createStore,
  combineReducers
} from 'redux';

const replace = (array, oldItem, newItem) => {
  const itemIndex = array.indexOf(oldItem);
  return [...array.slice(0, itemIndex), newItem, ...array.slice(itemIndex + 1, array.length)];
};

const meetings = (existingMeetings = [{
  name: 'abcde',
  participants: 0
}], action) => {
  if(action.type === 'CREATE_MEETING'){
    return [...existingMeetings, {name: action.name, participants: 0}];
  };
  if(action.type === 'SET_MEETINGS'){
    return action.meetings;
  }
  return existingMeetings;
};

const participants = (existingParticipants = [], action) => {
  if(action.type === 'JOIN_MEETING'){
    return action.participants;
  }
  if(action.type === 'SET_HOST'){
    const participantToUpdate = existingParticipants.find(participant => participant.id = action.id);
    const modifiedParticipant = Object.assign({}, participantToUpdate, {
      host: action.isHost
    });
    return replace(existingParticipants, participantToUpdate, modifiedParticipant);
  }
  if(action.type === 'ADD_PARTICIPANT'){
    return [...existingParticipants, action.participant];
  }
  if(action.type === 'REMOVE_PARTICIPANT'){
    return existingParticipants.filter(p => p.id !== action.participantId);
  }
  return existingParticipants;
};

const topics = (existingTopics = [], action) => {
  if(action.type === 'JOIN_MEETING'){
    return action.topics;
  }
  if(action.type === 'POST_TOPIC'){
    const {title, by} = action;
    const votes = [];
    return [...existingTopics, {title, by, votes}];
  }
  if(action.type === 'REMOVE_TOPIC'){
    return existingTopics.filter(topic => topic.title !== action.id);
  }
  if(action.type === 'UP_VOTE'){
    const currentTopic = existingTopics.find(topic => topic.title === action.topic.title);
    const modifiedTopic = Object.assign({}, currentTopic, {votes: [...currentTopic.votes, action.userId]});
    return replace(existingTopics, currentTopic, modifiedTopic);
  }
  if(action.type === 'DOWN_VOTE'){
    const currentTopic = existingTopics.find(topic => topic.title === action.topic.title);
    const existingVotes = currentTopic.votes;
    const removalIndex = existingVotes.indexOf(action.userId);
    const newVotesList = [...existingVotes.slice(0, removalIndex), ...existingVotes.slice(removalIndex + 1, existingVotes.length)];
    const modifiedTopic = Object.assign({}, currentTopic, {votes: newVotesList});
    return replace(existingTopics, currentTopic, modifiedTopic);
  }
  if(action.type === 'SET_PHASE_DISCUSS'){
    const oldTopic = existingTopics.find(topic => topic.current);
    let newTopics = [...existingTopics];
    newTopics.sort( (l, r) => r.votes.length - l.votes.length);
    if(oldTopic){
      const modifiedOldTopic = Object.assign({}, oldTopic, {current: false});
      newTopics = replace(existingTopics, oldTopic, modifiedOldTopic);
    }
    const newCurrentTopic = newTopics[0];
    const modifiedCurrentTopic = Object.assign({}, newCurrentTopic, {current: true});
    return replace(newTopics, newCurrentTopic, modifiedCurrentTopic);
  }
  if(action.type === 'NEXT_TOPIC'){
    const oldTopic = existingTopics.find(topic => topic.current);
    let newTopics = [...existingTopics];
    if(oldTopic){
      const modifiedOldTopic = Object.assign({}, oldTopic, {current: false});
      newTopics = replace(existingTopics, oldTopic, modifiedOldTopic);
    }
    const indexOfOld = existingTopics.indexOf(oldTopic);
    const newCurrentTopic = existingTopics[indexOfOld + 1] || oldTopic;
    const modifiedCurrentTopic = Object.assign({}, newCurrentTopic, {current: true});
    return replace(newTopics, newCurrentTopic, modifiedCurrentTopic);
  }
  return existingTopics;
};

const phase = (currentPhase = 'submit', action) => {
  if(action.type === 'JOIN_MEETING'){
    return action.phase;
  }
  if(action.type.match(/SET_PHASE/)){
    return action.phase;
  }
  return currentPhase;
};

const locked = (isLocked = false, action) => {
  if(action.type === 'JOIN_MEETING'){
    return action.locked;
  }
  if(action.type === 'SET_LOCKED'){
    return action.locked;
  }
  return isLocked;
};

const newHosts = (allowNewHosts = true, action) => {
  if(action.type === 'JOIN_MEETING'){
    return action.newHosts;
  }
  if(action.type === 'SET_NEW_HOSTS'){
    return action.newHosts;
  }
  return allowNewHosts;
};

const userReducer = (userId = '', action) => {
  if(action.type === 'JOIN_MEETING'){
    return action.userId || userId;
  }
  return userId;
};

let reducers = combineReducers({
  meetings,
  participants,
  userId: userReducer,
  phase,
  roomName: (roomName = 'default') => roomName,
  timer: (timer = 350000) => timer,
  phaseVotes: (phaseVotes = []) => phaseVotes,
  topics,
  locked,
  newHosts
});

let store = createStore(reducers);

const createNewStore = createStore.bind(this, reducers);
export {createNewStore as createStore};
export default store;
