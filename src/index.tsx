import './index.scss';
import '@elastic/eui/dist/eui_theme_light.css';

import Amplify from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import awsmobile from './aws-exports';
import * as serviceWorker from './serviceWorker';

Amplify.configure(awsmobile);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app-root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
