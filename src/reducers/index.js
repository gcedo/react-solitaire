import { Directions } from '../actions';
import { combineReducers } from 'redux';
import Immutable, { Map, List } from 'immutable';
import { Suits, Ranks } from '../components/display/Card.jsx';
import range from 'lodash/utility/range';

let cards = [];
Object.keys(Suits).forEach(suit => {
    Ranks.forEach(rank => {
        cards.push({ rank, suit })
    })
})

const initialState = Map({
    FOUNDATION: Map({
        HEARTS: List(),
        SPADES: List(),
        DIAMONDS: List(),
        CLUBS: List()
    }),

    PILE: getPiles(cards),
    DECK: List(cards.slice(28))
});

function getPiles (cards) {
    let deck = cards.slice();
    return List(range(0, 6).map(index => {
        let pile = deck.splice(0, index + 1);
        // return List([{ ...pile.shift(), upturned: true}].concat(pile));
        return List(pile.slice(0, -1).concat([{ ...pile.pop(), upturned: true}]))
    }));
}

function moveCard(state, action) {
    const { cards, where } = action.payload;
    let newState = state;
    const target = state.getIn(where.to).concat(cards);
    let source = state.getIn(where.from);
    cards.forEach(card => {
        const index = source.findIndex(c =>
            c.suit === card.suit && c.rank === card.rank
        );
        source = source.delete(index)
    });
    newState = newState.updateIn(where.to, value => target);
    newState = newState.updateIn(where.from, value => source);
    return newState;
}

function solitaire(state = initialState, action) {
    switch (action.type) {
    case 'MOVE_CARD':
        return moveCard(state, action);
    default:
        return state;
    }

}


export default combineReducers({ solitaire })
