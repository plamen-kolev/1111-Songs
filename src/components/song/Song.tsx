import React from "react";
import {Button, Card, Icon, Popup} from "semantic-ui-react";
import { IYoutubeInterface } from "../../utils";
import { IIframeProps } from "./Iframe";

export interface ISongProps {
    unique_id: string,
    enriched: boolean;
    youtube?: IYoutubeInterface;
    artist: string;
    song: string;
    url: string;
    genre: string;
    click(iframeData: IIframeProps): void;
}

export const Song = React.memo(({enriched, youtube, artist, song, click, genre, url, unique_id}: ISongProps) => {
    const isEnriched = enriched && youtube;
    const title = (isEnriched && youtube) ? youtube.snippet.title : `${artist} - ${song}`;

    const like = (songId: string, liked: boolean) => {
        alert("song liked, feature not implemented yet" + song)
    }

    const dislike = (songId: string, liked: boolean) => {
        alert("song disliked, feature not implemented yet" + song)

    }

    let enrichedTooltip;
    if (isEnriched) {
        enrichedTooltip = <>
            <Popup content="This song is embedded" trigger={
                <Icon data-testid="embedded-song" color="grey" name="sound"/>

            } />
            {youtube && youtube.id.kind === "youtube#playlist" &&
            <Popup content="Playlists cannot be autoplayed yet" trigger={
                <Icon data-testid="cant-autoplay" color="grey" name="question circle"/>
            } />}
        </>;
    } else {
        enrichedTooltip = <Popup content="This song is not embedded" trigger={
            <Icon data-testid="not-embedded-song-tooltip" color="grey" name="external alternate"/>
        } />;
    }

    return (
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
                        </span>
                </Card.Description>
            </Card.Content>
            <span className="hide">
                <Card.Content extra>
                    <div className="ui two buttons">
                        <Button onClick={() => like(unique_id, true)} basic color="green">
                            Like
                        </Button>
                        <Button onClick={() => dislike(unique_id, false)} basic color="red">
                            Dislike
                        </Button>
                    </div>
                </Card.Content>
            </span>
        </Card>
    );
});
