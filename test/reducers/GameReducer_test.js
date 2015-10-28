import expect from 'expect';
import reducer, { OrderedDeck as deck } from '../../src/reducers';
import { ActionTypes as types } from '../../src/constants';
import TestActions from './TestActions.js';
import initialState from './initialState.js';

function getNewState(state) {
    return action => reducer(state, action).game.toJS();
}

const getNewGame = getNewState(initialState);

function cardsEqual(a, b) { return a.rank === b.rank && a.suit === b.suit; }

describe('GameReducer', function () {
describe('MOVE_CARD', () => {
    it('should handle from PILE to FOUNDATION', () => {
        const newState = getNewGame(TestActions.PILE_TO_FOUNDATION);
        expect(
            newState.FOUNDATION.DIAMONDS
        ).toEqual(
            TestActions.PILE_TO_FOUNDATION.payload.cards
        );

        expect(newState.PILE[2].length).toBe(2);
        expect(
            newState.PILE[2]
        ).toExclude(
            TestActions.PILE_TO_FOUNDATION.payload.cards[0]
        );
    });

    it('should handle from PILE to PILE', () => {
        const newState = getNewGame(TestActions.PILE_TO_PILE);
        expect(
            newState.PILE[5]
        ).toContain(TestActions.PILE_TO_PILE.payload.cards[0]);

        expect(
            newState.PILE[3]
        ).toExclude(TestActions.PILE_TO_PILE.payload.cards[0])
    });

    it('should handle from PILE to PILE, multiple cards');

    it('should handle from FOUNDATION to PILE', () => {
        const newState = getNewGame(TestActions.FOUNDATION_TO_PILE);
        expect(
            newState.PILE[2]
        ).toInclude(TestActions.FOUNDATION_TO_PILE.payload.cards[0]);
        expect(
            newState.FOUNDATION.CLUBS
        ).toExclude(TestActions.FOUNDATION_TO_PILE.payload.cards[0]);

    });

    it('should handle from DECK to PILE', () => {
        const newState = getNewGame(TestActions.DECK_TO_PILE);
        expect(
            newState.PILE[5]
        ).toInclude(TestActions.DECK_TO_PILE.payload.cards[0]);
        expect(
            newState.DECK.upturned
        ).toExclude(TestActions.DECK_TO_PILE.payload.cards[0]);
        expect(
            newState.DECK.downturned
        ).toExclude(TestActions.DECK_TO_PILE.payload.cards[0]);
    });

    it('should handle from DECK to FOUNDATION', () => {
        const newState = getNewGame(TestActions.DECK_TO_FOUNDATION);
        expect(
            newState.FOUNDATION.CLUBS
        ).toInclude(TestActions.DECK_TO_FOUNDATION.payload.cards[0]);
        expect(
            newState.DECK.upturned
        ).toExclude(TestActions.DECK_TO_FOUNDATION.payload.cards[0]);
        expect(
            newState.DECK.downturned
        ).toExclude(TestActions.DECK_TO_FOUNDATION.payload.cards[0]);
    });

});

describe('TURN_CARD', () => {
    it('should turn a deck card', () => {
        const newState = getNewGame(TestActions.TURN_CARD);
        expect(newState.DECK.upturned).toInclude({ rank:'2', suit:'CLUBS' }, cardsEqual);
        expect(newState.DECK.upturned).toInclude({ rank:'Q', suit:'CLUBS' }, cardsEqual);
        expect(newState.DECK.downturned).toExclude({ rank:'Q', suit:'CLUBS' }, cardsEqual);

    });
});
});
