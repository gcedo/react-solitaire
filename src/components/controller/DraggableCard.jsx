import React, { PropTypes as T } from 'react';
import Card, { Ranks, Suits } from '../display/Card.jsx';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource('DraggableCard', cardSource, collect)
export default class DraggableCard extends React.Component {
    static propTypes = {
        rank: T.oneOf(Ranks),
        suit: T.oneOf(Object.keys(Suits)),
        upturned: T.bool
    }

    render () {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div>
                <Card {...this.props} />
            </div>
        );
    }
}
