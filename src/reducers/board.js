import { BOARD_CLICK, RESTART, SET_GAME_TYPE, SWITCH_TURNS } from "../actions/constants";
import { AIRCRAFT_CARRIER, SIZE_TEN } from "../components/constants";

function initialStateFunc() {

  const initialState = {
  freePlay: false,
  user_board: buildBoard(),
  ai_board: buildBoard(),
  aiPlayed: true
  }
  return initialState
 
}

  
function buildBoard(){
  let arr = []
  for(let i=0; i < 10; i++){
    arr.push(buildinitialRows())
  }
  arr = putShipsOnBoard(arr)
  return arr
}

function buildinitialRows(){
  let row = []
  for(let i=0; i< 10; i++){
    row.push(buildSquare());
  }
  return row;
}


function buildSquare(){
    let squareState = {
      hit:false,
      miss: false,
      isBoat: false,
      unselected: true
    }
  return squareState;
}


//   console.log(initialState.player_zero.ships)
//   console.log(initialState.player_one.ships)

function putShipsOnBoard(board) {
  for(let ship in ships){
    board = placeOneShip(ship, ships[ship], board);
  }
  return board;
}

// Helper function to place one ship on board
function placeOneShip(shipType, shipSize, board) {
  let isVertical = getRandomInteger(2);

  let newRowCol = getRowAndCol(shipSize, isVertical);
  let randomRow = newRowCol[0];
  let randomCol = newRowCol[1];
  // fillShip(randomRow, randomCol, shipSize, isVertical, board);
  while (!shipPlacementValid(randomRow, randomCol, shipSize, isVertical, board)) {
    newRowCol = getRowAndCol(shipSize, isVertical);
    randomRow = newRowCol[0];
    randomCol = newRowCol[1];
  }
  board = fillShip(randomRow, randomCol, shipSize, isVertical, board);
  return board;
}

// Validates whether the ship overlaps an existing ship in the given player's
// ship attribute
function shipPlacementValid(row, col, length, isVertical, board) {
  // check each ship
  let currRow = row;
  let currCol = col;
  for (let i = 0; i < length; i++) {
    if (isVertical) {
      if (board[col][currRow].isBoat) {
        return false;
      }
      currRow++;
    } else {
      if (board[currCol][row].isBoat) {
        return false;
      }
      currCol++;
    }
  }
  return true;
}
// Adds the row/col of each ship to the given player's ships attribute
function fillShip(row, col, length, fillVertical, board) {
  let currRow = row;
  let currCol = col;
  for (let i = 0; i < length; i++) {
    if (fillVertical) {
      board[col][currRow].isBoat = true;
      currRow++;
    } else {
      board[currCol][row].isBoat = true;
      currCol++;
    }
  }
  return board;
}

//   // Helper function checking whether a ship can be placed
//   // on given location with specified ship length
//   // function shipPlacementValid(row, col, ship, length, player_no, isVertical) {
//   //   console.log("Validate", ship, "player:", player_no.ships, isVertical)
//   //   if (ship in player_no.ships) {
//   //     if (isVertical) {
//   //       for (let currRow = row; currRow <= length; currRow++) {
//   //         debugger
//   //         for (let i=0; i < player_no.ships[ship].length; i++) {
//   //           let testShip = player_no.ships[ship][i]
//   //           if (testShip.x_coord === currRow && testShip.y_coord === col) {
//   //             console.log("return false")
//   //             return false;
//   //           }
//   //         }

//   //         // if (player_no.ships[ship].find(obj => obj.y_coord === currRow && obj.x_coord === col)) {
//   //         // // if(player_no.ships[ship].indexOf({currRow, col}) >=0) {
//   //         //   console.log("return false")
//   //         //   return false;
//   //         // }
//   //       }
//   //     } else {
        
//   //       for (let currCol = col; currCol <= length; currCol++) {
//   //         for (let testShip of player_no.ships[ship]) {
//   //           if (testShip.x_coord === row && testShip.y_coord === currCol) {
//   //             console.log("return false")
//   //             return false;
//   //           }
//   //         }

