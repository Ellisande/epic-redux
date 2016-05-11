import {ActionHandler, handleActions} from '../actionHandler';

const joinMeeting = new ActionHandler('JOIN_MEETING', (roomName, action) => {
  return action.roomName;
});

const actions = [joinMeeting];

const RoomNameReducer = (roomName = '', action) => {
  const newRoomName = handleActions(actions, roomName, action);
  Object.freeze(newRoomName);
  return newRoomName;
};

export default RoomNameReducer;
