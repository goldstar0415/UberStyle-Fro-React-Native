
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import App from './app/app';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducers from './app/reducers';

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware
    )
  );
  return createStore(reducers, initialState, enhancer);
}

const store = configureStore({});


const Fro = () => {
  return (
     <Provider store={store}>
        <App />
     </Provider>
  );
};

AppRegistry.registerComponent('Fro', () => Fro);
