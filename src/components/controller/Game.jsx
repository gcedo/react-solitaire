import React from 'react';
import SmartDeck from './SmartDeck.jsx';
import SmartPile from  './SmartPile.jsx';
import SmartFoundation from '../controller/SmartFoundation.jsx';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import range from 'lodash/utility/range';
import { connect } from 'react-redux';
import ActionCreators from '../../actions';

@connect((state) => { return { game: state } })
@DragDropContext(HTML5Backend)
class Game extends React.Component {

    turnCard = () => {
        const { dispatch } = this.props;
        dispatch(ActionCreators.turnCard());
    }

    moveCards = (cards, where) => {
        const { dispatch } = this.props;
        dispatch(ActionCreators.moveCard(cards, where));
    }

    render() {

        const game = this.props.game.solitaire.toJS();
        const { moveCards, turnCard } = this;
        console.log(game);

        return (
            <div style={{
                width: 957,
                backgroundColor: '#4CAF50',
                padding: 10
            }}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <SmartDeck deck={game.DECK} turnCard={turnCard} />
                    <div style={{
                        width: 540,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <SmartFoundation suit="SPADES" cards={game.FOUNDATION.SPADES} moveCards={moveCards} />
                        <SmartFoundation suit="HEARTS" cards={game.FOUNDATION.HEARTS} moveCards={moveCards} />
                        <SmartFoundation suit="DIAMONDS" cards={game.FOUNDATION.DIAMONDS} moveCards={moveCards} />
                        <SmartFoundation suit="CLUBS" cards={game.FOUNDATION.CLUBS} moveCards={moveCards} />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: 40
                }}>
                {
                    range(0, 6).map(index =>
                        <SmartPile cards={game.PILE[index]} index={index} key={index} moveCards={moveCards} />
                    )
                }
                </div>
            </div>
        );
    }
}

export default Game;
