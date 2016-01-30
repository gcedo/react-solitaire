import React, { PropTypes as T } from 'react';
import { Suits, Ranks } from '../../constants';

const SuitAndRank = ({ suit, rank, position }) => {
    return (
        <div style={{
            ...position,
            display: 'inline-block',
            position: 'absolute',
            textAlign: 'center',
            transform: ('bottom' in position) ? 'rotate(180deg)' : null
        }}>
            <div>{rank}</div>
            <div style={{ position: 'relative', top: -5 }}>{Suits[suit]}</div>
        </div>
    );
}

SuitAndRank.propTypes = {
    rank: T.oneOf(Ranks),
    suit: T.oneOf(Object.keys(Suits))
}

export default SuitAndRank;
