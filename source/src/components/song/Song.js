import React from 'react';
import { Card, Divider, Icon } from 'semantic-ui-react'

const Song = props => {
    const isEnriched = props.enriched && props.youtube
    const title = isEnriched ? props.youtube.snippet.title : `${props.artist} - ${props.song}`
    
    return (
        <Card onClick={() => props.click(props)}>
            
                <Card.Content>
                    <Card.Description style={{minHeight: '110px', fontSize: '1.5em'}}>
                        {title}
                    </Card.Description>
                </Card.Content>
                <Divider horizontal />
                <Card.Content>
                    
                    <Card.Description style={{"fontSize": "1.2em"}}>
                        { isEnriched && <Icon name="sound"/> }
                        {props.genre}
                    </Card.Description>
                </Card.Content>
        </Card>
    );
}

export default Song;