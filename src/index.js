import ReactDOM from 'react-dom';
import React from 'react';
import Card, { Suits, Ranks } from './components/display/Card.jsx';
import Deck from './components/display/Deck.jsx';
import SmartDeck from './components/controller/SmartDeck.jsx';

let cards = [];
Object.keys(Suits).forEach(suit => {
    Ranks.forEach(rank => {
        cards.push({ rank, suit })
    })
})

ReactDOM.render(
    <Card rank="1" suit="HEARTS" upturned/>, document.getElementById('card')
);

ReactDOM.render(
    <Deck>
        <Card rank="1" suit="HEARTS" upturned/>
    </Deck>,
    document.getElementById('deck')

);


ReactDOM.render(
    <SmartDeck cards={cards} />, document.getElementById('smart-deck')
);
