import {createStore} from '../shared/store/store';
import {applyMiddleware} from 'redux';
import {loggingMiddleware} from './middleware';
import determineName from './utils';
import {joinMeeting, addParticipant, removeParticipant} from '../shared/actions';


class Room {
  constructor(roomType){
    this.sparks = [];
    this.roomType = roomType;
    const sendActionsMiddlware = () => next => action => {
      const result = next(action);
      this.send(result);
      return result;
    };
    const meetingMiddleware = applyMiddleware(loggingMiddleware, sendActionsMiddlware);
    this.store = createStore(meetingMiddleware);
  }
  getState(){
    return this.store.getState();
  }
  send(action){
    this.sparks.forEach(spark => spark.write(action));
  }
  dispatch(action){
    return this.store.dispatch(action);
  }
  addSpark(spark){
    if(!spark){
      return;
    }
    this.sparks = [...this.sparks, spark];
  }
  removeSpark(spark){
    this.sparks = this.sparks.filter(currentSpark => currentSpark.id !== spark.id);
  }
  getAvailableName(defaultName){
    const usedNames = this.getState().participants.map(p => p.name);
    return determineName(usedNames, defaultName);
  }
  addUser(spark){
    // Create a new chat paricipant
    const participant = {
      name: this.getAvailableName(spark.id),
      id: spark.id,
    };

    // Add the socket connection to our chat room
    this.addSpark(spark);
    // Tell everyone that the person joined
    this.dispatch(addParticipant(participant));
    // Send the initial state to the new connection
    spark.write(joinMeeting(this.getState()));
  }
  removeUser(spark){
    this.dispatch(removeParticipant(spark.id));
    // Remove the connection from our room
    this.removeSpark(spark);
  }
};

export default Room;
