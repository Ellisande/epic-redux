import {ActionHandler, handleActions} from '../actionHandler';
import {replace} from '../utils';

const joinMeeting = new ActionHandler('JOIN_MEETING', (participants, action) => {
  return action.participants;
});

const setHost = new ActionHandler('SET_HOST', (participants, action) => {
  const participantToUpdate = participants.find(participant => participant.id === action.id);
  const modifiedParticipant = Object.assign({}, participantToUpdate, {
    host: action.isHost
  });
  return replace(participants, participantToUpdate, modifiedParticipant);
});

const addParticipant = new ActionHandler('ADD_PARTICIPANT', (participants, action) => {
  return [...participants, action.participant];
});

const removeParticipant = new ActionHandler('REMOVE_PARTICIPANT', (participants, action) => {
  return participants.filter(p => p.id !== action.participantId);
});

const actions = [joinMeeting, setHost, addParticipant, removeParticipant];

const participantReducer = (participants = [], action) => {
  const newParticipants = handleActions(actions, participants, action);
  newParticipants.forEach(Object.freeze);
  Object.freeze(newParticipants);
  return newParticipants;
};

export default participantReducer;
