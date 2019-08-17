import React from 'react';
import { Card, Divider, Icon } from 'semantic-ui-react'
import { tsPropertySignature } from '@babel/types';

type YoutubeProps = {
    snippet: any
}

type IframeProps = {
    url: string,
    title: string,
    youtube: YoutubeProps
}

type SongProps = {
    enriched: boolean,
    youtube: YoutubeProps,
    artist: string,
    song: string,
    url: string,
    genre: string,
    click(iframeData: IframeProps): void
}

const Song = ({enriched, youtube, artist, song, click, genre, url}: SongProps) => {
    const isEnriched = enriched && youtube
    const title = isEnriched ? youtube.snippet.title : `${artist} - ${song}`
    
    return (
        <Card className="song-card" onClick={() => click({
                url,
                title,
                youtube
            })}>
            <Card.Content>
                <Card.Description className="song-card-title">
                    {title}
                </Card.Description>
            </Card.Content>
            <Divider horizontal />
            <Card.Content>
                
                <Card.Description className="song-card-meta">
                    {isEnriched && <Icon name="sound"/>}
                    {genre}
                </Card.Description>
            </Card.Content>
        </Card>
    );
}
export default Song;