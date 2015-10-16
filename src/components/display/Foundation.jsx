import React from 'react';
import { Suits, Colors } from '../../constants';


const Foundation = ({ children, suit, isOver, canDrop }) => {
    const color = isOver && (canDrop && Colors[suit] || Colors.Card.downturned) || Colors.Game.backgroundColor;
    return (
        <div style={{
            backgroundColor: '#388E3C',
            border: '1px solid #388E3C',
            borderRadius: 2,
            borderStyle: 'dotted',
            boxSizing: 'border-box',
            width: 125,
            height: 175,
            position: 'relative'
        }}>
            <div style={{
                color,
                position: 'absolute',
                top: 0,
                left: 0,
                height: 175,
                width: 125,
                lineHeight: '175px',
                textAlign: 'center',
                fontSize: 40,
            }}>
                {Suits[suit]}
            </div>
            {children}
        </div>
    );
};

export default Foundation;
