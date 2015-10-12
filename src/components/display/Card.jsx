import React, { PropTypes as T } from 'react';
import { Shadows, Suits, Ranks, RanksValues, Colors } from '../../constants';

const Card = ({rank, suit, upturned, style, isOver, canDrop, isMouseOver}) => {
    const borderColor = isOver && (canDrop && 'green' || 'red') || '#B6B6B6';
    let _style = {
        backgroundColor: upturned ? 'white' : 'gray',
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        boxShadow: upturned ? Shadows.Level1 : null,
        boxSizing: 'border-box',
        color: Colors[suit],
        fontFamily: 'Card Characters',
        padding: 4,
        width: 125,
        height: 175,
        cursor: upturned ? 'move' : 'default',
        transition: 'all 250ms',
        ...style
    };

    if (isMouseOver) {
        _style = {..._style,
            boxShadow: Shadows.Level2,
            transform: 'translateY(-5px)',
        };
    }

    return (
        <div style={_style}>
            {upturned && rank}
            {upturned && Suits[suit]}
        </div>
    );
}

Card.propTypes = {
    rank: T.oneOf(Ranks),
    suit: T.oneOf(Object.keys(Suits)),
    upturned: T.bool
};

export default Card;
