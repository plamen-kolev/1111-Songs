import React from 'react';
import {Card, Icon, Popup} from 'semantic-ui-react'
import { YoutubeInterface } from '../../utils'
import { IframeProps } from './Iframe';
import {SongLoading} from "./SongLoading";
import LazyLoad from "react-lazyload";

export type SongProps = {
    enriched: boolean,
    youtube: YoutubeInterface,
    artist: string,
    song: string,
    url: string,
    genre: string,
    click(iframeData: IframeProps): void,
}


export const Song = React.memo(({enriched, youtube, artist, song, click, genre, url}: SongProps) => {
    const isEnriched = enriched && youtube;
    const title = isEnriched ? youtube.snippet.title : `${artist} - ${song}`;

    let enrichedTooltip;
    if(isEnriched) {
        enrichedTooltip = <Popup content='This song is embedded' trigger={
            <Icon color="grey" name="sound"/>
        } />
    } else {
        enrichedTooltip = <Popup content='This song is not embedded' trigger={
            <Icon color="grey" name="external alternate"/>
        } />
    }
    return (
        <LazyLoad overflow once={true} throttle={100} height={1000} placeholder={<SongLoading/>} >
            <Card className="song-card" onClick={() => click({
                url,
                title,
                youtube,
            })}>
                <Card.Content>
                    <Card.Description className="song-card-title">
                        {title}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Card.Description className="song-card-meta">
                        {genre}
                        <span className="ui right floated ">
                            {enrichedTooltip}
                            {youtube && youtube.id.kind === "youtube#playlist" &&
                            <Popup content='Playlists cannot be autoplayed yet' trigger={
                                <Icon color="grey" name="question circle"/>
                            } />}
                        </span>


                    </Card.Description>
                </Card.Content>
            </Card>
        </LazyLoad>
    );
});
