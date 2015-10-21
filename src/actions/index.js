export function moveCard(cards, where) {
    return {
        type: 'MOVE_CARD',
        payload: { cards, where }
     };
}

export function turnCard() {
    return {
        type: 'TURN_CARD'
    };
}

export function shuffleDeck() {
    return { type: 'SHUFFLE_DECK' }
}

export default {
    moveCard,
    turnCard,
    shuffleDeck
}
