import React from "react";
import {Icon, Popup} from "semantic-ui-react";
import {SongType} from "./Song";

interface ITooltip {
    liked: boolean | undefined;
    kind: SongType;
}

export const TooltipComponent = ({liked, kind}: ITooltip) => {
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
            {kind !== "none" &&
                <Popup content="This song is embedded" trigger={
                    <Icon data-testid="embedded-song" color="grey" name="sound"/>
                }/>
            }
            < Icon
                data-testid="embedded-like-dislike-song"
                color={color}
                name={likedStatus}/>
            {kind === "none" &&
                <Popup content="This song is not embedded" trigger={
                    <Icon data-testid="not-embedded-song-tooltip" color="grey" name="external alternate"/>
                } />
            }
        </>
    );
};
