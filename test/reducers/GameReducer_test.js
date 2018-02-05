import expect from 'expect';
import reducer from '../../src/reducers';
import { OrderedDeck } from '../../src/reducers/GameReducer.js';
import { ActionTypes as types } from '../../src/constants';
import TestActions from './TestActions.js';
import initialState from './initialState.js';
import { Suits, Ranks } from '../../src/constants';
import flatten from "lodash/flatten";
import where from "lodash/where";
import omit from "lodash/omit";

const getNewState = state => action => reducer(state, action).game.toJS();
const getNewGame = getNewState(initialState);

describe('GameReducer', function () {

describe('Initial State', function () {
    it('all the cards should have been dealt', () => {
        const state = getNewState()({});
        const dealtDeck = state.DECK.upturned
            .concat(state.DECK.downturned)
            .concat(flatten(state.PILE.map(pile => pile)));

        expect(dealtDeck.length).toBe(Object.keys(Suits).length * Ranks.length);
        expect(
            OrderedDeck.every(
                card => where(dealtDeck, omit(card, 'upturned')).length
            )
        ).toBe(true);
    });
});

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
        ).not.toContain(
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
        ).not.toContain(TestActions.PILE_TO_PILE.payload.cards[0])
    });

    it('should handle from PILE to PILE, multiple cards');

    it('should handle from FOUNDATION to PILE', () => {
        const newState = getNewGame(TestActions.FOUNDATION_TO_PILE);
        expect(
            newState.PILE[2]
        ).toContain(TestActions.FOUNDATION_TO_PILE.payload.cards[0]);
        expect(
            newState.FOUNDATION.CLUBS
        ).not.toContain(TestActions.FOUNDATION_TO_PILE.payload.cards[0]);

    });

    it('should handle from DECK to PILE', () => {
        const newState = getNewGame(TestActions.DECK_TO_PILE);
        expect(
            newState.PILE[5]
        ).toContain(TestActions.DECK_TO_PILE.payload.cards[0]);
        expect(
            newState.DECK.upturned
        ).not.toContain(TestActions.DECK_TO_PILE.payload.cards[0]);
        expect(
            newState.DECK.downturned
        ).not.toContain(TestActions.DECK_TO_PILE.payload.cards[0]);
    });

    it('should handle from DECK to FOUNDATION', () => {
        const newState = getNewGame(TestActions.DECK_TO_FOUNDATION);
        expect(
            newState.FOUNDATION.CLUBS
        ).toContain(TestActions.DECK_TO_FOUNDATION.payload.cards[0]);
        expect(
            newState.DECK.upturned
        ).not.toContain(TestActions.DECK_TO_FOUNDATION.payload.cards[0]);
        expect(
            newState.DECK.downturned
        ).not.toContain(TestActions.DECK_TO_FOUNDATION.payload.cards[0]);
    });

});

describe('TURN_CARD', () => {
    it('should turn a deck card', () => {
        const newState = getNewGame(TestActions.TURN_CARD);
        expect(newState.DECK.upturned).toContainEqual({ rank:'2', suit:'CLUBS' });
        expect(newState.DECK.upturned).toContainEqual({ rank:'Q', suit:'CLUBS' });
        expect(newState.DECK.downturned).not.toContainEqual({ rank:'Q', suit:'CLUBS' });
    });
});

});
