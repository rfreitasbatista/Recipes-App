import React from 'react';
import ReactDOM from 'react-dom';
import { debugContextDevtool } from 'react-context-devtool';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Provider from './contexts/Provider';

const container = document.getElementById('root');

ReactDOM.render(<Provider><App /></Provider>, container);

debugContextDevtool(container);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
