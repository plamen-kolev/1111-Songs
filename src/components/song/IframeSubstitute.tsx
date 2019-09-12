import React from "react";
import { Button } from "semantic-ui-react";
import { IJsonSong } from "utils";

const openInNewTab = (url: string) => {
    const win: any = window.open(url, "_blank");
    win.focus();
};

export const IframeSubstitute = ({url, title}: IJsonSong) => {
    return (
        <>
            { url &&
            <div className="fake-iframe-music-player">
                <Button className="iframe-music-player-button" onClick={() => openInNewTab(url)} variant="contained">
                    <p>Open "{title}" on youtube</p>
                </Button>
            </div>}
        </>
    );
};
