import {ActionHandler, handleActions} from '../actionHandler';
const initialValue = 'submit';
const deleteMeeting = new ActionHandler('DELETE_MEETING', () => initialValue);
const joinMeeting = new ActionHandler('JOIN_MEETING', (phase, action) => action.phase);
const setPhaseSubmit = new ActionHandler('SET_PHASE_SUBMIT', (phase, action) => action.phase);
const setPhaseMerge = new ActionHandler('SET_PHASE_MERGE', (phase, action) => action.phase);
const setPhaseVote = new ActionHandler('SET_PHASE_VOTE', (phase, action) => action.phase);
const setPhaseDiscuss = new ActionHandler('SET_PHASE_DISCUSS', (phase, action) => action.phase);
const setPhaseComplete = new ActionHandler('SET_PHASE_COMPLETE', (phase, action) => action.phase);

const actions = [joinMeeting, setPhaseSubmit, setPhaseMerge, setPhaseVote, setPhaseDiscuss, setPhaseComplete, deleteMeeting];

const phaseReducer = (phase = initialValue, action) => {
  const newPhase = handleActions(actions, phase, action);
  Object.freeze(newPhase);
  return newPhase;
};

export default phaseReducer;
