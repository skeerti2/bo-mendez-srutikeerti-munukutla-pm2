// import * as actions from '../actions/constants.js';
// export default function reducers(state, action){
//     //have not used switch case so that they can be moved into individual reducer functions later
//     if(action.BUILD_BOARD){
//         //call function to populate board
//     }else if(actions.ADD_SHIPS){
//         // call function to add ships to board
//     }else if(actions.BOARD_CLICK){
//         //call function to click board and change scores accordingly and then toggle player
//     }else if(actions.RESTART){
//         //call function to restart the game
//     }
    
// }

import { combineReducers } from 'redux';
import { BoardReducer } from './board';
import { PlayerReducer } from './player';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['BoardReducer'],
}

const rootReducer = combineReducers({
    BoardReducer
});

export default persistReducer(persistConfig, rootReducer);