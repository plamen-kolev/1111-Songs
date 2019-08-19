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
            <div className="App container">
                <Grid className="ui grid iframe-container">
                    <Grid.Column extra className="menu-container" width={16}>
                        <Menu>
                            <Menu.Item name='editorials'><Button>Random Song</Button></Menu.Item>
                            <Menu.Item name='editorials'><Checkbox onChange={(e) => this.toggleAutoplay("enabled")} toggle label='Autoplay'/></Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Iframe autoplay={this.state.autoplay} {...this.state.currentSong} />
                    </Grid.Column>
                </Grid>
                <SongWrapper width={16} key="songWrapper" onSongClick={this.onSongClick} />
            </div>
        );
    }
}

export default App;
