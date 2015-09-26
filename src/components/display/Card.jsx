import React, { PropTypes as T } from 'react';

export const Suits = {
    SPADES: '♠',
    HEARTS: '♥',
    DIAMONDS: '♦',
    CLUBS: '♣'
};

export const Ranks =
    ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const Colors = {
    SPADES: '#212121',
    HEARTS: '#FF5722',
    DIAMONDS: '#FF5722',
    CLUBS: '#212121'
};

const Card = ({rank, suit, upturned, style}) => {
    const _style = {
        backgroundColor: upturned ? 'white' : 'gray',
        border: '1px solid #B6B6B6',
        borderRadius: 2,
        boxSizing: 'border-box',
        color: Colors[suit],
        fontFamily: 'Card Characters',
        padding: 10,
        width: 125,
        height: 175,
        ...style
    };

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
