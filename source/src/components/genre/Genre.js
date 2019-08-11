import React from 'react';
import Song from '../song/Song';

export default function (props) {
    return (
        <div>
            <h2>{props.title}</h2>
            {props.songs.map(song => <Song {...song}/>)}
        </div>
    );
}