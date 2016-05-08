import {ActionHandler, handleActions} from '../actionHandler';
import {replace} from '../utils';

const joinMeeting = new ActionHandler('JOIN_MEETING', (topics, action) => action.topics);

const postTopic = new ActionHandler('POST_TOPIC', (topics, action) => {
  const {title, by} = action;
  const votes = [];
  return [...topics, {title, by, votes}];
});

const removeTpoic = new ActionHandler('REMOVE_TOPIC', (topics, action) => topics.filter(topic => topic.title !== action.id));

const upVote = new ActionHandler('UP_VOTE', (topics, action) => {
  const currentTopic = topics.find(topic => topic.title === action.topic.title);
  const modifiedTopic = Object.assign({}, currentTopic, {votes: [...currentTopic.votes, action.userId]});
  return replace(topics, currentTopic, modifiedTopic);
});

const downVote = new ActionHandler('DOWN_VOTE', (topics, action) => {
  const currentTopic = topics.find(topic => topic.title === action.topic.title);
  const existingVotes = currentTopic.votes;
  const removalIndex = existingVotes.indexOf(action.userId);
  const newVotesList = [...existingVotes.slice(0, removalIndex), ...existingVotes.slice(removalIndex + 1, existingVotes.length)];
  const modifiedTopic = Object.assign({}, currentTopic, {votes: newVotesList});
  return replace(topics, currentTopic, modifiedTopic);
});

const discussPhase = new ActionHandler('SET_PHASE_DISCUSS', topics => {
  const oldTopic = topics.find(topic => topic.current);
  let newTopics = [...topics];
  newTopics.sort( (l, r) => r.votes.length - l.votes.length);
  if(oldTopic){
    const modifiedOldTopic = Object.assign({}, oldTopic, {current: false});
    newTopics = replace(topics, oldTopic, modifiedOldTopic);
  }
  const newCurrentTopic = newTopics[0];
  const modifiedCurrentTopic = Object.assign({}, newCurrentTopic, {current: true});
  return replace(newTopics, newCurrentTopic, modifiedCurrentTopic);
});

const nextTopic = new ActionHandler('NEXT_TOPIC', topics => {
  const oldTopic = topics.find(topic => topic.current);
  let newTopics = [...topics];
  if(oldTopic){
    const modifiedOldTopic = Object.assign({}, oldTopic, {current: false});
    newTopics = replace(topics, oldTopic, modifiedOldTopic);
  }
  const indexOfOld = topics.indexOf(oldTopic);
  const newCurrentTopic = topics[indexOfOld + 1] || oldTopic;
  const modifiedCurrentTopic = Object.assign({}, newCurrentTopic, {current: true});
  return replace(newTopics, newCurrentTopic, modifiedCurrentTopic);
});

const actions = [joinMeeting, postTopic, removeTpoic, upVote, downVote, discussPhase, nextTopic];

const topicReducer = (topics = [], action) => {
  const newTopics = handleActions(actions, topics, action);
  Object.freeze(newTopics);
  return newTopics;
};

export default topicReducer;
