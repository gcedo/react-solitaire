import React from 'react';

const Foundation = ({ children }) => {
    return (
        <div style={{
            backgroundColor: '#f5f5f5',
            border: '1px solid black',
            borderRadius: 2,
            borderStyle: 'dotted',
            boxSizing: 'border-box',
            width: 125,
            height: 175,
        }}>
            {children}
        </div>
    );
};

export default Foundation;
