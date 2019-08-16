import React from 'react';
import { Card, Divider, Icon } from 'semantic-ui-react'

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.isEnriched = props.enriched && props.youtube
        this.title = this.isEnriched ? props.youtube.snippet.title : `${props.artist} - ${props.song}`
        
    }
    
    render() {
        console.log()
        return (
            <Card onClick={() => this.props.click(this.props)}>
                <Card.Content>
                    <Card.Description style={{minHeight: '110px', fontSize: '1.5em'}}>
                        {this.title}
                    </Card.Description>
                </Card.Content>
                <Divider horizontal />
                <Card.Content>
                    
                    <Card.Description style={{"fontSize": "1.2em"}}>
                        {this.isEnriched && <Icon name="sound"/>}
                        {this.props.genre}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default Song;