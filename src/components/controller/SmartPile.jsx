import React, { PropTypes as T } from 'react';
import Pile from '../display/Pile.jsx';
import { List } from 'immutable';
import Card, { Ranks, Suits } from '../display/Card.jsx';
import DraggableCard from './DraggableCard.jsx';

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
        const renderedCards = cards.map((card, index) => {
            if (index === 0) {
                return <DraggableCard {...card} key={card.suit + card.rank} />;
            } else {
                return <Card {...card} key={card.suit + card.rank} />
            }
        });
        return (
            <Pile>
                {renderedCards}
            </Pile>
        );
    }
}

export default SmartPile;
