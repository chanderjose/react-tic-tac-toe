import React from 'react';

import Board from './Board';
import Results from './Results';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            board: Array(9).fill(null),
            isGameOver: false,
            nextPlayer: 1,
            playerScore1: 0,
            playerScore2: 0,
            tieScore: 0,
            winnerLine: null,
            winner: null
        };
    }

    componentDidUpdate() {
        if(!this.props.isMultiplayer && this.state.nextPlayer === 2) {
            setTimeout(() => {
                const move = this.getCPUMove(this.state.board);
                const newState = this.handleMove(move, 2, this.state.board);
                this.setState(JSON.parse(JSON.stringify(newState)));
            }, 100);
        }
    }

    onPlayAgain() {
        const totalGames = this.state.playerScore1 + this.state.playerScore2 + this.state.tieScore;
        let nextPlayer = totalGames % 2 === 0 ? 1 : 2;

        const newBoard = Array(9).fill(null);

        this.setState({
            board: newBoard,
            isGameOver: false,
            nextPlayer: nextPlayer,
            winnerLine: null,
            winner: null
        });
    }

    getEmptyCells(board) {
        return board
                .map((value, index) => value === null ? index : null)
                .filter(emptyCellIndex => emptyCellIndex !== null);
    }

    isGameOver(board) {
        return this.getEmptyCells(board).length === 0;
    }

    checkWinner(board) {
        const winnerLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for(let i = 0; i < winnerLines.length; i++) {
            const line = winnerLines[i];

            if(board[line[0]] !== null &&
                board[line[0]] === board[line[1]] &&
                board[line[1]] === board[line[2]]) {

                return {
                    winnerPlayer: board[line[0]],
                    winnerLine: line
                };
            }
        }

        return null;
    }

    /**
     *
     * @param {Array} board
     * @param {Number} depth
     * @returns {Number} score for minmax function
     */
    minimax(board, depth) {
        const winner = this.checkWinner(board);
        if(winner !== null) {
            return depth % 2 === 0 ? 1 : -1;
        }

        const emptyCells = this.getEmptyCells(board);
        if(emptyCells.length === 0) {
            return 0;
        }

        let bestScore = depth % 2 === 0 ? 999 : -999;
        emptyCells.forEach(cellIndex => {
            if(depth % 2 === 0) {
                board[cellIndex] = 'X';
                const score = this.minimax(board, depth + 1);
                bestScore = Math.min(score, bestScore);
            } else {
                board[cellIndex] = 'O';
                const score = this.minimax(board, depth + 1);
                bestScore = Math.max(score, bestScore);
            }

            board[cellIndex] = null;
        });

        return bestScore;
    }

    getCPUMove(board) {
        const emptyCells = this.getEmptyCells(board);

        // For the first CPU move the position is predefined in a corner or the center (if available)
        if(emptyCells.length === 8) {
            if(emptyCells.includes(4)) {
                return 4; //center
            } else {
                const corners = [0, 2, 6, 8];
                const randomCellPosition = Math.floor(Math.random() * corners.length);

                return corners[randomCellPosition];
            }
        }

        let bestScore = -999;
        let bestMove;
        let newBoard = [...board];

        // Iterate over the empty cells
        emptyCells.forEach(cellIndex => {
            newBoard[cellIndex] = 'O';
            const score = this.minimax(newBoard, 0);
            if(score > bestScore) {
                bestScore = score;
                bestMove = cellIndex;
            }
            newBoard[cellIndex] = null;
        });

        return bestMove;
    }

    handleMove(index, player, board) {
        if(this.state.isGameOver) return null;

        if(board[index] !== null) return null;

        const playerCharacter = player === 1 ? 'X' : 'O';

        const newBoard = [...board];
        newBoard[index] = playerCharacter;

        // Check if player won
        let winner = this.checkWinner(newBoard);
        if(winner) {
            return {
                board: newBoard,
                isGameOver: true,
                winner: player === 1 ? 'Player 1' : (this.props.isMultiplayer ? 'Player 2' : 'AI'),
                winnerLine: winner.winnerLine,
                playerScore1: this.state.playerScore1 + (winner.winnerPlayer === 'X' ? 1 : 0),
                playerScore2: this.state.playerScore2 + (winner.winnerPlayer === 'O' ? 1 : 0)
            };
        }

        // Check if tie
        if(this.isGameOver(newBoard)) {
            return {
                board: newBoard,
                isGameOver: true,
                tieScore: this.state.tieScore + 1
            };
        }

        return {
            board: newBoard,
            isGameOver: false,
            nextPlayer: player % 2 + 1
        };
    }

    handleClick(index) {
        if(!this.props.isMultiplayer && this.state.nextPlayer === 2) return;

        let newState = this.handleMove(index, this.state.nextPlayer, this.state.board);

        if(newState === null) return;

        if(newState.isGameOver) {
            this.setState(JSON.parse(JSON.stringify(newState)));
            return;
        }

        this.setState(JSON.parse(JSON.stringify(newState)));
    }

    render() {
        console.log('Game::render() | render');

        const {nextPlayer, playerScore1, playerScore2, tieScore} = this.state;
        const nextPlayerName = nextPlayer === 1 ? 'Player 1' : (this.props.isMultiplayer ? 'Player 2' : 'AI');

        return (
            <div>
                <div className="Game">
                    <Board
                        board={this.state.board}
                        nextPlayer={nextPlayerName}
                        isGameOver={this.state.isGameOver}
                        winnerLine={this.state.winnerLine}
                        winner={this.state.winner}
                        handleClick={(!this.props.isMultiplayer && nextPlayer ===2) ? null : this.handleClick.bind(this)} />

                    <Results
                        onPlayAgain={this.onPlayAgain.bind(this)}
                        onNewGame={this.props.onNewGame}
                        isGameOver={this.state.isGameOver}
                        playerName1="Player 1"
                        playerName2={this.props.isMultiplayer ? 'Player 2' : 'AI'}
                        playerScore1={playerScore1}
                        playerScore2={playerScore2}
                        tieScore={tieScore} />
                </div>
            </div>
        );
    }
}

export default Game;