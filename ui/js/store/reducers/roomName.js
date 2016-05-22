import {ActionHandler, handleActions} from '../actionHandler';
const initialValue = 'meeting-summary';
const deleteMeeting = new ActionHandler('DELETE_MEETING', () => initialValue);
const joinMeeting = new ActionHandler('JOIN_MEETING', (roomName, action) => {
  return action.roomName;
});

const setRoomName = new ActionHandler('SET_ROOM_NAME', (roomName, action) => action.roomName);

const actions = [joinMeeting, deleteMeeting, setRoomName];

const RoomNameReducer = (roomName = initialValue, action) => {
  const newRoomName = handleActions(actions, roomName, action);
  Object.freeze(newRoomName);
  return newRoomName;
};

export default RoomNameReducer;
