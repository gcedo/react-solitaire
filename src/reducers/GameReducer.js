import { Directions } from '../actions';
import Immutable, { Map, List } from 'immutable';
import { Suits, Ranks } from '../constants';
import range from 'lodash/utility/range';
import shuffle from 'lodash/collection/shuffle';
import first from 'lodash/array/first';
import flatten from 'lodash/array/flatten';

const orderedDeck = flatten(
    Object.keys(Suits).map(suit => Ranks.map(rank => ({ rank, suit })))
);

function getInitialState() {
    const cards = shuffle(orderedDeck);
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

function upturnFirstCard(cards) {
    return cards.map((card, index, pile) => {
        if (index === pile.size - 1) { return { ...card, upturned: true }; }
        else { return card; }
    });
}

function moveCards(state, action) {
    let { cards, where } = action.payload;
    const target = state.getIn(where.to).concat(cards);
    let source = state.getIn(where.from)
    if (first(where.from) === 'PILE' && first(where.to) === 'PILE' && !first(cards).isLast) {
        const index = source.findIndex(c =>
            c.suit === first(cards).suit && c.rank === first(cards).rank
        );
        cards = source.slice(index);
    }
    source = source.slice(0, -cards.length);

    if (first(where.from) === 'PILE') source = upturnFirstCard(source);

    return state
        .updateIn(where.to, value => target)
        .updateIn(where.from, value => source);
}

function turnCard(state, action) {
    let deck = Map();
    const upturnedCards = state.getIn(['DECK', 'upturned']);
    const downturnedCards = state.getIn(['DECK', 'downturned']);
    if (downturnedCards.isEmpty()) {
        deck = deck.set('downturned', List(upturnedCards));
        deck = deck.set('upturned', List());
    } else {
        deck = deck.set('downturned', downturnedCards.shift());
        deck = deck.set('upturned', upturnedCards.push(downturnedCards.first()));
    }

    return state.set('DECK', deck);
}

export default function game(state = getInitialState(), action) {
    switch (action.type) {
    case 'MOVE_CARD':
        return moveCards(state, action);
    case 'TURN_CARD':
        return turnCard(state, action);
    default:
        return state;
    }
}
