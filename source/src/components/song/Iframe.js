import React from 'react';
import IframeSubstitute from "./IframeSubstitute";

export default function ({url, youtube, title}) {
    let source;
    if(youtube && youtube.id && youtube.id.kind) {
      switch(youtube.id.kind) {
        case "youtube#video":
          source = `https://www.youtube.com/embed/${youtube.id.videoId}`
          break;
        case "youtube#playlist":
            source = `https://www.youtube.com/embed/videoseries?list=${youtube.id.playlistId}`
          break;
        default:
          break;
      }
    }
    console.log(source)
    if(!source) {
      console.log("have this")
      return (<IframeSubstitute url={url}/>)
    }
    return (<iframe 
        title={title}
        width="100%" 
        height="150px" 
        src={source}
        frameborder="0" 
        allow="autoplay; encrypted-media; picture-in-picture" 
        allowfullscreen>
    </iframe>)
}