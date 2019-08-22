import React, {Component} from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
import { PROFILE_PIC_URL_PREFIX } from '../constants';
import nba from 'nba';

const Option = AutoComplete.Option;

class SearchBar extends Component {
    state = {
        dataSource: [],
    }
    handleSearch = (value) => {
        console.log(value);
        const players = nba.searchPlayers(value);
        console.log(players);

            this.setState({
                dataSource: !value ?
                    [] : nba.searchPlayers(value).map(player => ({
                        fullName: player.fullName,
                        playerId: player.playerId,
                    }))
            })
    }

    onSelect = (playerName) => {
        this.props.handleSelectPlayer(playerName);
    }

    render() {
            const { dataSource } = this.state;
            const options = dataSource.map((player) => (
                <Option key={player.fullName} value={player.fullName}  className="player-option">
                    <img className="player-option-image"  src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}/>
                    <span className="player-option-label">{player.fullName}</span>
                </Option>
            ));

            return (
                <AutoComplete
                    className="search-bar"
                    size="large"
                    dataSource={options} // translate datasource into options
                    onSearch={ this.handleSearch}
                    onSelect={this.onSelect}
                    placeholder="search NBA"
                    optionLabelProp="text"
                >
                    <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                </AutoComplete>
        );
    }
}

export default SearchBar;