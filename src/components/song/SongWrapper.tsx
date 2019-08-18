import React from 'react';
import dataMap from '../../data/categories_lookup.json';
import { Grid } from 'semantic-ui-react'
import { SongLoading } from './SongLoading'
import { Song } from './Song';
import LazyLoad from 'react-lazyload';
import { IframeProps } from 'components/song/Iframe';
import { JsonSong } from '../../utils'
import Visibility from "semantic-ui-react/dist/commonjs/behaviors/Visibility";


type SongWrapperProps = {
    onSongClick(iframeData: IframeProps): void
}

const chunksToLoad = 40;

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

    addMoreSongs = () => {
        let songs: JsonSong[] = [];
        for (var i = 0; i < chunksToLoad; i++) {
            const filename = dataMap.pop();
            const foo = require(`../../data/categories/${filename}`);
            songs = songs.concat(foo);
        }

        const songsToAppend = this.state.songs.concat(songs);
        this.setState({
            songs: songsToAppend
        })
    };
    render() {
        return (
            <Grid grid className="overflow">
            {this.state.songs.map((song: JsonSong) => (
                <Grid.Column key={song.url} mobile={6} tablet={3} computer={3}>
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
    )}
}