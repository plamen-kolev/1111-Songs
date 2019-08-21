import React from 'react';
import './App.css';
import { Iframe } from './components/song/Iframe';
import { SongWrapper } from './components/song/SongWrapper';
import ReactGA from 'react-ga';
import {Button, Checkbox, Grid, Menu} from "semantic-ui-react";

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
            <Grid className="App iframe-container">
                <Grid.Row className="youtube-player-container nopadding">
                    <Grid.Column className="nopadding">
                        <Grid.Row className="menu-container">
                            <Grid.Column>
                                <Menu>
                                    <Menu.Item name='editorials'><Checkbox onChange={(e) => this.toggleAutoplay("enabled")} toggle label='Autoplay'/></Menu.Item>
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="nopadding">
                            <Grid.Column className="nopadding">
                                <Iframe autoplay={this.state.autoplay} {...this.state.currentSong} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="menu-container">
                            <Grid.Column>
                                <Menu>
                                    <Menu.Item name='editorials'><Button onClick={this.playRandomSong}>Random Song</Button></Menu.Item>
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="overflow song-card-container centered">
                    <SongWrapper key="songWrapper" onSongClick={this.onSongClick} />
                </Grid.Row>
            </Grid>
        );
    }
}

export default App;
