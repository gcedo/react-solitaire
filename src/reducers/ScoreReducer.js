import { ActionTypes, Places } from '../constants';
import first from 'lodash/first';

const Points = {
    [Places.DECK]: {
        [Places.PILE]: 5,
        [Places.FOUNDATION]: 10
    },
    [Places.PILE]: {
        [Places.FOUNDATION]: 10
    },
    [Places.FOUNDATION]: {
        [Places.PILE]: -15
    }
};

const getPoints = (points) => (source, target) =>
    points[source][target] !== undefined && points[source][target] || 0;

function handleCardMove(state, action) {
    const { where } = action.payload;
    return state + getPoints(Points)(first(where.from), first(where.to));
}

export default function score(state = 0, action) {
    switch (action.type) {
    case ActionTypes.MOVE_CARD:
        return handleCardMove(state, action);
    default:
        return state;
    }
}
