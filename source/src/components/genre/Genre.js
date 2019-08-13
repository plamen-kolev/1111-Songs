import React from 'react';
import Song from '../song/Song';
import {useStyles} from '../../utils/cssUtils';
import Typography from '@material-ui/core/Typography';

export default function (props) {
    const classes = useStyles();
    return (
        <div>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.title}
            </Typography>
            
            {props.songs.map(song => 
                <Song {...song}/>
            )}
        </div>
    );
}