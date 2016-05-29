import {connectToMeeting, connectToSummary} from '../support/utils';
import {expect} from 'chai';
import {createStore} from '../../../shared/store/store';
module.exports = function(){
  this.Given(/a summarized meeting/, function(done){
    this.supportSocket = connectToMeeting('abcdefg');
    this.supportSocket.on('open', done);
    this.supportSocket.open();
  });

  this.Given(/a summary user/, function(done){
    this.userSocket = connectToSummary();
    this.userStore = createStore();
    this.userSocket.on('data', data => {
      this.userStore.dispatch(data);
    });
    this.userSocket.on('open', done);
  });

  this.When(/I connect to the summary server/, function(done){
    this.userSocket = connectToSummary();
    this.userSocket.on('data', setMeetingsAction => {
      this.actionType = setMeetingsAction.type;
      this.meetings = setMeetingsAction.meetings;
      done();
    });
    this.userSocket.open();
  });

  this.When(/a new meeting named {(.*)} is created/, function(meetingName, done){
    this.supportSocket = connectToMeeting(meetingName);
    this.supportSocket.on('open', () => {
      setTimeout(done, 100);
    });
    this.supportSocket.open();
  });

  this.Then(/I should receive a list of available meetings/, function(){
    expect(this.meetings).to.exist;
  });

  this.Then(/the list of meetings should have {(.*)} meetings?/, function(lengthString){
    const expectedLength = parseInt(lengthString, 10);
    expect(this.meetings).to.have.lengthOf(expectedLength);
  });

  this.Then(/I should be notified of a new meeting called {(.*)}/, function(expectedName){
    const meetings = this.userStore.getState().meetings;
    const actualMeeting = meetings.find(meeting => meeting.name === expectedName);
    this.meeting = actualMeeting;
    expect(actualMeeting.name).to.equal(expectedName);
  });

  this.Then(/the new meeting should have {(.*)} participants?/, function(participantString){
    const expectedParticipants = parseInt(participantString, 10);
    const actualMeeting = this.meeting;
    expect(actualMeeting.participants).to.equal(expectedParticipants);
  });
};
