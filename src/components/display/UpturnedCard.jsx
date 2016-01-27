import React from 'react';
import { Colors, Dimensions } from '../../constants';
import ReactSymbol from './ReactSymbol.jsx';
import prefixer from 'react-prefixer';

const UpturnedCard = ({ children }) => {
    return (
        <div style={ prefixer({
            height: Dimensions.Card.height,
            width: Dimensions.Card.width,
            backgroundColor: Colors.Foundation.backgroundColor,
            borderRadius: Dimensions.Card.borderRadius,
            color: Colors.Game.backgroundColor,
            position: 'relative',
            userSelect: 'none'
        }) }>
            <ReactSymbol color={Colors.Game.backgroundColor} />
            {children}
        </div>
    );
}

export default UpturnedCard;
