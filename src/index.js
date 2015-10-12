import ReactDOM from 'react-dom';
import React from 'react';
import Game from './components/controller/Game.jsx';
import Card from './components/display/Card.jsx';
import { Suits, Ranks } from './constants';
import Deck from './components/display/Deck.jsx';
import SmartDeck from './components/controller/SmartDeck.jsx';
import Pile from './components/display/Pile.jsx';
import SmartPile from './components/controller/SmartPile.jsx';
import Foundation from './components/display/Foundation.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

let cards = [];
Object.keys(Suits).forEach(suit => {
    Ranks.forEach(rank => {
        cards.push({ rank, suit })
    })
})

const store = createStore(reducers);
ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('game')
);

ReactDOM.render(
    <Card rank="A" suit="HEARTS" upturned/>, document.getElementById('card')
);

ReactDOM.render(
    <Deck>
        <Card rank="A" suit="HEARTS" upturned/>
    </Deck>,
    document.getElementById('deck')

);

ReactDOM.render(
    <Pile>
        <Card rank="A" suit="HEARTS"/>
        <Card rank="2" suit="HEARTS"/>
        <Card rank="3" suit="HEARTS"/>
    </Pile>,
    document.getElementById('pile')
);


ReactDOM.render(
    <Foundation />, document.getElementById('foundation')
);
