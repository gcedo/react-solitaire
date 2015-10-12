import React from 'react';
import { Suits } from '../../constants';

const Foundation = ({ children, suit, isOver, canDrop }) => {
    const borderColor = isOver && (canDrop && 'green' || 'red') || '#388E3C';
    return (
        <div style={{
            backgroundColor: '#388E3C',
            border: `1px solid ${borderColor}`,
            borderRadius: 2,
            borderStyle: 'dotted',
            boxSizing: 'border-box',
            width: 125,
            height: 175,
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: 50,
                left: 50
            }}>
                {Suits[suit]}
            </div>
            {children}
        </div>
    );
};

export default Foundation;
