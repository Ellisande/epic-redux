
import {browserHistory, Router, Route} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTap from 'react-tap-event-plugin';
import App from './components/app';
import Meeting from './components/meeting';
import store from './store/store';
import {Provider} from 'react-redux';
injectTap();
function render(){
  let content = document.createElement('div');
  content.setAttribute('id', 'content');
  document.body.appendChild(content);
  content = document.getElementById('content');

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App} />
        <Route path='/meeting/:name' component={Meeting}/>
      </Router>
    </Provider>,
      content
  );
}

function main(){
  render();
}

main();
