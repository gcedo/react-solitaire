import React, { PropTypes as T } from 'react';
import Pile from '../display/Pile.jsx';
import { List } from 'immutable';
import Card, { Ranks, Suits } from '../display/Card.jsx';
import DraggableCard from './DraggableCard.jsx';

class SmartPile extends React.Component {

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
        const { cards } = this.props;
        const pileIndex = this.props.index;
        const renderedCards = cards.map((card, index, array) => {
            if (card.upturned || index === array.length - 1) {
                return <DraggableCard {...card} key={card.suit + card.rank} where={['PILE', pileIndex]} upturned/>;
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
