import { ActionTypes as types } from '../../src/constants';
import * as actions from '../../src/actions';
import expect from 'expect';

describe('GameActions', () => {
    it('should create an action to turn a deck card', () => {
        const expectedAction = { type: types.TURN_CARD };
        expect(actions.turnCard()).toEqual(expectedAction);
    });

    it('should create an action to move cards', () => {
        const where = { from: 'FOO', to: 'BAR'};
        const cards = [];
        const expectedAction = {
            type: types.MOVE_CARD,
            payload: {
                where,
                cards
            }
        };
        expect(actions.moveCard(cards, where)).toEqual(expectedAction);
    });
});
