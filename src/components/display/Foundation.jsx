import React from 'react';
import { Suits } from './Card.jsx';

const Foundation = ({ children, suit }) => {
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
