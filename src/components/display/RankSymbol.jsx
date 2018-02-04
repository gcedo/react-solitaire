import React from 'react';
import T from 'prop-types';

const RankSymbol = ({ symbol, style }) => {
    return (
        <div style={{
            ...style,
            fontSize: 40,
            paddingTop: 57,
            margin: 'auto',
            lineHeight: '55px',
            width: 50,
            height: 53,
            textAlign: 'center'
        }}>
            {symbol}
        </div>
    );
};

RankSymbol.propTypes = {
    symbol: T.string
};

export default RankSymbol;
