import React, { Component, useState } from 'react';
import Board from './board.jsx';
import Restart from './restart.jsx';
import { useSelector, useDispatch } from 'react-redux';
// import { switchTurns } from '../actions/player';
import { boardClick } from '../actions/board';

 
function Game() {
        const dispatch = useDispatch();
        const isFreePlay = useSelector(state => state.BoardReducer.freePlay);
        const user_board = useSelector(state => state.BoardReducer.user_board);
        const ai_board = useSelector(state => state.BoardReducer.ai_board);
        const aiPlayed = useSelector(state => state.BoardReducer.aiPlayed);
        const [aiScore,IncrementAIScore] = useState(0);
        const [playerScore, incrementScore] = useState(0);

      
        function getRandomInteger(maxInt) {
            return Math.floor(Math.random() * maxInt);
          }
        
          function isUnselected(x_coord, y_coord) {
            if(ai_board[x_coord][y_coord].unselected){
                return true;
            }else{
                return false
            }
        }

        
        function checkCoordinateIsShip(x_coord, y_coord) {
            if(ai_board[x_coord][y_coord].isBoat){
                return true;
            }
                return false
          }
        
          function aiTurn() {
            //console.log("aiClick()");
            let x = getRandomInteger(10)
            let y = getRandomInteger(10)
    
            while (!isUnselected(x, y)) {
                // get random number unselected
                x = getRandomInteger(10)
                y = getRandomInteger(10)
            }
            let hitShip = checkCoordinateIsShip(x, y);
            //exited while loop means, isUnselected returned true
            let unselected = false;
            let isEnemyBoard = false;
            dispatch(boardClick(x, y, isEnemyBoard, hitShip, !hitShip, unselected))
            if(hitShip){
                let oldScore = aiScore;
                IncrementAIScore(oldScore+1)
            }
          }
        
          if(!aiPlayed && !isFreePlay){
            aiTurn();
          }
        
          function incrementPlayerScore(isHit){
            incrementScore(playerScore + isHit)
          }
        // let playerZeroWins = false;
        // let playerOneWins = false;
        // let player_one_score = boardStats.player_one.score;
        // let player_zero_score= boardStats.player_zero.score;
        // let winnerBoardClass = 'NoWinner';
        // if(player_one_score === 0){
        //     playerZeroWins = true;
        //     winnerBoardClass = 'WinnerBoard';
        // }else if(player_zero_score === 0){
        //     playerOneWins = true;
        //     winnerBoardClass = 'WinnerBoard';
        // }
        // //board display switch based on turn
        // let leftClassStat = '';
        // let rightClassStat = '';
        // if(!playerTurn){
        //     leftClassStat = 'classOverlay';
        //     rightClassStat = 'highlight';
        // }else{
        //     rightClassStat = 'classOverlay';
        //     leftClassStat = 'highlight';
        // }
        if(isFreePlay){
            return(
                <div className="container board-wrapper">
                <h1>Battleship</h1>            
                <Restart/>
                <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12">
                    <h1>Scoreboard</h1>
                    {/* <div className="ScoreBoard">          
                    Ships Hit: {(17- boardStats.player_zero.score)}</div>
                    <div className={winnerBoardClass}> Congratulations! You hit all ships</div> */}
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                    <Board enemy ={false}/>
                </div>
                </div>
            </div>);
        }else{
        return (
        <div className="container board-wrapper">
            <h1>Battleship</h1>            
            
            {/* <div className="ScoreBoard">ScoreBoard: 
            Player: {playerTurn} <span> </span>
            Score: {playerTurn === 0 ? (17 - boardStats.player_one.score): (17- boardStats.player_zero.score)}</div>
            <div className={winnerBoardClass}>Player {playerZeroWins ? 0 : 1} wins the game</div> */}
            <Restart/>
            <div className="row">
                <div className='col-lg-6 col-md-12 col-sm-12 playerBoard'>
                    <h3>Your Board, AI Score: {aiScore}</h3>
                    <Board enemy={false}/>
                </div>
                
                <div className="col-lg-6 col-md-12 col-sm-12">
                <h3>Enemy Board, Your Score: {playerScore}</h3>
                    <Board enemy={true} doIncrementEnemyScore={incrementPlayerScore}/>
                </div>
            </div>
        </div>);
        }
}
 
export default Game;