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
    click(iframeData: IIframeProps): void;
}

export const Song = React.memo((song: ISongProps) => {

    const [liked, setLiked] = useState(song.liked);

    const isEnriched = song.enriched && song.youtube;
    const title = (isEnriched && song.youtube) ? song.youtube.snippet.title : `${song.artist} - ${song.song}`;

    return (
        <Card className="song-card" >
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
