import React, { PropTypes as T } from 'react';
import { Suits, Ranks } from '../display/Card.jsx';
import Foundation from '../display/Foundation.jsx';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import ActionCreators, { Directions } from '../../actions';
import DraggableCard from './DraggableCard.jsx';
import first from 'lodash/array/first';
import { RanksValues } from '../display/Card.jsx';

const foundationTarget = {
    drop(props, monitor, component) {
        component.moveCard(monitor.getItem());
    },

    canDrop(props, monitor, component) {
        const { suit, rank } = monitor.getItem();
        const firstCard = first(props.cards);
        return suit === props.suit && firstCard === undefined && rank === 'A';
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};

@connect((state) => state)
@DropTarget('DraggableCard', foundationTarget, collect)
export default class SmartFoundation extends React.Component {
    static propTypes = {
        cards: T.array,
        suit: T.oneOf(Object.keys(Suits))
    }

    moveCard = (card) => {
        const { suit, dispatch } = this.props;
        dispatch(
            ActionCreators.moveCard(
                [card],
                { from: card.where, to: ['FOUNDATION', suit] }
            )
        );
    }

    render() {
        const { connectDropTarget, isOver, suit, cards, canDrop } = this.props;
        const card = cards.length ?
            <DraggableCard {...cards[cards.length - 1]}
                upturned where={['FOUNDATION', suit]}
            /> :
            null;
        return connectDropTarget(
            <div>
                <Foundation {...this.props} isOver={isOver} canDrop={canDrop}>
                    {card}
                </Foundation>
            </div>
        );
    }
}
