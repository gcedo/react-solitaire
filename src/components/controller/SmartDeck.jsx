import React, { PropTypes as T } from 'react';
import Card, { Suits, Ranks } from '../display/Card.jsx';
import UpturnedCard from '../display/UpturnedCard.jsx';
import Deck from '../display/Deck.jsx';
import head from 'lodash/array/head';
import { Stack } from 'immutable';

class SmartDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: Stack(props.cards),
            upturnedCards: Stack()
        }
    }

    static propTypes = {
        cards: T.arrayOf(T.shape(
            {
                rank: T.oneOf(Ranks),
                suit: T.oneOf(Object.keys(Suits)),
                upturned: T.bool
            }
        ))
    }

    handleClick = () => {
        const { cards, upturnedCards } = this.state;
        this.setState({
            cards: cards.shift(),
            upturnedCards: upturnedCards.push(cards.first())
        })
    }

    render() {
        const firstCard = this.state.cards.first();
        return (
            <div onClick={this.handleClick}>
                <Deck>
                    <Card />
                </Deck>
                <UpturnedCard>
                    <Card {...firstCard} upturned />
                </UpturnedCard>
            </div>
        );
    }
}

export default SmartDeck;
