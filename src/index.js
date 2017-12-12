import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

console.log(process.env)
console.log(process.env.NODE_ENV)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
