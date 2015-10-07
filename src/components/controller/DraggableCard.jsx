import React, { PropTypes as T } from 'react';
import Card, { Ranks, Suits, RanksValues, Colors } from '../display/Card.jsx';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import ActionCreators, { Directions } from '../../actions';
import { connect } from 'react-redux';
import first from 'lodash/array/first';

const cardSource = {
  beginDrag(props) {
    return {
        suit: props.suit,
        rank: props.rank,
        where: props.where,
        upturned: props.upturned
    };
  }
};

function collectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const cardTarget = {
    drop(props, monitor, component) {
        component.moveCard(monitor.getItem());
    },

    canDrop(props, monitor, component) {
        const draggedCard = monitor.getItem();
        const origin = draggedCard.where;
        const destination = props.where;

        if (first(destination) === 'FOUNDATION') {
            return draggedCard.suit === props.suit &&
               RanksValues[draggedCard.rank] === RanksValues[props.rank] + 1;
        } else if (first(destination) === 'PILE') {
            return Colors[draggedCard.suit] !== Colors[props.suit] &&
                RanksValues[draggedCard.rank] === RanksValues[props.rank] - 1;
        }

        return false;
    }
};

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};

@connect((state) => state)
@DragSource('DraggableCard', cardSource, collectDrag)
@DropTarget('DraggableCard', cardTarget, collectDrop)
export default class DraggableCard extends React.Component {
    static propTypes = {
        rank: T.oneOf(Ranks),
        suit: T.oneOf(Object.keys(Suits)),
        upturned: T.bool
    }

    moveCard = (card) => {
        const { dispatch } = this.props;
        dispatch(
            ActionCreators.moveCard(
                [card],
                { from: card.where, to: this.props.where }
            )
        );

    }

    render () {
        const { connectDragSource, connectDropTarget, isOver, canDrop } = this.props;
        return connectDropTarget(connectDragSource(
            <div>
                <Card {...this.props} isOver={isOver} canDrop={canDrop} />
            </div>
        ));
    }
}
