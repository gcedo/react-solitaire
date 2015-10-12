import React, { PropTypes as T } from 'react';
import Pile from '../display/Pile.jsx';
import { List } from 'immutable';
import Card from '../display/Card.jsx';
import { Suits, Ranks } from '../../constants';
import DraggableCard from './DraggableCard.jsx';
import { DropTarget } from 'react-dnd';

const pileTarget = {
    drop(props, monitor, component) {
        component.moveCards(monitor.getItem());
    },

    canDrop(props, monitor, component) {
        const { rank } = monitor.getItem();
        return rank === 'K';
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
};


@DropTarget('DraggableCard', pileTarget, collect)
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

    moveCards = (card) => {
        this.props.moveCards(
            [card],
            { from: card.where, to: ['PILE', this.props.index] }
        );
    }

    render() {
        const { cards } = this.props;
        const pileIndex = this.props.index;
        const { connectDropTarget } = this.props;
        const renderedCards = cards.map(card => {
            if (card.upturned) {
                return (
                    <DraggableCard {...card}
                        upturned
                        key={card.suit + card.rank}
                        where={['PILE', pileIndex]}
                    />
                );
            } else {
                return <Card {...card} key={card.suit + card.rank} />
            }
        });
        return connectDropTarget(
            <div>
                <Pile>
                    {renderedCards}
                </Pile>
            </div>
        );
    }
}

export default SmartPile;
