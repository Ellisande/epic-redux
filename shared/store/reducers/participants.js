import {ActionHandler, handleActions} from '../actionHandler';

const initialValue = [];

const joinMeeting = new ActionHandler('JOIN_MEETING', (participants, action) => {
  return action.participants;
});

const addParticipant = new ActionHandler('ADD_PARTICIPANT', (participants, action) => {
  return [...participants, action.participant];
});

const removeParticipant = new ActionHandler('REMOVE_PARTICIPANT', (participants, action) => {
  return participants.filter(p => p.id !== action.participantId);
});

const actions = [joinMeeting, addParticipant, removeParticipant];

const participantReducer = (participants = initialValue, action) => {
  const newParticipants = handleActions(actions, participants, action);
  newParticipants.forEach(Object.freeze);
  Object.freeze(newParticipants);
  return newParticipants;
};

export default participantReducer;
