import {ActionHandler, handleActions} from '../actionHandler';

const initialValue = [];
const deleteMeeting = new ActionHandler('DELETE_MEETING', () => initialValue);

const addKnocker = new ActionHandler('ADD_KNOCKER', (knockers, action) => {
  return [...knockers, {id: action.id, message: action.message}];
});

const rejectKnocker = new ActionHandler('REJECT_KNOCKER', (knockers, action) => {
  return knockers.filter(knocker => knocker.id !== action.id);
});

const approveKnocker = new ActionHandler('APPROVE_KNOCKER', (knockers, action) => {
  return knockers.filter(knocker => knocker.id !== action.id);
});

const actions = [addKnocker, rejectKnocker, approveKnocker, deleteMeeting];

const KnockerReducer = (knockers = [], action) => {
  const newKnockers = handleActions(actions, knockers, action);
  newKnockers.forEach(knocker => Object.freeze(knocker));
  Object.freeze(newKnockers);
  return newKnockers;
};

export default KnockerReducer;
