class ActionHandler {
  constructor(type, reducer){
    this.type = type;
    this.reducer = reducer;
  }
};

const handleActions = (actionHandlers, state, action) => {
  let newState = state;
  actionHandlers.filter(ah => ah.type === action.type).forEach(ah => {
    newState = ah.reducer(newState, action);
  });
  return newState;
};

export {ActionHandler, handleActions};
