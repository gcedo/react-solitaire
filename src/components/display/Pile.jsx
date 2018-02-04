import React from 'react';
import T from 'prop-types';
import RankSymbol from './RankSymbol.jsx';
import { Colors, Dimensions, CardsLayouts } from '../../constants';

const Pile = ({ children, isOver, canDrop, color }) => {
    let top = -5;

    const cards = React.Children.map(children, (element, index) => {
        const previousElement = children[index - 1];
        const wasUpturned = previousElement && previousElement.props.upturned;
        top += wasUpturned ? 15 : 5;
        return React.cloneElement(
            element,
            { style: {
                top,
                position: 'absolute'
            } }
        )
    });

    return (
        <div style={{
            backgroundColor:
                isOver && canDrop && Colors.Card.upturned
                || Colors.Foundation.backgroundColor,
            position: 'relative',
            color: isOver && canDrop && color || Colors.Game.backgroundColor,
            height: Dimensions.Card.height + 5 * (cards.length-1),
            width: Dimensions.Card.width,
            transition: 'all 250ms'
        }}>
            {cards}
            {!children.length && <RankSymbol symbol={CardsLayouts.K} />}
        </div>
    );
}

Pile.propTypes = {
    children: T.oneOfType([T.arrayOf(T.element), T.object])
}

export default Pile;
