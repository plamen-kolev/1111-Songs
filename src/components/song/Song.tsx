import React, {useState} from "react";
import {Button, Card, Icon, Popup} from "semantic-ui-react";
import { IYoutubeInterface } from "../../utils";
import {save} from "../../utils/localStorage";
import { IIframeProps } from "./Iframe";

export interface ISongProps {
    unique_id: string;
    enriched: boolean;
    youtube?: IYoutubeInterface;
    artist: string;
    song: string;
    url: string;
    genre: string;
    liked?: boolean | undefined;
    click(iframeData: IIframeProps): void;
}

export const Song = React.memo((song: ISongProps) => {

    const [liked, setLiked] = useState(song.liked);

    const isEnriched = song.enriched && song.youtube;
    const title = (isEnriched && song.youtube) ? song.youtube.snippet.title : `${song.artist} - ${song.song}`;

    const like = (likedSong: any) => {
        setLiked(likedSong.liked);
        save(likedSong);
    };

    const dislike = (dislikedSong: any) => {
        setLiked(dislikedSong.liked);
        save(dislikedSong);
    };

    let enrichedTooltip;
    if (isEnriched) {
        enrichedTooltip = <>
            <Popup content="This song is embedded" trigger={
                <Icon data-testid="embedded-song" color="grey" name="sound"/>
            } />

            <Icon
                data-testid="embedded-like-dislike-song"
                color={(liked && "green") || (liked === undefined && "grey") || "red"}
                name={(liked && "thumbs up") || (liked === undefined && "caret down") || "thumbs down"}/>

            {song.youtube && song.youtube.id.kind === "youtube#playlist" &&
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
        <Card color={(liked === false && "red") || (liked === true && "green") || undefined}  className="song-card" >
            <Card.Content onClick={() => song.click({
                title,
                url: song.url,
                youtube: song.youtube,
            } as IIframeProps)}>
                <Card.Description className="song-card-title">
                    {title}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Card.Description className="song-card-meta">
                    {song.genre}
                    <span className="ui right floated ">
                        {enrichedTooltip}
                    </span>
                </Card.Description>
            </Card.Content>
            <span className="hide">
                <Card.Content extra>
                    <div className="ui two buttons">
                        <Button basic={liked === false || liked === undefined}
                                onClick={() => like({unique_id: song.unique_id, liked: true})}
                                color="green">
                            Like
                        </Button>
                        <Button basic={liked === true || liked === undefined}
                                onClick={() => dislike({unique_id: song.unique_id, liked: false})}
                                color="red">
                            Dislike
                        </Button>
                    </div>
                </Card.Content>
            </span>
        </Card>
    );
});
