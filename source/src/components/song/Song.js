import React from 'react';
import { Card, Divider, Icon } from 'semantic-ui-react'

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.isEnriched = props.enriched && props.youtube
        this.title = this.isEnriched ? props.youtube.snippet.title : `${props.artist} - ${props.song}`
    }

    render() {
        return (
            <Card className="song-card" onClick={() => this.props.click(this.props)}>
                <Card.Content>
                    <Card.Description className="song-card-title">
                        {this.title}
                    </Card.Description>
                </Card.Content>
                <Divider horizontal />
                <Card.Content>
                    
                    <Card.Description className="song-card-meta">
                        {this.isEnriched && <Icon name="sound"/>}
                        {this.props.genre}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default Song;