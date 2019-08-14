import React from 'react';
import Iframe from './Iframe';
import IframeSubstitute from './IframeSubstitute';
import { Typography } from '@material-ui/core';
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
                <Typography className={classes.title} style={{minHeight: '80px', fontSize: '12px'}} color="textSecondary" gutterBottom>
                    {title}
                    {/* <a href={props.url}>{title}</a> */}
                    {/* {isEnriched ? <Iframe {...props.youtube}/> : <IframeSubstitute />} */}
                    
                </Typography>
            </CardContent>
            <CardActions>
                <Typography style={{fontSize: '10px'}}><a rel="noopener noreferrer" target="_blank" href={props.url}><i class="material-icons">open_in_browser</i></a></Typography>
                <Typography style={{fontSize: '10px'}}>{props.genre}</Typography>
            </CardActions>
        </Card>

          
    );
}