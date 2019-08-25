import React from "react";
import {Icon, Popup} from "semantic-ui-react";
import {IYoutubeInterface} from "../../utils";

interface ITooltip {
    liked: boolean | undefined;
    youtube: IYoutubeInterface | undefined;
}

export const TooltipComponent = ({liked, youtube}: ITooltip) => {
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
            {youtube &&
                <Popup content="This song is embedded" trigger={
                    <Icon data-testid="embedded-song" color="grey" name="sound"/>
                }/>
            }
            < Icon
                data-testid="embedded-like-dislike-song"
                color={color}
                name={likedStatus}/>
            {!youtube &&
                <Popup content="This song is not embedded" trigger={
                    <Icon data-testid="not-embedded-song-tooltip" color="grey" name="external alternate"/>
                } />
            }
        </>
    );
};
