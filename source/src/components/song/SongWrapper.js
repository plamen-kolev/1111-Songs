import React from 'react';
import data from '../../data'
import { getAllSongs } from '../../utils';
import { Grid } from 'semantic-ui-react'
import { SongLoading } from './SongLoading'
import Song from './Song';
import LazyLoad from 'react-lazyload';

const songs = getAllSongs(data);

export const SongWrapper = props => {
    
    return (
        <Grid grid container>
            {songs.map(song => (
                <Grid.Column key={song.url} mobile={6} tablet={3} computer={3}>
                    <LazyLoad throttle={100} height={1000} placeholder={<SongLoading />} >
                        <Song padded click={props.onSongClick} {...song}/>
                    </LazyLoad>
                </Grid.Column>
            ))}
        </Grid>
    )
}