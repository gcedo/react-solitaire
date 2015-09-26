import React, { PropTypes as T } from 'react';

const Pile = ({ children }) => {
    const cards = React.Children.map(children.reverse(), (element, index) => {
        return React.cloneElement(
            element,
            { style: { position: 'absolute', top: 5 * index } }
        )
    });

    return (
        <div style={{ position: 'relative', height: 175 + 5 * cards.length, width: 125 }}>
            {cards}
        </div>
    );
}

Pile.propTypes = {
    children: T.oneOfType([T.arrayOf(T.element), T.object])
}

export default Pile;
