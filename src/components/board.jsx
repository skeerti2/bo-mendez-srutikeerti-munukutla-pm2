import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Square } from "./square";



function Board(props) {
  const user_board = useSelector(state => state.BoardReducer.user_board);
  const ai_board = useSelector(state => state.BoardReducer.ai_board);

  let board_state;
  if(props.enemy){
    board_state = ai_board;
  }else{
    board_state = user_board;
  }
  console.log(board_state);
  const board = initializeBoard();
  
  function initializeBoard() {
    let gridRows = [];
    for(let row=0; row < board_state.length; row++){
      const rowSquares = [];
      for(let col=0; col < board_state[row].length; col++){
        let square_state = board_state[row][col];
        rowSquares.push(<Square row={row} col={col} enemy={props.enemy} hit={square_state.hit} miss={square_state.miss} unselected={square_state.unselected} is_boat={square_state.isBoat}/>);
      }
      gridRows.push(<tr>{rowSquares}</tr>);
    }
    // console.log(gridRows);
    return gridRows;
  }

  return (
    <div class="table-responsive">
    <table className="board-class">
      <tbody>{board}</tbody>
    </table>
    </div>
  );
}

export default Board;
