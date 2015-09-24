import React, {PropTypes as T} from 'react';

const Suits = {
    SPADES: '♠',
    HEARTS: '♥',
    DIAMONDS: '♦',
    CLUBS: '♣'
}

const Card = ({rank, suit}) => {
    return (
        <div>
            {rank}
            {Suits[suit]}
        </div>
    );
}

Card.propTypes = {
    rank: T.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']),
    suit: T.oneOf(Object.keys(Suits))
}

export default Card;
