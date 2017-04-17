
import {browserHistory, Router, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Meeting from './components/meeting';
import store from '../../shared/store/store';
import {Provider} from 'react-redux';

function render(){
  let content = document.createElement('div');
  content.setAttribute('id', 'content');
  document.body.appendChild(content);
  content = document.getElementById('content');

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={Meeting}/>
      </Router>
    </Provider>,
    content
  );
}

function main(){
  render();
}

main();
