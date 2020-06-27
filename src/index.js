import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import './common.scss';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

serviceWorker.unregister();
