import React, { PropTypes as T } from 'react';

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
