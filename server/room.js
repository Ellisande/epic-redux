import {createStore} from '../src/js/store/store';

class Room {
  constructor(){
    this.sparks = [];
    this.store = createStore();
  }
  send(action){
    this.sparks.forEach(spark => spark.write(action));
  }
  dispatch(action){
    this.store.dispatch(action);
  }
  dispatchAndSend(action){
    this.dispatch(action);
    this.send(action);
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
