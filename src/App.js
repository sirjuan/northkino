import React, { Component } from 'react';

import './styles/App.css';
import store from './redux/store'
import { init } from './redux/actions'

import Router from './Router'

import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  componentWillMount() {
    store.dispatch(init());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
