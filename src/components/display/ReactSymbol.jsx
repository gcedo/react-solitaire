import React, { PropTypes as T } from 'react';
import { Colors } from '../../constants';

const ReactSymbol = ({ color }) => {
    return (
        <div style={{
            fontSize: 120,
            fontFamily: "Apple Symbols",
            position: 'absolute',
            top: '6%',
            left: 0,
            right: 0,
            textAlign: 'center',
            color: color
        }}>
            ⚛
        </div>
    );
}

ReactSymbol.propTypes = {
    color: T.string
};

export default ReactSymbol;
