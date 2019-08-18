import React from 'react';
import { Button } from 'semantic-ui-react'

const openInNewTab = (url: string) => {
    var win: any = window.open(url, '_blank');
    win.focus();
}

type IframeSubstituteProps = {
    url: string;
}

export const IframeSubstitute = ({url}: IframeSubstituteProps) => {
    return (<div className="iframe-music-player">
        { url && <Button className="iframe-music-player-button" onClick={() => openInNewTab(url)} variant="contained">
            <h2>Open Youtube</h2>
        </Button>}

        {! url && <Button className="iframe-music-player-button" disabled variant="contained">
            <h2>Click a song</h2>
        </Button>}
        
    </div>)
}