import React from 'react';
import Iframe from './Iframe';

export default function (props) {
    const isEnriched = props.enriched
    const title = isEnriched ? props.youtube.snippet.title : `${props.artist} - ${props.song}`

    return (
        <div key={props.unique_id}>
            {isEnriched && <img alt={props.youtube.title} src={props.youtube.snippet.thumbnails.default.url}/>}
            <p><a href={props.url}>{title}</a></p>
            {isEnriched && <Iframe {...props.youtube}/>}
        </div>
    );
}