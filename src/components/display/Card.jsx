import React, {PropTypes as T} from 'react';

export const Suits = {
    SPADES: '♠',
    HEARTS: '♥',
    DIAMONDS: '♦',
    CLUBS: '♣'
};

export const Ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];


const Card = ({rank, suit, upturned}) => {
    return (
        <div style={{
            backgroundColor: upturned ? 'yellow' : 'gray',
            width: 125,
            height: 175
        }}>
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
