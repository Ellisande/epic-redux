const findUser = ({participants, userId}) => {
  return participants.find(p => p.id === userId);
};

const isUserHost = ({participants, userId}) => {
  const user = findUser({participants, userId});
  return user ? user.host : false;
};

const replace = (array, oldItem, newItem) => {
  const itemIndex = array.indexOf(oldItem);
  return [...array.slice(0, itemIndex), newItem, ...array.slice(itemIndex + 1, array.length)];
};

export {findUser, isUserHost, replace};
