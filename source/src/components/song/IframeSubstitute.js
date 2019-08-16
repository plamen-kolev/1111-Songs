import React from 'react';
import { Button } from 'semantic-ui-react'

const openInNewTab = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
}

export default function ({url}) {
    return (<div height="150px">
        { url && <Button onClick={() => openInNewTab(url)} style={{marginTop: "26px"}} variant="contained">
            <h2>Open Youtube</h2>
        </Button>}

        {! url && <Button disabled style={{marginTop: "26px"}} variant="contained">
            <h2>Click a song</h2>
        </Button>}
        
    </div>)
}