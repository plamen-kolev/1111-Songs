import React from 'react';
import data from '../../data'
import { getAllSongs } from '../../utils';
import { Grid } from 'semantic-ui-react'
import { SongLoading } from './SongLoading'
import Song from './Song';
import LazyLoad from 'react-lazyload';

const songs = getAllSongs(data);
console.log(songs.length);
export const SongWrapper = props => {
    
    return (
        <Grid grid className="overflow">
            {songs.map(song => (
                <Grid.Column key={song.url} mobile={6} tablet={3} computer={3}>
                    <LazyLoad overflow once={true} throttle={100} height={1000} placeholder={<SongLoading padded/>} >
                        <Song padded click={props.onSongClick} {...song}/>
                    </LazyLoad>
                </Grid.Column>
            ))}
        </Grid>
    )
}