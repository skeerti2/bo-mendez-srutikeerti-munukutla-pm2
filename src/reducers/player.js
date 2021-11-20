import {SWITCH_TURNS} from '../actions/constants';
let initialState = {
    player_turn: 0
}

export const PlayerReducer = (state=initialState, action) => {
    if(action.type === SWITCH_TURNS){
        // console.log("player turn is", state.player_turn);
        return{
            ...state,
            player_turn : action.payload
        }
    }
    return state;
};