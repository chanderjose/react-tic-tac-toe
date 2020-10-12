import React from 'react';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        const {isMultiplayer} = props;

        this.state = {
            isMultiplayer: isMultiplayer
        };
    }

    onSelectPlayers(e) {
        const isMultiplayer = e.target.value === 'true';

        console.log('Menu::onSelectPlayers | isMultiplayer=' + isMultiplayer);

        this.setState({
            isMultiplayer: isMultiplayer
        });
    }

    onStartGame() {
        console.log('Menu::onStartGame');
        console.log('Menu::onStartGame | isMultiplayer=' + this.state.isMultiplayer);

        this.props.onStartGame(this.state.isMultiplayer);
    }

    render() {
        console.log('Menu::render() | render');

        const {isMultiplayer} = this.state;

        const startGameBtnClassList = ['btn', 'btn-blue'];
        if(isMultiplayer === null) {
            startGameBtnClassList.push('disabled');
        } else {
            startGameBtnClassList.push('active');
        }

        return (
            <div>
                <div className="Menu">
                    <input type="radio" id="player1" value={false}
                        name="players"
                        onChange={this.onSelectPlayers.bind(this)} />
                    <label htmlFor="player1">
                        1 Player
                        <span>Player VS AI</span>
                    </label>

                    <input type="radio" id="player2" value={true}
                        name="players"
                        onChange={this.onSelectPlayers.bind(this)} />
                    <label htmlFor="player2">
                        2 Players
                        <span>Player VS Player</span>
                    </label>
                </div>

                <div className="text-center">
                    <button className={startGameBtnClassList.join(' ')}
                        onClick={this.onStartGame.bind(this)}>
                        Start Game
                    </button>
                </div>
            </div>
        );
    }
}

export default Menu;