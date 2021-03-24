import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApolloProvider from './ApolloProvider';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider />
  </Provider>,
  document.getElementById('root')
);
