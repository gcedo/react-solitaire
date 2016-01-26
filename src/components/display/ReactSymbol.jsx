import React, { PropTypes as T } from 'react';
import { Colors } from '../../constants';

const ReactSymbol = ({ color }) => {
    return (
        <div style={{
            fontFamily: 'Arial',
            fontSize: 150,
            position: 'absolute',
            top: -4,
            left: 17,
            color: color,
            bottom: 0
        }}>
            ⚛
        </div>
    );
}

ReactSymbol.propTypes = {
    color: T.string
};

export default ReactSymbol;
