import React, {useState} from "react";
import {Card} from "semantic-ui-react";
import { IYoutubeInterface } from "../../utils";
import { IIframeProps } from "./IframeComponent";
import {LikeDislikeComponent} from "./LikeDislikeComponent";
import {TooltipComponent} from "./TooltipComponent";

export interface ISongProps {
    unique_id: string;
    enriched: boolean;
    youtube?: IYoutubeInterface;
    artist: string;
    song: string;
    url: string;
    genre: string;
    liked?: boolean | undefined;
    active: boolean;
    click(iframeData: IIframeProps): void;
    setActiveSong(id: string): void;
}

export const Song = React.memo((song: ISongProps) => {

    const [liked, setLiked] = useState(song.liked);

    const isEnriched = song.enriched && song.youtube;
    const title = (isEnriched && song.youtube) ? song.youtube.snippet.title : `${song.artist} - ${song.song}`;

    let classes = "song-card";
    if (song.active) {
        classes += " active";
    }
    return (
        <Card className={classes} >
            <Card.Content data-testid="song-card-clickable" onClick={() => {
                song.setActiveSong(song.unique_id);
                song.click({
                    title,
                    url: song.url,
                    youtube: song.youtube,
                } as IIframeProps);
            }}>
                <Card.Description className="song-card-title">
                    {title}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Card.Description className="song-card-meta">
                    {song.genre}
                    <span className="ui right floated ">
                        <TooltipComponent liked={liked} youtube={song.youtube}/>
                    </span>
                </Card.Description>
            </Card.Content>
            <span className="hide">
                <LikeDislikeComponent liked={liked} unique_id={song.unique_id} setLiked={setLiked} />
            </span>
        </Card>
    );
});
