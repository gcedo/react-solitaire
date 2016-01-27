import ReactDOM from 'react-dom';
import React from 'react';
import Game from './components/controller/Game.jsx';
import Card from './components/display/Card.jsx';
import { Suits, Ranks } from './constants';
import Deck from './components/display/Deck.jsx';
import Pile from './components/display/Pile.jsx';
import Foundation from './components/display/Foundation.jsx';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import reducers from './reducers';
import { devTools, persistState  } from 'redux-devtools';
import { DevTools, DebugPanel } from 'redux-devtools/lib/react';
import SliderMonitor from 'redux-slider-monitor';

let cards = [];
Object.keys(Suits).forEach(suit => {
    Ranks.forEach(rank => {
        cards.push({ rank, suit })
    })
})

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);
const store = finalCreateStore(reducers);

ReactDOM.render(
  <div>
    <Provider store={store}>
        <Game />
    </Provider>
    <DebugPanel left right bottom>
      <DevTools store={store} monitor={SliderMonitor} />
    </DebugPanel>
  </div>,
  document.getElementById('game')
);

ReactDOM.render(
    <div>
        { Ranks.map(rank => <Card rank={rank} suit="HEARTS" upturned key={rank} />) }
    </div>,
    document.getElementById('card')
);

ReactDOM.render(
    <Deck>
        <Card rank="A" suit="HEARTS" upturned/>
    </Deck>,
    document.getElementById('deck')
);

ReactDOM.render(
    <Pile>
        <Card rank="A" suit="HEARTS"/>
        <Card rank="2" suit="HEARTS"/>
        <Card rank="3" suit="HEARTS"/>
    </Pile>,
    document.getElementById('pile')
);

ReactDOM.render(
    <Foundation />, document.getElementById('foundation')
);
