import React from 'react';
import {useStyles} from '../../utils/cssUtils';
import Button from '@material-ui/core/Button';

const openInNewTab = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
}

export default function ({url}) {
    const classes = useStyles();
    
    return (<div width="100%" height="150px" style={{ backgroundColor: '#333', height: '150px', width: '100%'}}>
        
        { url && <Button onClick={() => openInNewTab(url)} style={{marginTop: "26px"}} variant="contained" className={classes.button}>
            <h2>Open Youtube</h2>
        </Button>}

        {! url && <Button disabled style={{marginTop: "26px"}} variant="contained" className={classes.button}>
            <h2>Click a song</h2>
        </Button>}
        
    </div>)
}