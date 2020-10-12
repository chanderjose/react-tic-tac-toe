import React from 'react';

export default function Cell(props) {
    const {index, value, isGameOver, isWinnerCell} = props;

    const classList = ['Cell'];
    if(value === null && !isGameOver && props.handleClick !== null) {
        classList.push('Active');
    }
    if(isWinnerCell) {
        classList.push('Winner')
    }

    return (
        <div className={classList.join(' ')}
             onClick={() => {!isGameOver && props.handleClick !== null && props.handleClick(index)}}>
                 <span className={value === 'X' ? 'CellX' : (value === 'O' ? 'CellO' : '')}></span>
        </div>
    );
}



/*
return (
        <div className={classList.join(' ')}
             onClick={() => {!isGameOver && props.handleClick !== null && props.handleClick(index)}}>
                 <span className="CellO">{value === null ? '' : value}</span>
        </div>
    );
*/