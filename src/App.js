import React from 'react';
import './App.css';
import { Iframe } from './components/song/Iframe';
import { SongWrapper } from './components/song/SongWrapper';
import ReactGA from 'react-ga';
import {Button, Checkbox, Menu} from "semantic-ui-react";

ReactGA.initialize('UA-89618080-1');
ReactGA.pageview(window.location.pathname + window.location.search);

export class App extends React.Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            currentSong: null,
            autoplay: false
        };
    }

    onSongClick = (song) => {
        this.setState({
            currentSong: song,
        });
    };

    toggleAutoplay = (e) => {
        this.setState({autoplay: !this.state.autoplay});
    };

    render() {
        return (
            <div className="App iframe-container ui">
                <div className="youtube-player-container nopadding menu-container">
                    <Menu>
                        <Menu.Item name='editorials'><Checkbox onChange={(e) => this.toggleAutoplay("enabled")} toggle label='Autoplay'/></Menu.Item>
                    </Menu>

                    <div className="nopadding">
                        <Iframe autoplay={this.state.autoplay} {...this.state.currentSong} />
                    </div>
                    <div className="menu-container">
                        <Menu>
                            <Menu.Item name='editorials'><Button onClick={this.playRandomSong}>Random Song</Button></Menu.Item>
                        </Menu>
                    </div>
                </div>

                <div className="overflow song-card-container centered nopadding">
                    <SongWrapper key="songWrapper" onSongClick={this.onSongClick} />
                </div>
            </div>
        );
    }
}

export default App;
