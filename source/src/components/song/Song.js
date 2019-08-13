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
                <Typography className={classes.title} style={{minHeight: '100px', fontSize: '14px'}} color="textSecondary" gutterBottom>
                    {title}
                                        {/* {isEnriched && <img alt={props.youtube.title} src={props.youtube.snippet.thumbnails.default.url}/>} */}
                    {/* <a href={props.url}>{title}</a> */}
                    {/* {isEnriched ? <Iframe {...props.youtube}/> : <IframeSubstitute />} */}
                </Typography>
            </CardContent>
            <CardActions>
                <Typography style={{fontSize: '10px'}} size="small">{props.genre}</Typography>
            </CardActions>
        </Card>

          
    );
}