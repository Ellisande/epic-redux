const findUser = ({participants, userId}) => {
  return participants.find(p => p.id === userId);
};

const replace = (array, oldItem, newItem) => {
  const itemIndex = array.indexOf(oldItem);
  return [...array.slice(0, itemIndex), newItem, ...array.slice(itemIndex + 1, array.length)];
};

export {findUser, replace};
