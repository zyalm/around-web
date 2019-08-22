import React from 'react';
import Profile  from './Profile';
import nba from 'nba';
import DataViewContainer from './DataViewContainer';
import SearchBar from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants';

class Main extends React.Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    }


    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }

    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
    }

    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            this.setState({ playerInfo });
        });
    }


    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>
                <div className="player">
                    <Profile playerInfo={this.state.playerInfo}/>
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}

export default Main;
