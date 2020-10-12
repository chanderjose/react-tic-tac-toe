import React from 'react';

import Cell from './Cell';

export default function Board(props) {
    return (
        <div className="Board">
            <h2 className="text-center">
                {(props.isGameOver && props.winner !== null) && `Winner: ${props.winner}`}
                {(props.isGameOver && props.winner === null) && 'Its a tie!'}
                {!props.isGameOver && `Turn of: ${props.nextPlayer}`}
            </h2>
            <br />
            <div className="Grid">
                {
                    props.board.map((cellValue, index) => {
                        return <Cell key={index}
                                     index={index}
                                     value={cellValue}
                                     isGameOver={props.isGameOver}
                                     isWinnerCell={props.winnerLine && props.winnerLine.includes(index)}
                                     handleClick={props.handleClick} />
                    })
                }
            </div>
        </div>
    );
}
