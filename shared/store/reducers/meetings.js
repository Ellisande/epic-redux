import {ActionHandler, handleActions} from '../actionHandler';
import {replace} from '../utils';

const createMeeting = new ActionHandler('CREATE_MEETING', (meetings, action) => {
  return [...meetings, {name: action.name, participants: 0}];
});

const setMeetings = new ActionHandler('SET_MEETINGS', (meetings, action) => {
  return action.meetings;
});

const growMeeting = new ActionHandler('GROW_MEETING', (meetings, action) => {
  const currentMeeting = meetings.find(meeting => meeting.name === action.name);
  if(!currentMeeting){
    return meetings;
  }
  const updatedMeeting = Object.assign({}, currentMeeting, {participants: currentMeeting.participants + 1});
  return replace(meetings, currentMeeting, updatedMeeting);
});

const shrinkMeeting = new ActionHandler('SHRINK_MEETING', (meetings, action) => {
  const currentMeeting = meetings.find(meeting => meeting.name === action.name);
  if(!currentMeeting){
    return meetings;
  }
  const updatedMeeting = Object.assign({}, currentMeeting, {participants: currentMeeting.participants - 1});
  return replace(meetings, currentMeeting, updatedMeeting);
});

const deleteMeeting = new ActionHandler('DELETE_MEETING', (meetings, action) => {
  return meetings.filter(meeting => meeting.name !== action.name);
});

const actions = [createMeeting, setMeetings, growMeeting, shrinkMeeting, deleteMeeting];

const meetingsReducer = (meetings = [], action) => {
  const newMeetings = handleActions(actions, meetings, action);
  newMeetings.forEach(Object.freeze);
  Object.freeze(newMeetings);
  return newMeetings;
};

export default meetingsReducer;
