import React from 'react';
import { Card, Divider, Icon } from 'semantic-ui-react'
import { YoutubeInterface } from '../../utils'
import { IframeProps } from './Iframe';
import { isModuleDeclaration, isModuleSpecifier } from '@babel/types';

type SongProps = {
    enriched: boolean,
    youtube: YoutubeInterface,
    artist: string,
    song: string,
    url: string,
    genre: string,
    click(iframeData: IframeProps): void
}

export const Song = ({enriched, youtube, artist, song, click, genre, url}: SongProps) => {
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
