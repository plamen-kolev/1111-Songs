import React from 'react';

const generateIframe = (songId) => {
    return (<iframe 
        width="560" 
        height="315" 
        src={`https://www.youtube.com/embed/${songId}`}
        frameborder="0" 
        allow="autoplay; encrypted-media; picture-in-picture" 
        allowfullscreen>
    </iframe>)
}

export default function (props) {
    const isEnriched = props.enriched
    const title = isEnriched ? props.youtube.snippet.title : `${props.artist} - ${props.song}`

    return (
        <div key={props.unique_id}>
            <p><a href={props.url}>{title}</a></p>
            {isEnriched ? generateIframe(props.youtube.id.videoId) : 'Embedded youtube video missing'}
        </div>
    );
}