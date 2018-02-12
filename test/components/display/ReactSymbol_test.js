import React from 'react';
import ReactSymbol from '../../../src/components/display/ReactSymbol.jsx';
import ShallowRenderer from 'react-test-renderer/shallow';
import unexpected from 'unexpected';
import unexpectedReactShallow from 'unexpected-react-shallow';

const expect = unexpected.clone().installPlugin(unexpectedReactShallow);
const renderer = new ShallowRenderer();

describe('ReactSymbol', () => {
    it('should render properly', function () {
        renderer.render(<ReactSymbol />);

        expect(renderer.getRenderOutput(), 'to have rendered',
            <div>⚛</div>
        )
    });
});
