import { Directions } from '../actions';
import Immutable, { Map, List } from 'immutable';
import { Suits, Ranks, Places, ActionTypes } from '../constants';
import range from 'lodash/utility/range';
import shuffle from 'lodash/collection/shuffle';
import first from 'lodash/array/first';
import flatten from 'lodash/array/flatten';

export const OrderedDeck = flatten(
    Object.keys(Suits).map(suit => Ranks.map(rank => ({ rank, suit })))
);

function getInitialState(cards) {
    return Map({
        [Places.FOUNDATION]: Map({
            HEARTS: List(),
            SPADES: List(),
            DIAMONDS: List(),
            CLUBS: List()
        }),
        [Places.PILE]: getPiles(cards),
        [Places.DECK]: Map({
            upturned: List(cards.slice(-1)),
            downturned: List(cards.slice(21, -1))
        })
    });
}

function getPiles(cards) {
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

/**
 * Returns true if the player is moving more than one card from one pile to
 * another, false otherwise.
 *
 * @param  {Object} where Object describing:
 *                            .to: where the cards are going to
 *                            .from: where the cards come from
 * @param  {Array} cards  The array of cards to be moved.
 * @return {Boolean}      True if moving more than one card from one pile to
 *                        another, false otherwise.
 */
function movingMultipleCardsFromPileToPile(where, cards) {
    return first(where.from) === Places.PILE &&
           first(where.to) === Places.PILE &&
           !first(cards).isLast;
}

function moveCards(state, action) {
    let { cards, where } = action.payload;
    let source = state.getIn(where.from)
    if (movingMultipleCardsFromPileToPile(where, cards)) {
        cards = source.slice(first(cards).index);
    }
    const target = state.getIn(where.to).concat(cards);
    source = source.slice(0, -cards.size);

    if (first(where.from) === Places.PILE) source = upturnFirstCard(source);

    return state
        .updateIn(where.to, value => target)
        .updateIn(where.from, value => source);
}

function turnCard(state, action) {
    let deck = Map();
    const upturnedCards = state.getIn([Places.DECK, 'upturned']);
    const downturnedCards = state.getIn([Places.DECK, 'downturned']);
    if (downturnedCards.isEmpty()) {
        deck = deck.set('downturned', List(upturnedCards));
        deck = deck.set('upturned', List());
    } else {
        deck = deck.set('downturned', downturnedCards.shift());
        deck = deck.set('upturned', upturnedCards.push(downturnedCards.first()));
    }

    return state.set(Places.DECK, deck);
}

export default function game(
    state = getInitialState(shuffle(OrderedDeck)),
    action
) {
    switch (action.type) {
    case ActionTypes.MOVE_CARD:
        return moveCards(state, action);
    case ActionTypes.TURN_CARD:
        return turnCard(state, action);
    default:
        return state;
    }
}
