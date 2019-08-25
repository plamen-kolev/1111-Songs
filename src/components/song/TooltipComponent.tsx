import React from "react";
import {Icon, Popup} from "semantic-ui-react";
import {IYoutubeInterface} from "../../utils";

interface ITooltip {
    liked: boolean | undefined;
    youtube: IYoutubeInterface | undefined;
}

export const TooltipComponent = ({liked, youtube}: ITooltip) => {

    return (
        <>
            {youtube &&
                <Popup content="This song is embedded" trigger={
                    <Icon data-testid="embedded-song" color="grey" name="sound"/>
                }/>
            }
            < Icon
                data-testid="embedded-like-dislike-song"
                color={(liked && "green") || (liked === undefined && "grey") || "red"}
                name={(liked && "thumbs up") || (liked === undefined && "caret down") || "thumbs down"}/>
            {!youtube &&
                <Popup content="This song is not embedded" trigger={
                    <Icon data-testid="not-embedded-song-tooltip" color="grey" name="external alternate"/>
                } />
            }
        </>
    );
};
