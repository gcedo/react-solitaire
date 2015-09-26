import React, { PropTypes as T } from 'react';
import Pile from '../display/Pile.jsx';
import { List } from 'immutable';
import Card, { Ranks, Suits } from '../display/Card.jsx';

class SmartPile extends React.Component {
    constructor(props) {
        super(props);
        const { cards } = props;
        this.state = {
            cards: List([{ ...cards.shift(), upturned: true}].concat(cards))
        };
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

    render() {
        const { cards } = this.state;
        return (
            <Pile>
                {cards.map(card => <Card {...card} key={card.suit + card.rank} />)}
            </Pile>
        );
    }
}

export default SmartPile;
