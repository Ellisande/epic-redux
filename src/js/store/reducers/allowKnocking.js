import {ActionHandler, handleActions} from '../actionHandler';

const enableKnocking = new ActionHandler('ALLOW_KNOCKING', () => true);
const disableKnocking = new ActionHandler('DISABLE_KNOCKING', () => false);

const actions = [enableKnocking, disableKnocking];

const AllowKnockingReducer = (allowKnocking = true, action) => {
  const newAllowKnocking = handleActions(actions, allowKnocking, action);
  console.log(newAllowKnocking);
  Object.freeze(newAllowKnocking);
  return newAllowKnocking;
};

export default AllowKnockingReducer;
