import {ActionHandler, handleActions} from '../actionHandler';

const intialValue = true;


const enableKnocking = new ActionHandler('ALLOW_KNOCKING', () => true);
const disableKnocking = new ActionHandler('DISABLE_KNOCKING', () => false);
const deleteMeeting = new ActionHandler('DELETE_MEETING', () => intialValue);

const actions = [enableKnocking, disableKnocking, deleteMeeting];

const AllowKnockingReducer = (allowKnocking = true, action) => {
  const newAllowKnocking = handleActions(actions, allowKnocking, action);
  Object.freeze(newAllowKnocking);
  return newAllowKnocking;
};

export default AllowKnockingReducer;
