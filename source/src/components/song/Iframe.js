import React from 'react';

export default function (props) {
    let source;
    switch(props.id.kind) {
        case "youtube#video":
          source = `https://www.youtube.com/embed/${props.id.videoId}`
          break;
        case "youtube#playlist":
            source = `https://www.youtube.com/embed/videoseries?list=${props.id.playlistId}`
          break;
        default:
          // code block
      }

    return (<iframe 
        width="100%" 
        height="150px" 
        src={source}
        frameborder="0" 
        allow="autoplay; encrypted-media; picture-in-picture" 
        allowfullscreen>
    </iframe>)
}