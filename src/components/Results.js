import React from 'react';

export default function Results(props) {
    const {playerName1, playerName2, playerScore1, playerScore2, tieScore, onNewGame} = props;

    return (
        <div className="Results">
            <h2 className="text-center">Results</h2>
            <div className="ResultsContainer">
                <div className="result">
                    <span className="label">
                        {playerName1}
                    </span>
                    <span className="value">
                        {playerScore1}
                    </span>
                </div>
                <div className="result">
                    <span className="label">
                        {playerName2}
                    </span>
                    <span className="value">
                        {playerScore2}
                    </span>
                </div>
                <div className="result">
                    <span className="label">
                        Tie
                    </span>
                    <span className="value">
                        {tieScore}
                    </span>
                </div>
            </div>

            <div className="ButtonsContainer">
                {props.isGameOver && (
                    <button type="button" className="btn btn-blue" onClick={props.onPlayAgain}>
                        Play again
                    </button>
                )}

                <button type="button" className="btn btn-blue" onClick={onNewGame}>
                    New Game
                </button>
            </div>
        </div>
    );
}