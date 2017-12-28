import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App/App';
import mainReducer from '../../modules/redux/reducers';
import '../both/api';

import '../../ui/stylesheets/app.scss';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(mainReducer, preloadedState, applyMiddleware(thunk));

Meteor.startup(() => hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-root')
));
