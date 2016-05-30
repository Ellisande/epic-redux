import {
  connectToMeeting,
  historyFind
} from '../support/utils';
import {
  expect
} from 'chai';
import {
  createStore
} from '../../../shared/store/store';
import {
  postTopic,
  setHost,
  changePhase
} from '../../../shared/actions';
import {
  findUser
} from '../../../shared/store/utils';
import {applyMiddleware} from 'redux';

module.exports = function(){
  this.Given(/a meeting participant/, function(done){
    this.userIncomingActions = [];
    const capture = () => {
      return next => action => {
        let returnValue = next(action);
        this.userIncomingActions.push(returnValue);
        return returnValue;
      };
    };
    this.userSocket = connectToMeeting(this.meetingName);
    this.userStore = createStore(applyMiddleware(capture));
    this.userSocket.on('open', () => setTimeout(done, 100));
    this.userSocket.on('data', data => {
      this.userSocket.id(id => {
        data.userId = id;
        this.userId = id;
        this.userStore.dispatch(data);
      });
    });
    this.userSocket.open();
  });

  this.Given(/a meeting {(.*)}/, function(meetingName, done){
    this.meetingName = meetingName;
    this.supportSocket = connectToMeeting(meetingName);
    this.supportSocket.on('open', () => {
      setTimeout(done, 100);
    });
    this.supportSocket.open();
  });

  this.Given(/a topic title of {(.*)}/, function(title){
    this.topicTitle = title;
  });

  this.Given(/a host/, function(done){
    this.userSocket.on('data', () => setTimeout(done, 100));
    this.userSocket.write(setHost(this.userId, true));
  });

  this.When(/I post a?({(.*)})? topics?/, function(hasCount, countString, done){
    this.userSocket.on('data', () => setTimeout(done, 100));
    const user = findUser(this.userStore.getState());
    const count = parseInt(countString, 10) || 1;
    for(let i = 0; i < count; i++){
      this.userSocket.write(postTopic(this.topicTitle, user.name));
    }
  });

  this.When(/someone else posts a topic/, function(done){
    this.userSocket.on('data', () => setTimeout(done, 100));
    this.supportSocket.write(postTopic('A test title', 'Steve the Warrior'));
    this.topicTitle = 'A test title';
  });

  this.When(/I change the phase to {(.*)}/, function(newPhase, done){
    this.userSocket.on('data', () => done());
    this.userSocket.write(changePhase('merge'));
  });

  this.Then(/the topic should be posted/, function(){
    const topicAction = historyFind(this.userIncomingActions, 'POST_TOPIC');
    expect(topicAction.title).to.equal(this.topicTitle);
  });

  this.Then(/the topic posted should be mine/, function(){
    const topicAction = historyFind(this.userIncomingActions, 'POST_TOPIC');
    const user = findUser(this.userStore.getState());
    expect(topicAction.by).to.equal(user.name);
  });

  this.Then(/the phase should be {(.*)}/, function(expectedPhase){
    const phaseAction = historyFind(this.userIncomingActions, 'SET_PHASE_MERGE');
    expect(phaseAction.phase).to.equal(expectedPhase);
    const actualPhase = this.userStore.getState().phase;
    expect(actualPhase).to.equal(expectedPhase);
  });
};
