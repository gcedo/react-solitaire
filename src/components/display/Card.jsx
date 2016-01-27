import React, { PropTypes as T } from 'react';
import Overlay from './Overlay.jsx';
import SuitAndRank from './SuitAndRank.jsx';
import SuitSymbol from './SuitSymbol.jsx';
import RankSymbol from './RankSymbol.jsx';
import ReactSymbol from './ReactSymbol.jsx';
import { Shadows, Suits, Ranks, RanksValues, Colors, Dimensions, CardsLayouts } from '../../constants';
import prefixer from 'react-prefixer';

const Card =
({rank, suit, upturned, style, isOver, canDrop, isMouseOver, isDragging}) => {
    let suitSymbols;
    let rankSymbol;
    let _style = prefixer({
        background: upturned ? Colors.Card.upturned : Colors.Card.downturned,
        borderRadius: Dimensions.Card.borderRadius,
        boxShadow: Shadows.Level1,
        boxSizing: 'border-box',
        color: Colors[suit],
        fontFamily: 'Helvetica',
        padding: 4,
        position: 'relative',
        width: Dimensions.Card.width,
        height: Dimensions.Card.height,
        cursor: upturned ? 'grab' : 'inherit',
        userSelect: 'none',
        transition: 'all 250ms',
        ...style
    });
    if (!upturned) { return <div style={_style}><ReactSymbol color={Colors.React} /></div>; }
    if (!rank || !suit) { return <span />; }

    if (isMouseOver) {
        _style = {..._style,
            boxShadow: Shadows.Level2,
            transform: 'translateY(-5px)',
        };
    }
    if (isDragging) _style = { ..._style, opacity: .6 };

    if (Array.isArray(CardsLayouts[rank])) {
        suitSymbols = CardsLayouts[rank].map((style, i) =>
            <SuitSymbol style={style} suit={suit} key={i} />
        );
    } else rankSymbol = <RankSymbol symbol={CardsLayouts[rank]} />;


    return (
        <div style={_style}>
            { isOver && <Overlay color={canDrop && Colors.OK || Colors.KO} /> }
            <SuitAndRank suit={suit} rank={rank} position={{top: 4, left: 5}} />
            <SuitAndRank suit={suit} rank={rank} position={{bottom: 4, right: 5}} />
            {suitSymbols}
            {rankSymbol}
        </div>
    );

}

Card.propTypes = {
    rank: T.oneOf(Ranks),
    suit: T.oneOf(Object.keys(Suits)),
    upturned: T.bool
};

export default Card;
