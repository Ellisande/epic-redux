import PrimusServer from 'primus';


const port = 6000;
const connectToSummary = () => {
  const Socket = PrimusServer.createSocket({ transformer: 'engine.io'}, {manual: true});
  return new Socket(`http://localhost:${port}/primus?meetings=true`);
};

const connectToMeeting = (meetingName) => {
  const Socket = PrimusServer.createSocket({ transformer: 'engine.io'});
  return new Socket(`http://localhost:${port}/primus?room=${meetingName}`, {manual: true});
};

export {connectToSummary, connectToMeeting, port};
