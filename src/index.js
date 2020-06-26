import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

export const TYPING_DELAY_MS = 1000;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

serviceWorker.unregister();
