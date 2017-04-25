import {applyMiddleware} from 'redux';
import {createStore} from '../shared/store/store';
import determineName from './utils';
import {joinChat, addParticipant, removeParticipant} from '../shared/actions';


class Room {
  constructor(){
    // Hold our websocket connections
    this.sparks = [];
    const sendActionsMiddlware = () => next => action => {
      console.log('Looks like we made it');
      const result = next(action);
      this.send(action);
      return result;
    };
    this.store = createStore(applyMiddleware(sendActionsMiddlware));
  }
  getState(){
    // Get the current state of the server store
  }
  // Send an action to all chat participants
  send(action){
    this.sparks.forEach(spark => spark.write(action));
  }
  dispatch(action){
    // Dispatch an action to the server store
    this.store.dispatch(action);
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
  getAvailableName(){
    return Math.random() * 1000000;
  }
  // Pubic, add a new user to this chat
  addUser(spark){
    // Add the socket connection to our chat room
    this.addSpark(spark);

    // When we get data from the socket
    // Dispatch it to the store
    // This is the heart of everything thats going on here
    spark.on('data', action => {
      action.userId = spark.id;
      this.dispatch(action);
    });
    // Tell everyone that the person joined
    // Send the initial state to the new connection
  }
  // Public, remove a user from this chat
  removeUser(spark){
    // Remove the connection from our room
    this.removeSpark(spark);
  }
};

export default Room;
