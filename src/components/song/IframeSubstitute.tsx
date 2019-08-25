import React from "react";
import { Button } from "semantic-ui-react";

const openInNewTab = (url: string) => {
    const win: any = window.open(url, "_blank");
    win.focus();
};

interface IIframeSubstituteProps {
    url: string;
    title: string;
}

export const IframeSubstitute = ({url, title}: IIframeSubstituteProps) => {
    return (
        <div className="fake-iframe-music-player">
            { url && <Button className="iframe-music-player-button" onClick={() => openInNewTab(url)} variant="contained">
                <p>Open "{title}" on youtube</p>
            </Button>}

            {! url && <Button className="fake-iframe-music-player-button" disabled variant="contained">
                <p>Click a song</p>
            </Button>}

        </div>);
};
