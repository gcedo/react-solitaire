import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/controller/Game.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);
ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('game')
);
