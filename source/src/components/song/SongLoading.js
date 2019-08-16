import React from 'react';
import { Grid } from 'semantic-ui-react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

export const SongLoading = props => {
    return (
        <Grid.Column mobile={6} tablet={3} computer={3}>
            <Segment  style={{minHeight: '110px', fontSize: '1.5em'}}>
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
            </Segment>
        </Grid.Column>       
    )
}