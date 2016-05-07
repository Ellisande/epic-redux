import {ActionHandler, handleActions} from '../actionHandler';

const createMeeting = new ActionHandler('CREATE_MEETING', (meetings, action) => {
  return [...meetings, {name: action.name, participants: 0}];
});

const setMeetings = new ActionHandler('SET_MEETINGS', (meetings, action) => {
  return action.meetings;
});

const actions = [createMeeting, setMeetings];

const meetingsReducer = (meetings = [], action) => {
  const newMeetings = handleActions(actions, meetings, action);
  newMeetings.forEach(Object.freeze);
  Object.freeze(newMeetings);
  return newMeetings;
};

export default meetingsReducer;
