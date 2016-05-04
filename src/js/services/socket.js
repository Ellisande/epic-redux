import store from '../store/store.js';
const connectedPrimus = Primus.connect();

const dispatch = action => {
  connectedPrimus.write(action);
};

connectedPrimus.on('data', action => {
  if(action.type){
    store.dispatch(action);
  }
});

export {dispatch};
export default connectedPrimus;
