import React, { PropTypes as T } from 'react';
import Overlay from './Overlay.jsx';
import SuitAndRank from './SuitAndRank.jsx';
import { Shadows, Suits, Ranks, RanksValues, Colors, Dimensions } from '../../constants';

const Card =
({rank, suit, upturned, style, isOver, canDrop, isMouseOver, isDragging}) => {
    const borderColor = isOver && (canDrop && 'green' || 'red') || '#B6B6B6';
    const backgroundColor = isOver && (canDrop && 'green' || 'red') || 'white';
    let _style = {
        backgroundColor: upturned ? Colors.Card.upturned : Colors.Card.downturned,
        border: `1px solid ${borderColor}`,
        borderRadius: Dimensions.Card.borderRadius,
        boxShadow: upturned ? Shadows.Level1 : null,
        boxSizing: 'border-box',
        color: Colors[suit],
        fontFamily: 'Helvetica',
        padding: 4,
        position: 'relative',
        width: Dimensions.Card.width,
        height: Dimensions.Card.height,
        cursor: upturned ? '-webkit-grab' : 'default',
        transition: 'all 250ms',
        ...style
    };

    if (isMouseOver) {
        _style = {..._style,
            boxShadow: Shadows.Level2,
            transform: 'translateY(-5px)',
        };
    }

    if (isDragging) { _style = { ..._style, opacity: .6 } }

    if (!upturned) { return <div style={_style} />; }

    return (
        <div style={_style}>
            { isOver && <Overlay backgroundColor={backgroundColor} /> }
            <SuitAndRank suit={suit} rank={rank} position={{top: 4, left: 5}} />
            <SuitAndRank suit={suit} rank={rank} position={{bottom: 4, right: 5}} />
        </div>
    );

}

Card.propTypes = {
    rank: T.oneOf(Ranks),
    suit: T.oneOf(Object.keys(Suits)),
    upturned: T.bool
};

export default Card;
