import React from 'react';
import { Dimmer, Loader, Card, Divider } from 'semantic-ui-react'

export const SongLoading = () => {
    return (
        <Card style={{minHeight: '260px'}}>
            <Card.Content>
                <Card.Description className="song-card-title">
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
                </Card.Description>
            </Card.Content>
            <Divider horizontal />
            <Card.Content>
                
                <Card.Description className="song-card-meta">
                    ...
                </Card.Description>
            </Card.Content>
        </Card>
    
    )
}