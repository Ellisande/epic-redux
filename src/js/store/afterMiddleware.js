const afterMiddleWare = cb => next => action => {
  const returnedAction = next(action);
  cb(action);
  return returnedAction;
};

export default afterMiddleWare;
