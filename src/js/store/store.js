import {
  createStore,
  combineReducers
} from 'redux';

const meetings = (existingMeetings = [], action) => {
  if(action.type === 'CREATE_MEETING'){
    return [...existingMeetings, {name: action.name, participants: 0}];
  };
  return existingMeetings;
};

const participants = () => {
  return [{name: 'Mayor McCheese'}];
};

const topics = (existingTopics = [], action) => {
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
    const theRest = existingTopics.filter(topic => topic !== currentTopic);
    const modifiedTopic = Object.assign({}, currentTopic, {votes: [...currentTopic.votes, action.user.name]});
    return [...theRest, modifiedTopic];
  }
  return existingTopics;
};

const host = () => true;

const phase = (currentPhase = 'submit', action) => {
  if(action.type === 'CHANGE_PHASE'){
    return action.phase;
  }
  return currentPhase;
};

let reducers = combineReducers({
  meetings,
  participants,
  user: (user = {name: 'Justin'}) => user,
  phase,
  roomName: (roomName = 'default') => roomName,
  timer: (timer = 0) => timer,
  phaseVotes: (phaseVotes = []) => phaseVotes,
  topics,
  host
});

let store = createStore(reducers);

export default store;
