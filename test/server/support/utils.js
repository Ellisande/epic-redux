import PrimusServer from 'primus';
import _ from 'lodash';
import expect from 'chai';


const port = 6000;
const connectToSummary = () => {
  const Socket = PrimusServer.createSocket({ transformer: 'engine.io'}, {manual: true});
  return new Socket(`http://localhost:${port}/primus?meetings=true`);
};

const connectToMeeting = (meetingName) => {
  const Socket = PrimusServer.createSocket({ transformer: 'engine.io'});
  return new Socket(`http://localhost:${port}/primus?room=${meetingName}`, {manual: true});
};

const historyFind = (actionHistory, type) => actionHistory.find(action => action.type === type);

const historyFindInOrder = (actionHistory, ...actions) => {
  const startIndex = actionHistory.indexOf(actions[0]);
  const endIndex = actionHistory.indexOf(_.last(history));
  const subArray = actionHistory.splice(startIndex, endIndex);
  subArray.forEach( (actualAction, index) => expect(actualAction).to.equal(actions[index]));
  return _.last(subArray);
};

export {connectToSummary, connectToMeeting, port, historyFind, historyFindInOrder};
