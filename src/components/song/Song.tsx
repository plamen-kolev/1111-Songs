import React from "react";
import LazyLoad from "react-lazyload";
import {Card, Icon, Popup} from "semantic-ui-react";
import { IYoutubeInterface } from "../../utils";
import { IIframeProps } from "./Iframe";
import {SongLoading} from "./SongLoading";

export interface ISongProps {
    enriched: boolean;
    youtube?: IYoutubeInterface;
    artist: string;
    song: string;
    url: string;
    genre: string;
    click(iframeData: IIframeProps): void;
}

export const Song = React.memo(({enriched, youtube, artist, song, click, genre, url}: ISongProps) => {
    const isEnriched = enriched && youtube;
    const title = (isEnriched && youtube) ? youtube.snippet.title : `${artist} - ${song}`;

    let enrichedTooltip;
    if (isEnriched) {
        enrichedTooltip = <Popup content="This song is embedded" trigger={
            <Icon color="grey" name="sound"/>
        } />;
    } else {
        enrichedTooltip = <Popup content="This song is not embedded" trigger={
            <Icon color="grey" name="external alternate"/>
        } />;
    }
    return (
        <LazyLoad overflow once={true} throttle={100} height={1000} placeholder={<SongLoading/>} >
            <Card className="song-card" onClick={() => click({
                title,
                url,
                youtube,
            } as IIframeProps)}>
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
                            <Popup content="Playlists cannot be autoplayed yet" trigger={
                                <Icon color="grey" name="question circle"/>
                            } />}
                        </span>

                    </Card.Description>
                </Card.Content>
            </Card>
        </LazyLoad>
    );
});
