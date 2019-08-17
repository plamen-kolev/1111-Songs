import React from 'react';
import { Dimmer, Loader, Card, Divider } from 'semantic-ui-react'

export const SongLoading = () => {
    return (
        <Card style={{minHeight: '260px'}}>
            <Card.Content>
                <Card.Description style={{minHeight: '140px', fontSize: '1.5em'}}>
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
                </Card.Description>
            </Card.Content>
            <Divider horizontal />
            <Card.Content>
                
                <Card.Description style={{"fontSize": "1.2em"}}>
                    ...
                </Card.Description>
            </Card.Content>
        </Card>
    
    )
}