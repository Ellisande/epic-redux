const findUser = ({participants, userId}) => {
  return participants.find(p => p.id === userId);
};

export {findUser};
