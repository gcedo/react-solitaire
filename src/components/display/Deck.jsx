import React from 'react';
import T from 'prop-types';

const Deck = ({ onClick, children }) => {
    return (
        <div onClick={onClick} style={{ cursor: 'pointer' }}>{children}</div>
    );
}

Deck.propTypes = {
    onClick: T.func,
    children: T.element
};

Deck.defaultProps = {
    onClick: () => {}
}

export default Deck;
