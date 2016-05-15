import {ActionHandler, handleActions} from '../actionHandler';

const intialValue = true;

const joinMeeting = new ActionHandler('JOIN_MEETING', (allowKnocking, action) => action.allowKnocking);
const enableKnocking = new ActionHandler('ALLOW_KNOCKING', () => true);
const disableKnocking = new ActionHandler('DISABLE_KNOCKING', () => false);
const deleteMeeting = new ActionHandler('DELETE_MEETING', () => intialValue);

const actions = [enableKnocking, disableKnocking, deleteMeeting, joinMeeting];

const AllowKnockingReducer = (allowKnocking = true, action) => {
  const newAllowKnocking = handleActions(actions, allowKnocking, action);
  Object.freeze(newAllowKnocking);
  return newAllowKnocking;
};

export default AllowKnockingReducer;
