import React, { PropTypes as T } from 'react';
import Card, { Suits, Ranks } from '../display/Card.jsx';
import UpturnedCard from '../display/UpturnedCard.jsx';
import Deck from '../display/Deck.jsx';
import head from 'lodash/array/head';
import { List } from 'immutable';
import DraggableCard from './DraggableCard.jsx';

class SmartDeck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: List(props.cards),
            upturnedCards: List()
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

    handleClickOnDeck = () => {
        const { cards, upturnedCards } = this.state;
        if (cards.isEmpty()) {
            this.setState({
                cards: List(upturnedCards),
                upturnedCards: List()
            })
        } else {
            this.setState({
                cards: cards.shift(),
                upturnedCards: upturnedCards.push(cards.first())
            })
        }
    }

    render() {
        const firstCard = this.state.cards.first();
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: 264
            }}>
                <Deck onClick={this.handleClickOnDeck}>
                    <Card />
                </Deck>
                <UpturnedCard>
                    <DraggableCard {...firstCard} upturned where={['DECK']} />
                </UpturnedCard>
            </div>
        );
    }
}

export default SmartDeck;
