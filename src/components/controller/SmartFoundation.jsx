import React, { PropTypes as T } from 'react';
import { Suits, Ranks } from '../display/Card.jsx';
import Foundation from '../display/Foundation.jsx';
import { DropTarget } from 'react-dnd';

const foundationTarget = {
    drop(props) {
        console.log(props);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
};

@DropTarget('DraggableCard', foundationTarget, collect)
export default class SmartFoundation extends React.Component {
    static propTypes = {
        suit: T.oneOf(Object.keys(Suits))
    }

    render() {
        const { connectDropTarget, isOver } = this.props;
        return connectDropTarget(
            <div>
                <Foundation {...this.props} />
            </div>
        );
    }
}
