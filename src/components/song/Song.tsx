import React, {useState} from "react";
import {Card} from "semantic-ui-react";
import { IIframeProps } from "./IframeComponent";
import {LikeDislikeComponent} from "./LikeDislikeComponent";
import {TooltipComponent} from "./TooltipComponent";

export enum SongType {
    none= "none", playlist = "youtube#playlist", song = "youtube#song",
}

export interface ISongProps {
    active: boolean;
    genre: string;
    id: number;
    kind: SongType;
    liked?: boolean | undefined;
    title: string;
    url: string;
    click(iframeData: IIframeProps): void;
    setActiveSong(id: number): void;
}

export const Song = React.memo((song: ISongProps) => {

    const [liked, setLiked] = useState(song.liked);

    let classes = "song-card";
    if (song.active) {
        classes += " active";
    }
    return (
        <Card className={classes} >
            <Card.Content data-testid="song-card-clickable" onClick={() => {
                song.setActiveSong(song.id);
                song.click({
                    title: song.title,
                    url: song.url,
                    kind: song.kind,
                } as IIframeProps);
            }}>
                <Card.Description className="song-card-title">
                    {song.title}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Card.Description className="song-card-meta">
                    {song.genre}
                    <span className="ui right floated ">
                        <TooltipComponent liked={liked} kind={song.kind}/>
                    </span>
                </Card.Description>
            </Card.Content>
            <span className="hide">
                <LikeDislikeComponent liked={liked} id={song.id} setLiked={setLiked} />
            </span>
        </Card>
    );
});
