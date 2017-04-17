const initialValue = '';

const userReducer = (userId = initialValue, action) => {
  if(action.type === 'JOIN_CHAT'){
    return action.userId || userId;
  }
  return userId;
};

export default userReducer;
