import React from 'react';
import { SongLoading } from './SongLoading'
import { Song } from './Song';
import LazyLoad from 'react-lazyload';
import { IframeProps } from 'components/song/Iframe';
import {getMoreSongs, JsonSong, playRandomSong} from '../../utils'
import Visibility from "semantic-ui-react/dist/commonjs/behaviors/Visibility";
import { Grid, Segment } from 'semantic-ui-react';

type SongWrapperProps = {
    onSongClick(iframeData: IframeProps): void
}

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
        const randomSong = playRandomSong();

        this.props.onSongClick({
            url: randomSong.url,
            title: `${randomSong.artist} - ${randomSong.song}`,
            youtube: randomSong.youtube,
        })
    };

    addMoreSongs = () => {
        this.setState({
            songs: this.state.songs.concat(getMoreSongs())
        })
    };
    render() {
        console.log("songwrapper rerendered");
        return (
            <Grid>
                {this.state.songs.map((song: JsonSong) => (
                    <Song key={song.url} click={this.props.onSongClick} {...song}/>
                ))}
                <Visibility
                    continuous={true}
                    onBottomVisible={() => this.addMoreSongs()}
                    offset={100}
                />
            </Grid>
        )}
}