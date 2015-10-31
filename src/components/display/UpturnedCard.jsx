import React from 'react';
import { Colors, Dimensions } from '../../constants';
import ReactSymbol from './ReactSymbol.jsx';

const UpturnedCard = ({ children }) => {
    return (
        <div style={{
            height: Dimensions.Card.height,
            width: Dimensions.Card.width,
            backgroundColor: Colors.Foundation.backgroundColor,
            borderRadius: Dimensions.Card.borderRadius,
            color: Colors.Game.backgroundColor,
            position: 'relative'
        }}>
            <ReactSymbol color={Colors.Game.backgroundColor} />
            {children}
        </div>
    );
}

export default UpturnedCard;
// ✪
