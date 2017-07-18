import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import createHistory from 'history/createBrowserHistory';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

import reducer from './store/reducer';

const store = createStore(reducer);
const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='*' component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
