import React from 'react';
import SmartDeck from './SmartDeck.jsx';
import SmartPile from  './SmartPile.jsx';
import Foundation from '../display/Foundation.jsx';
import { Suits, Ranks } from '../display/Card.jsx';

let cards = [];
Object.keys(Suits).forEach(suit => {
    Ranks.forEach(rank => {
        cards.push({ rank, suit })
    })
})


class Game extends React.Component {
    render() {
        return (
            <div style={{
                width: 957,
                backgroundColor: 'green',
                padding: 10

            }}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <SmartDeck cards={cards} />
                    <div style={{
                        width: 540,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Foundation />
                        <Foundation />
                        <Foundation />
                        <Foundation />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: 40
                }}>
                    <SmartPile cards={cards.splice(0,1) } />
                    <SmartPile cards={cards.splice(0,2) } />
                    <SmartPile cards={cards.splice(0,3) } />
                    <SmartPile cards={cards.splice(0,4) } />
                    <SmartPile cards={cards.splice(0,5) } />
                    <SmartPile cards={cards.splice(0,6) } />
                    <SmartPile cards={cards.splice(0,7) } />
                </div>
            </div>
        );
    }
}

export default Game;
