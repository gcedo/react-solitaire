
export const Directions = {
    DECK_TO_PILE: 'DECK_TO_PILE',
    DECK_TO_FOUNDATION: 'DECK_TO_FOUNDATION',
    PILE_TO_FOUNDATION: 'PILE_TO_FOUNDATION',
    FOUNDATION_TO_PILE: 'FOUNDATION_TO_PILE'
}

export function moveCard(cards, where) {
    return {
        type: 'MOVE_CARD',
        payload: { cards, where }
     };
}

export function shuffleDeck() {
    return { type: 'SHUFFLE_DECK' }
}

export default {
    moveCard,
    shuffleDeck
}
