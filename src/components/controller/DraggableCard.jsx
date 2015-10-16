import React, { PropTypes as T } from 'react';
import Card from '../display/Card.jsx';
import { Ranks, Suits, RanksValues, Colors } from '../../constants';
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
        upturned: props.upturned,
        isLast: props.isLast
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
            return props.isLast && Colors[draggedCard.suit] !== Colors[props.suit] &&
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

    constructor(props) {
        super(props);
        this.state = { isMouseOver: false };
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

    onMouseOver = () => { this.setState({ isMouseOver: true }) }
    onMouseOut = () => { this.setState({ isMouseOver: false }) }

    render () {
        const { connectDragSource, connectDropTarget, isOver, canDrop, isDragging } = this.props;
        const { isMouseOver } = this.state;
        return connectDropTarget(connectDragSource(
            <div
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
            >
                <Card {...this.props}
                    isOver={isOver}
                    canDrop={canDrop}
                    isDragging={isDragging}
                    isMouseOver={isMouseOver} />
            </div>
        ));
    }
}
