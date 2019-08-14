import React from 'react';
import Iframe from './Iframe';
import IframeSubstitute from './IframeSubstitute';
import { Typography, Divider } from '@material-ui/core';
import {useStyles} from '../../utils/cssUtils';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';

const openInNewTab = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
}

export default function (props) {
    const isEnriched = props.enriched && props.youtube
    const title = isEnriched ? props.youtube.snippet.title : `${props.artist} - ${props.song}`
    const classes = useStyles();
    
    return (
        <Card className={classes.card}>
            <CardActionArea onClick={() => openInNewTab(props.url)}>
                <CardContent>
                    <Typography className={classes.title} style={{minHeight: '110px', fontSize: '1.5em'}} gutterBottom>
                        {title}
                        {/* <a href={props.url}>{title}</a> */}
                        {/* {isEnriched ? <Iframe {...props.youtube}/> : <IframeSubstitute />} */}
                    </Typography>
                </CardContent>
                <Divider className={"MuiDivider-root"} light />
                <CardActions>
                    { isEnriched && <Typography ><i style={{"fontSize": "1.3em", "marginTop": "5px"}} class="material-icons">timeline</i></Typography> }
                    <Typography style={{"fontSize": "1.2em"}}>{props.genre}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>

          
    );
}