import React, { PropTypes as T } from 'react';
import Card, { Ranks, Suits } from '../display/Card.jsx';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return {
        suit: props.suit,
        rank: props.rank
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
    drop(props, monitor) {
        console.log('props', props);
        console.log('getItem', monitor.getItem())
    }
};

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
};


@DragSource('DraggableCard', cardSource, collectDrag)
@DropTarget('DraggableCard', cardTarget, collectDrop)
export default class DraggableCard extends React.Component {
    static propTypes = {
        rank: T.oneOf(Ranks),
        suit: T.oneOf(Object.keys(Suits)),
        upturned: T.bool
    }

    render () {
        const { connectDragSource, connectDropTarget } = this.props;
        return connectDropTarget(connectDragSource(
            <div>
                <Card {...this.props} />
            </div>
        ));
    }
}
