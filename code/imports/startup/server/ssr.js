import React from 'react';
import { renderToString } from 'react-dom/server';
import { Meteor } from 'meteor/meteor';
import { onPageLoad } from 'meteor/server-render';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Helmet } from 'react-helmet';
import App from '../../ui/layouts/App/App';
import mainReducer from '../../modules/redux/reducers';

onPageLoad((sink) => {
  const isDocument = sink.request.url.pathname.includes('/documents/');
  const documentId = isDocument ? sink.request.url.pathname.replace('/documents/', '') : '';

  const context = {};
  const data = {
    loading: false,
    loggingIn: false,
    authenticated: false,
    name: '',
    roles: [],
    userId: null,
    emailAddress: '',
    emailVerified: false,
    terms: Meteor.call('utility.getPage', 'terms'),
    privacy: Meteor.call('utility.getPage', 'privacy'),
    doc: Meteor.call('documents.findOne', documentId),
  };

  const store = createStore(mainReducer, data, applyMiddleware(thunk));
  const initialData = store.getState();

  sink.renderIntoElementById('react-root', renderToString(
    <Provider store={store}>
      <StaticRouter location={sink.request.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  ));

  // const helmet = Helmet.renderStatic();
  // sink.appendToHead(helmet.meta.toString());
  // sink.appendToHead(helmet.title.toString());

  sink.appendToBody(`
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(initialData).replace(/</g, '\\u003c')}
    </script>
  `);
});
