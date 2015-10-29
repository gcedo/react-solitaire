import expect from 'expect';
import reducer from '../../src/reducers/ScoreReducer.js';
import TestActions from './TestActions.js';

describe('ScoreReducer', () => {
describe('DECK to PILE', () => {
    it('should increase the score by 5 points', () => {
        expect(reducer(undefined, TestActions.DECK_TO_PILE)).toBe(5);
    });
});

describe('DECK to FOUNDATION', () => {
    it('should increase the score by 10 points', () => {
        expect(reducer(undefined, TestActions.DECK_TO_FOUNDATION)).toBe(10);
    });

});

describe('PILE to FOUNDATION', () => {
    it('should increase the score by 10 points', () => {
        expect(reducer(undefined, TestActions.PILE_TO_FOUNDATION)).toBe(10);
    });
});

describe('FOUNDATION to PILE', () => {
    it('should decrease the score by 15 points', () => {
        expect(reducer(undefined, TestActions.FOUNDATION_TO_PILE)).toBe(-15);
    });
});
});
