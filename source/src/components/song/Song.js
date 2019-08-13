import React from 'react';
import Iframe from './Iframe';
import IframeSubstitute from './IframeSubstitute';

export default function (props) {
    const isEnriched = props.enriched
    const title = isEnriched ? props.youtube.snippet.title : `${props.artist} - ${props.song}`

    return (

        <div key={props.unique_id}>
            <p>
                {/* {isEnriched && <img alt={props.youtube.title} src={props.youtube.snippet.thumbnails.default.url}/>} */}
                <a href={props.url}>{title}</a>
                {isEnriched ? <Iframe {...props.youtube}/> : <IframeSubstitute />}
            </p>
          </div>
    );
}