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
  return existingMeetings;
};

const participants = () => {
  return [{name: 'Mayor McCheese', host: true}];
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
    const currentTopic = action.topic;
    const modifiedTopic = Object.assign({}, currentTopic, {votes: [...currentTopic.votes, action.user.name]});
    return replace(existingTopics, currentTopic, modifiedTopic);
  }
  if(action.type === 'DOWN_VOTE'){
    const currentTopic = action.topic;
    const existingVotes = currentTopic.votes;
    const removalIndex = existingVotes.indexOf(action.user.name);
    const newVotesList = [...existingVotes.slice(0, removalIndex), ...existingVotes.slice(removalIndex + 1, existingVotes.length)];
    const modifiedTopic = Object.assign({}, currentTopic, {votes: newVotesList});
    return replace(existingTopics, currentTopic, modifiedTopic);
  }
  if(action.type === 'SET_CURRENT_TOPIC'){
    const oldTopic = existingTopics.find(topic => topic.current);
    let newTopics = [...existingTopics];
    if(oldTopic){
      const modifiedOldTopic = Object.assign({}, oldTopic, {current: false});
      newTopics = replace(existingTopics, oldTopic, modifiedOldTopic);
    }
    const newCurrentTopic = existingTopics.find(topic => topic === action.topic);
    const modifiedCurrentTopic = Object.assign({}, newCurrentTopic, {current: true});
    return replace(newTopics, newCurrentTopic, modifiedCurrentTopic);
  }
  return existingTopics;
};

const host = (isHost = false, action) => {
  if(action.type === 'SET_HOST'){
    return action.isHost;
  }
  return isHost;
};

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
  timer: (timer = 350000) => timer,
  phaseVotes: (phaseVotes = []) => phaseVotes,
  topics,
  host
});

let store = createStore(reducers);

export default store;
