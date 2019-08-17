import React from 'react';
import * as data from '../../data.json';
import { getAllSongs } from '../../utils';
import { Grid } from 'semantic-ui-react'
import { SongLoading } from './SongLoading'
import { Song } from './Song';
import LazyLoad from 'react-lazyload';
import { IframeProps } from 'components/song/Iframe';
import { JsonSong } from '../../utils'
const songs: JsonSong[] = getAllSongs(data);

type SongWrapperProps = {
    onSongClick(iframeData: IframeProps): void
}

export const SongWrapper = (props: SongWrapperProps) => {
    console.log("Unholy rerendering");
    return (
        <Grid grid className="overflow">
            {songs.map(song => (
                <Grid.Column key={song.url} mobile={6} tablet={3} computer={3}>
                    <LazyLoad overflow once={true} throttle={100} height={1000} placeholder={<SongLoading/>} >
                        <Song click={props.onSongClick} {...song}/>
                    </LazyLoad>
                </Grid.Column>
            ))}
        </Grid>
    )
}