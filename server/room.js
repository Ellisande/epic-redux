import {createStore} from '../shared/store/store';
import {applyMiddleware} from 'redux';
import {loggingMiddleware} from './middleware';
import determineName from './utils';
import {joinChat, addParticipant, removeParticipant} from '../shared/actions';


class Room {
  constructor(){
    // Hold our websocket connections
    this.sparks = [];
    // Middleware for dispatching actions
    // After they go through the server store
    const sendActionsMiddlware = () => next => action => {
      const result = next(action);
      this.send(result);
      return result;
    };
    const meetingMiddleware = applyMiddleware(loggingMiddleware, sendActionsMiddlware);
    // Create the server side store
    this.store = createStore(meetingMiddleware);
  }
  // Get the current state of the server store
  getState(){
    return this.store.getState();
  }
  // Send an action to all char participants
  send(action){
    this.sparks.forEach(spark => spark.write(action));
  }
  // Dispatch an action to the server store
  dispatch(action){
    return this.store.dispatch(action);
  }
  // Not public, add a spark to the list
  addSpark(spark){
    if(!spark){
      return;
    }
    this.sparks = [...this.sparks, spark];
  }
  // Not public, remove a spark from the list
  removeSpark(spark){
    this.sparks = this.sparks.filter(currentSpark => currentSpark.id !== spark.id);
  }
  // Grab a random name for the char user (just fun, totally optional)
  getAvailableName(defaultName){
    const usedNames = this.getState().participants.map(p => p.name);
    return determineName(usedNames, defaultName);
  }
  // Pubic, add a new user to this chat
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
    spark.write(joinChat(this.getState()));
  }
  // Public, remove a user from this chat
  removeUser(spark){
    this.dispatch(removeParticipant(spark.id));
    // Remove the connection from our room
    this.removeSpark(spark);
  }
};

export default Room;
