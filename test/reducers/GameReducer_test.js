import expect from 'expect';
import reducer, { OrderedDeck as deck } from '../../src/reducers';
import { ActionTypes as types } from '../../src/constants';
import TestActions from './TestActions.js';
import initialState from './initialState.js';

describe('MOVE_CARD', () => {
    it('should handle from PILE to FOUNDATION', () => {
        const newState = reducer(
            initialState,
            TestActions.PILE_TO_FOUNDATION
        ).game.toJS();
        expect(
            newState.FOUNDATION.DIAMONDS
        ).toEqual(
            [ { suit: 'DIAMONDS',
                rank: 'A',
                where: [ 'PILE', 2 ],
                upturned: true,
                isLast: true,
                index: 0 } ]
        );

        expect(newState.PILE[2].length).toBe(2);
        expect(
            newState.PILE[2]
        ).toExclude(
            TestActions.PILE_TO_FOUNDATION.payload.cards[0]
        );
    });

    it('should handle from PILE to PILE', () => {
        const newState = reducer(
            initialState,
            TestActions.PILE_TO_PILE
        ).game.toJS();

        expect(
            newState.PILE[5]
        ).toContain(TestActions.PILE_TO_PILE.payload.cards[0]);

        expect(
            newState.PILE[3]
        ).toExclude(TestActions.PILE_TO_PILE.payload.cards[0])
    });

    it('should handle from FOUNDATION to PILE', () => {
        const newState = reducer(
            initialState,
            TestActions.FOUNDATION_TO_PILE
        ).game.toJS();

        expect(
            newState.PILE[2]
        ).toInclude(TestActions.FOUNDATION_TO_PILE.payload.cards[0]);
        expect(
            newState.FOUNDATION.CLUBS
        ).toExclude(TestActions.FOUNDATION_TO_PILE.payload.cards[0]);

    });

    it('should handle from DECK to PILE', () => {
        const newState = reducer(
            initialState,
            TestActions.DECK_TO_PILE
        ).game.toJS();

        expect(
            newState.PILE[5]
        ).toInclude(TestActions.DECK_TO_PILE.payload.cards[0]);
        expect(
            newState.DECK.downturned
        ).toExclude(TestActions.DECK_TO_PILE.payload.cards[0]);
    });

    it('should handle from DECK to FOUNDATION');

});

