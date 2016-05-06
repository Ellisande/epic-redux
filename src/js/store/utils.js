const findUser = ({participants, userId}) => {
  return participants.find(p => p.id === userId);
};

const isUserHost = ({participants, userId}) => {
  const user = findUser({participants, userId});
  return user ? user.host : false;
};

export {findUser, isUserHost};
