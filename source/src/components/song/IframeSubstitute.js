import React from 'react';
import { Button } from 'semantic-ui-react'

const openInNewTab = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
}

export default function ({url}) {
    return (<div className="iframe-music-player">
        { url && <Button className="iframe-music-player-button" onClick={() => openInNewTab(url)} variant="contained">
            <h2>Open Youtube</h2>
        </Button>}

        {! url && <Button className="iframe-music-player-button" disabled variant="contained">
            <h2>Click a song</h2>
        </Button>}
        
    </div>)
}