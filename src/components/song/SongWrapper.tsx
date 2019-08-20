import React from 'react';
import genresList from '../../data/categories_lookup.json';
import {Button, Grid, Menu} from 'semantic-ui-react'
import { SongLoading } from './SongLoading'
import { Song } from './Song';
import LazyLoad from 'react-lazyload';
import { IframeProps } from 'components/song/Iframe';
import { JsonSong } from '../../utils'
import Visibility from "semantic-ui-react/dist/commonjs/behaviors/Visibility";

genresList.sort(() => Math.random() - 0.5);
const genresForRandomPlay = genresList;

type SongWrapperProps = {
    onSongClick(iframeData: IframeProps): void
}

const chunksToLoad = 24;

export class SongWrapper extends React.Component<SongWrapperProps, { songs: JsonSong[] }> {
    constructor(props: SongWrapperProps, state: any) {
        super(props, state);
        this.state = {
            songs: []
        };
    }

    shouldComponentUpdate(nextProps: Readonly<SongWrapperProps>, nextState: Readonly<{ songs: JsonSong[] }>, nextContext: any): boolean {
        return !(this.state.songs === nextState.songs);
    }

    componentDidMount(): void {
        this.addMoreSongs();
    }

    playRandomSong = () => {
        const randomGenreIndex = Math.floor(Math.random() * (genresForRandomPlay.length));
        const randomGenre = require(`../../data/categories/${genresForRandomPlay[randomGenreIndex]}`);
        const randomSong =  randomGenre[Math.floor(Math.random() * randomGenre.length)];
        console.log(randomSong);
        this.props.onSongClick({
            url: randomSong.url,
            title: `${randomSong.artist} - ${randomSong.song}`,
            youtube: randomSong.youtube,
        })
    };

    addMoreSongs = () => {

        let songs: JsonSong[] = [];
        for (let i = 0; i < chunksToLoad; i++) {
            const filename = genresList.pop();
            if(!filename) {
                break;
            }
            const foo = require(`../../data/categories/${filename}`);
            songs = songs.concat(foo);
        }

        // THERE ARE DEAD SONGS, because we load 32 genres,
        // each genre can have multiple songs, if it goes above 32 entries per
        // chunk, this function will truncate it
        const songsToAppend = songs.splice(0, chunksToLoad);

        this.setState({
            songs: this.state.songs.concat(songsToAppend)
        })
    };
    render() {
        return (
            <React.Fragment>
                <Menu>
                    <Menu.Item name='editorials'><Button onClick={this.playRandomSong}>Random Song</Button></Menu.Item>
                </Menu>
                <Grid centered grid className="overflow song-card-container">
                {this.state.songs.map((song: JsonSong) => (
                    <Grid.Column key={song.url}  mobile={6} tablet={4} computer={4} largeScreen={2} widescreen={2}>
                        <LazyLoad overflow once={true} throttle={100} height={1000} placeholder={<SongLoading/>} >
                            <Song click={this.props.onSongClick} {...song}/>
                        </LazyLoad>
                    </Grid.Column>
                ))}
                    <Visibility
                        continuous={true}
                        onBottomVisible={() => this.addMoreSongs()}
                    />
                </Grid>
            </React.Fragment>
    )}
}