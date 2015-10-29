import game from './GameReducer.js';
import score from './ScoreReducer.js';
import { combineReducers } from 'redux';


export default combineReducers({ game, score });
