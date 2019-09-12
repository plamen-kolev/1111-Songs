import React from "react";
import {Icon, Popup} from "semantic-ui-react";
import { IJsonSong } from "utils";

interface ITooltip {
    liked: boolean | undefined;
    song: IJsonSong
}

export const TooltipComponent = ({liked, song}: ITooltip) => {
    let likedStatus: "caret down" | "thumbs up" | "thumbs down" = "caret down";
    let color: "grey" | "green" | "red" = "grey";

    if (liked === true) {
        likedStatus = "thumbs up";
        color = "green";
    } else if (liked === false) {
        likedStatus = "thumbs down";
        color = "red";
    }

    return (
        <>
            
            <Popup content="This song is embedded" trigger={
                <Icon data-testid="embedded-song" color="grey" name="sound"/>
            }/>
        
            < Icon
                data-testid="embedded-like-dislike-song"
                color={color}
                name={likedStatus}/>
            
            <Popup content="This song is not embedded" trigger={
                <Icon data-testid="not-embedded-song-tooltip" color="grey" name="external alternate"/>
            } />
        
        </>
    );
};
