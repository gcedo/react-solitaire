import React, { PropTypes as T } from 'react';
import Card from '../display/Card.jsx';
import { Suits, Ranks } from '../../constants';
import UpturnedCard from '../display/UpturnedCard.jsx';
import Deck from '../display/Deck.jsx';
import head from 'lodash/array/head';
import { List } from 'immutable';
import DraggableCard from './DraggableCard.jsx';
import last from 'lodash/array/last';
import ActionCreators from '../../actions';
import { Places } from '../../constants';

class SmartDeck extends React.Component {

    static propTypes = {
        deck: T.shape({
            upturned: T.arrayOf(T.shape(
                {
                    rank: T.oneOf(Ranks),
                    suit: T.oneOf(Object.keys(Suits)),
                    upturned: T.bool
                }
            )),
            downturned: T.arrayOf(T.shape(
                {
                    rank: T.oneOf(Ranks),
                    suit: T.oneOf(Object.keys(Suits)),
                    upturned: T.bool
                }
            ))
        })
    }

    render() {
        const { deck, turnCard } = this.props;
        const lastCard = last(deck.upturned);
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: 264
            }}>
                <Deck onClick={turnCard}>
                    <Card />
                </Deck>
                <UpturnedCard>
                    <DraggableCard {...lastCard}
                        upturned
                        where={[Places.DECK, 'upturned']}
                    />
                </UpturnedCard>
            </div>
        );
    }
}

export default SmartDeck;
