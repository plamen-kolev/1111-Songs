import React, {useState} from "react";
import {Card} from "semantic-ui-react";
import { IJsonSong } from "../../utils";
import {LikeDislikeComponent} from "./LikeDislikeComponent";
import {TooltipComponent} from "./TooltipComponent";

interface SongProps {
    active: boolean;
    liked: boolean | undefined;
    setActiveSong(song: IJsonSong): void;
    click(song: IJsonSong): void;
    song: IJsonSong;

}

export const Song = React.memo((props: SongProps) => {

    const [liked, setLiked] = useState(props.liked);

    let classes = "song-card";
    if (props.active) {
        classes += " active";
    }
    return (
        <Card className={classes} >
            <Card.Content data-testid="song-card-clickable" onClick={() => {
                props.setActiveSong(props.song);
                props.click(props.song);
            }}>
                <Card.Description className="song-card-title">
                    {props.song.title}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Card.Description className="song-card-meta">
                    {props.song.genre}
                    <span className="ui right floated ">
                        <TooltipComponent liked={liked} song={props.song}/>
                    </span>
                </Card.Description>
            </Card.Content>
            <span className="hide">
                <LikeDislikeComponent liked={liked} id={props.song.id} setLiked={setLiked} />
            </span>
        </Card>
    );
});
