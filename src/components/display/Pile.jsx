import React, { PropTypes as T } from 'react';

const Pile = ({ children }) => {
    let top = 0;
    const cards = React.Children.map(children, (element, index) => {
        const previousElement = children[index - 1];
        const wasUpturned = previousElement && previousElement.props.upturned;
        top += wasUpturned ? 15 : 5;
        return React.cloneElement(
            element,
            { style: { top, position: 'absolute', } }
        )
    });

    return (
        <div style={{
            backgroundColor: '#388E3C',
            position: 'relative',
            height: 175 + 5 * cards.length,
            width: 125
        }}>
            {cards}
        </div>
    );
}

Pile.propTypes = {
    children: T.oneOfType([T.arrayOf(T.element), T.object])
}

export default Pile;
