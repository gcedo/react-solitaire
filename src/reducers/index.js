import { Directions } from '../actions';
import { combineReducers } from 'redux';
import Immutable, { Map, List } from 'immutable';
import { Suits, Ranks } from '../constants';
import range from 'lodash/utility/range';
import shuffle from 'lodash/collection/shuffle';
import first from 'lodash/array/first'

function getInitialState() {
    let cards = [];
    Object.keys(Suits).forEach(suit => {
        Ranks.forEach(rank => {
            cards.push({ rank, suit })
        })
    })
    cards = shuffle(cards);
    return Map({
        FOUNDATION: Map({
            HEARTS: List(),
            SPADES: List(),
            DIAMONDS: List(),
            CLUBS: List()
        }),

        PILE: getPiles(cards),
        DECK: Map({
            upturned: List(cards.slice(-1)),
            downturned: List(cards.slice(21, -1))
        })
    });
}

function getPiles (cards) {
    const deck = cards.slice();
    return List(range(0, 6).map(index => {
        const pile = deck.splice(0, index + 1);
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

    if (first(where.from) === 'PILE') {
        source = source.map((card, index, list) => {
            if (index === list.size - 1) {
                return { ...card, upturned: true };
            } else { return card; }
        })
    }

    newState = newState.updateIn(where.to, value => target);
    newState = newState.updateIn(where.from, value => source);
    return newState;
}

function turnCard(state, action) {
    let deck = Map();
    const upturned = state.getIn(['DECK', 'upturned']);
    const downturned = state.getIn(['DECK', 'downturned']);
    if (downturned.isEmpty()) {
        deck = deck.set('downturned', List(upturned));
        deck = deck.set('upturned', List());
    } else {
        deck = deck.set('downturned', downturned.shift());
        deck = deck.set('upturned', upturned.push(downturned.first()));
    }

    return state.set('DECK', deck);
}

function solitaire(state = getInitialState(), action) {
    switch (action.type) {
    case 'MOVE_CARD':
        return moveCard(state, action);
    case 'TURN_CARD':
        return turnCard(state, action);
    default:
        return state;
    }

}


export default combineReducers({ solitaire });
