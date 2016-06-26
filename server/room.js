import {createStore} from '../shared/store/store';
import {applyMiddleware} from 'redux';
import {rejectMiddleware, loggingMiddleware, cleanupMiddleware} from './middleware';

class Room {
  constructor(roomType, ...additionalMiddleware){
    this.sparks = [];
    this.roomType = roomType;
    const sendActionsMiddlware = () => next => action => {
      const result = next(action);
      this.send(result);
      return result;
    };
    const summaryMiddleware = applyMiddleware(loggingMiddleware, sendActionsMiddlware);
    const meetingMiddleware = applyMiddleware(...rejectMiddleware, ...additionalMiddleware, loggingMiddleware, sendActionsMiddlware, ...cleanupMiddleware);
    const middleware = roomType === 'summary' ? summaryMiddleware : meetingMiddleware;
    this.store = createStore(middleware);
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
};

export default Room;
