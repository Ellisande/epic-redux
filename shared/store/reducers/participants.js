const initialValue = [];

const participantReducer = (participants = initialValue, action) => {
  if(action.type === 'JOIN_CHAT'){
    return action.participants || participants;
  }
  if(action.type === 'ADD_PARTICIPANT'){
    return [...participants, action.participant];
  }
  if(action.type === 'REMOVE_PARTICIPANT'){
    return participants.filter(p => p.id !== action.participantId);
  }
  return participants;
};

export default participantReducer;
