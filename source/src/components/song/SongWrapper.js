import React, {lazy, Suspense} from 'react';
import data from '../../data'
import { getAllSongs } from '../../utils';
import { Grid } from 'semantic-ui-react'
import { SongLoading } from './SongLoading'

const songs = getAllSongs(data);
const Song = lazy(() => import("./Song"))

export const SongWrapper = props => {
    
    return (
        <Grid grid>
            {songs.map(song => (    
            <Grid.Column key={song.url} mobile={6} tablet={3} computer={3}>
                <Suspense fallback={<SongLoading/>}  key={song.url}>
                    <Song padded click={props.onSongClick} {...song}/>
                </Suspense>
            </Grid.Column>
                
            ))}
        </Grid>
    )
}