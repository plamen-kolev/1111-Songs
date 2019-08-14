import React from 'react';
import Iframe from './Iframe';
import IframeSubstitute from './IframeSubstitute';
import { Typography, Divider } from '@material-ui/core';
import {useStyles} from '../../utils/cssUtils';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

export default function (props) {
    const isEnriched = props.enriched && props.youtube
    const title = isEnriched ? props.youtube.snippet.title : `${props.artist} - ${props.song}`
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} style={{minHeight: '90px', fontSize: '1em'}} color="textSecondary" gutterBottom>
                    {title}
                    {/* <a href={props.url}>{title}</a> */}
                    {/* {isEnriched ? <Iframe {...props.youtube}/> : <IframeSubstitute />} */}
                    
                </Typography>
            </CardContent>
            <Divider className={"MuiDivider-root"} light />
            <CardActions>
                <Typography ><a rel="noopener noreferrer" target="_blank" href={props.url}><i style={{"fontSize": "1.3em", "marginTop": "5px"}} class="material-icons">launch</i></a></Typography>
                <Typography style={{"fontSize": "0.8em"}}>{props.genre}</Typography>
            </CardActions>
        </Card>

          
    );
}