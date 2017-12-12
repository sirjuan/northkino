import React, { Component } from 'react';
import './assets/styles/App.css';
import store from './redux/store'
import { init } from './redux/actionCreators'
import Routes from './Routes'
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
          <Routes />
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
