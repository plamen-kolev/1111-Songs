import React from 'react';
import {BrowserView} from "react-device-detect";
import {Button, Checkbox, Menu} from "semantic-ui-react";

import './App.css';
import { Iframe } from './components/song/Iframe';
import { SongWrapper } from './components/song/SongWrapper';
import ReactGA from 'react-ga';
import genresList from "./data/categories_lookup";
import { getRandomSong } from "./utils";

ReactGA.initialize('UA-89618080-1');
ReactGA.pageview(window.location.pathname + window.location.search);

genresList.sort(() => Math.random() - 0.5);

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

    playRandomSong = () => {
        const randomSong = getRandomSong(genresList);

        this.onSongClick({
            title: `${randomSong.artist} - ${randomSong.song}`,
            url: randomSong.url,
            youtube: randomSong.youtube,
        });
    }

    render() {
        return (
            <div className="App iframe-container ui">
                <div className="youtube-player-container nopadding menu-container">

                    <div className="nopadding">
                        <Iframe autoplay={this.state.autoplay} {...this.state.currentSong} />
                    </div>
                    <div className="menu-container">
                        <Menu>
                            <Menu.Item name='editorials'><Button onClick={this.playRandomSong}>Random Song</Button></Menu.Item>
                            <BrowserView>
                                <Menu.Item name='editorials'><Checkbox onChange={(e) => this.toggleAutoplay("enabled")} toggle label='Autoplay'/></Menu.Item>
                            </BrowserView>

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
