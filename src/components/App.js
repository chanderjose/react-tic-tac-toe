import React from 'react';

import Header from './Header';
import Menu from './Menu';
import Game from './Game';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: 'dark',
            isMenuVisible: true,
            isMultiplayer: null
        };
    }

    onSelectTheme(theme) {
        console.log('App::onSelectTheme() | theme=' + theme);
        if(theme === this.state.theme) return;

        this.setState({
            theme: theme
        });
    }

    onStartGame(isMultiplayer) {
        console.log('App::onStartGame | isMultiplayer=' + isMultiplayer);

        this.setState({
            isMultiplayer: isMultiplayer,
            isMenuVisible: false
        });
    }

    onNewGame() {
        console.log('App::onNewGame');

        this.setState({
            isMultiplayer: null,
            isMenuVisible: true
        });
    }

    render () {
        const {theme, isMultiplayer, isMenuVisible} = this.state;

        let title2;
        if(isMenuVisible) {
            title2 = 'Select numbers of players';
        } else if(isMultiplayer) {
            title2 = 'Player Vs Player';
        } else {
            title2 = 'Player VS AI';
        }

        return (
            <div className="App" data-theme={theme}>
                <Header
                    title1="Tic Tac Toe"
                    title2={title2}
                    theme={theme}
                    onSelectTheme={this.onSelectTheme.bind(this)} />

                {isMenuVisible && <Menu isMultiplayer={isMultiplayer} onStartGame={this.onStartGame.bind(this)} />}
                {!isMenuVisible && <Game isMultiplayer={isMultiplayer} onNewGame={this.onNewGame.bind(this)} />}
            </div>
        );
    }
}

export default App;