//   //         // if(player_no.ships[ship].find(obj => obj.y_coord === row && obj.x_coord === currCol)) {
//   //         //   console.log("return false")
//   //         //   return false;
//   //         // }
//   //       }
//   //     }
//   //   }
//   //   console.log("return true")
//   //   return true;
//   // }

  // Helper function to get random row and column values
  function getRowAndCol(shipSize, isVertical) {
    let rowMax = SIZE_TEN;
    let colMax = SIZE_TEN;
    if (isVertical) {
      rowMax = 9 - shipSize;
    } else {
      colMax = 9 - shipSize;
    }
    let randomRow = getRandomInteger(rowMax);
    let randomCol = getRandomInteger(colMax);
    return [randomRow, randomCol];
  }

  // Helper function that returns a random integer between
  // 0 (inclusive) and a given maxInt (exclusive)
  function getRandomInteger(maxInt) {
    return Math.floor(Math.random() * maxInt);
  }


//   console.log(initialState);
//   return initialState;
// }

//define a dictionary of ships with respective lengths. 
const ships = {
  carrier: 5,
  battleship: 4,
  destroyer: 3,
  submarine: 3,
  patrolBoat: 2
}

  
// // REDUCER STARTS HERE
export const BoardReducer = (state, action) => {
  if (state === undefined) {
    return initialStateFunc();
  }
//   let player_no;
//   let opponent_player;
//   //if board is clicked,
//   if (action.type === BOARD_CLICK){
//     //get the current player
//     if(action.payload.player_id === '0'){
//       player_no = state.player_one;
//       //get the opponent player since their state/squares need to be changed
//       opponent_player = state.player_zero;
//     }else{
//       player_no = state.player_zero;
//       opponent_player = state.player_one;
//     }
//     //avoid already clicked squares being added to the list of visited squares
//     //change this later
//     if(!opponent_player.clickedSquares.some(
//       (e) =>
//         e.x_coord === action.payload.x_coord &&
//         e.y_coord === action.payload.y_coord
//     )){
//     if(action.payload.player_id === '0'){
//       //if player is player_zero, need to update the clicked squares of player one
//       // and the score of player_zero if a shit has been hit
//       return {
//           ...state,
//           player_zero:{
//             ...state.player_zero,
//             clickedSquares : state.player_zero.clickedSquares.concat(
//               {
//                 x_coord: action.payload.x_coord,
//                 y_coord: action.payload.y_coord,
//               }
//             ),
//             score: action.payload.hitShip ? state.player_zero.score - 1 :  state.player_zero.score,
//           },
//           //when clicked on board 0, set ai played to true to enable state changes for respective square
//           player_one : {
//             ...state.player_one,
//             aiPlayed: true
//           }
//         }
//     }else{
//         return {
//         ...state,
//         player_one:{
//           ...state.player_one,
//           clickedSquares : state.player_one.clickedSquares.concat(
//             {
//               x_coord: action.payload.x_coord,
//               y_coord: action.payload.y_coord,
//             }
//           ),
//           score: action.payload.hitShip ? state.player_one.score - 1 :  state.player_one.score
//         }
//       }
//     }
//   }
// }
//   if (action.type === RESTART) {
//     //fetch the previous game type and set it
//     let previousGameType = state.gameType.freePlay;
//    let newState =  initialStateFunc();
//    return {
//     ...newState,
//     gameType: {
//       ...newState.gameType,
//       freePlay: previousGameType
//     }
//   }
//   }
  if (action.type === BOARD_CLICK) {
    let board;
    if(action.payload.enemy){
      board = state.ai_board;
    }else{
      board = state.user_board
    }
    let boardCopy = board.map(function(arr){
      return arr.slice();
    });
    let squareCopy = { ...boardCopy[action.payload.row][action.payload.col] };
    squareCopy.hit = action.payload.hit;
    squareCopy.miss = action.payload.miss;
    squareCopy.unselected = action.payload.unselected;
    boardCopy[action.payload.row][action.payload.col] = squareCopy;
    if(action.payload.enemy){
      return {
        ...state,
        ai_board : boardCopy,
        aiPlayed : false
      }
    }else{
      return {
        ...state,
        user_board : boardCopy,
        aiPlayed : true
      }
  }
}

  if(action.type === SET_GAME_TYPE){
     return {
     ...state,
     freePlay : action.payload.gameType === "normal" ? false : true,
     user_board: buildBoard(),
     ai_board: buildBoard(),
     aiPlayed: true
     }
    }
  if (action.type === RESTART) {
    let newUserBoard = []
    let newAIBoard = []
    newUserBoard = buildBoard()
    newAIBoard = buildBoard()
    return {
      ...state,
      freePlay: action.payload.isFreePlay,
      user_board: newUserBoard,
      ai_board: newAIBoard,
    }
  }
   return state;
};

