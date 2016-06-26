import {createStore} from '../shared/store/store';
import {applyMiddleware} from 'redux';
import {rejectMiddleware, logIt} from '../shared/store/middleware';

class Room {
  constructor(roomName, ...middleware){
    this.sparks = [];
    this.store = createStore({roomName: roomName}, applyMiddleware(...rejectMiddleware, ...middleware, logIt));
    this.roomName = roomName;
  }
  send(action){
    this.sparks.forEach(spark => spark.write(action));
  }
  dispatch(action){
    return this.store.dispatch(action);
  }
  dispatchAndSend(action){
    const dispatchedAction = this.dispatch(action);
    this.send(dispatchedAction);
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
};

export default Room;
