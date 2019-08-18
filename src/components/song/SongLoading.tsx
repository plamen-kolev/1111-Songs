import React from 'react';
import { Dimmer, Loader, Card, Placeholder } from 'semantic-ui-react'

export const SongLoading = () => {
    return (
        <Card className="song-card">
            <Card.Content>
                <Card.Description className="song-card-title">
                    <Placeholder>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                    <Dimmer active inverted>
                        <Loader inverted></Loader>
                    </Dimmer>
                </Card.Description>
            </Card.Content>
        </Card>
    
    )
}