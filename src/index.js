import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';




const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(reducer, applyMiddleware(logger,thunk))
root.render(
  <BrowserRouter>
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  </BrowserRouter>
);
