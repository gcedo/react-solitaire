import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactSymbol from '../../../src/components/display/ReactSymbol.jsx';
import unexpected from 'unexpected';
import unexpectedReactShallow from 'unexpected-react-shallow';

const expect = unexpected.clone().installPlugin(unexpectedReactShallow);
const renderer = TestUtils.createRenderer();

describe('ReactSymbol', () => {
    it('should render properly', function () {
        renderer.render(<ReactSymbol />);

        expect(renderer, 'to have rendered',
            <div>⚛</div>
        )
    });
});
