export default {
    PILE_TO_FOUNDATION: {
        type: 'MOVE_CARD',
        payload: {
            cards: [
                {
                    suit: 'DIAMONDS',
                    rank: 'A',
                    where: ['PILE', 2],
                    upturned: true,
                    isLast: true,
                    index: 0
                }
            ],
            where: { from: ['PILE', 2], to: ['FOUNDATION', 'DIAMONDS'] }
        }
    },

    PILE_TO_PILE: {
        type: 'MOVE_CARD',
        payload: {
            cards: [
                {
                    suit: 'SPADES',
                    rank: '2',
                    where: ['PILE', 3],
                    upturned: true,
                    isLast: true,
                    index: 4
                }
            ],
            where: { from: ['PILE', 3], to: ['PILE', 5] }
        }
    },

    FOUNDATION_TO_PILE: {
        type: 'MOVE_CARD',
        payload: {
            cards: [
                {
                    suit: 'CLUBS',
                    rank: '5',
                    where: ['FOUNDATION', 'CLUBS'],
                    upturned: true,
                    isLast: true,
                    index: 4
                }
            ],
            where: { from: ['FOUNDATION', 'CLUBS'], to: ['PILE', 2] }
        }
    },

    DECK_TO_PILE: {
        type: 'MOVE_CARD',
        payload: {
            cards: [
                {
                    suit: 'CLUBS',
                    rank: '2',
                    where: ['DECK', 'upturned'],
                    upturned: true
                }
            ],
            where: { from: ['DECK', 'upturned'], to: ['PILE', 5] }
        }
    },

    DECK_TO_FOUNDATION: {
        type: 'MOVE_CARD',
        payload: {
            cards: [
                {
                    suit: 'CLUBS',
                    rank: '2',
                    where: ['DECK', 'upturned'],
                    upturned: true
                }
            ],
            where: { from: ['DECK', 'upturned'], to: ['FOUNDATION', 'CLUBS'] }
        }
    },

    TURN_CARD: {
        type: 'TURN_CARD'
    }
}
