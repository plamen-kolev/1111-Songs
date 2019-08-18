import React from 'react';
import { IframeSubstitute } from "./IframeSubstitute";
import { YoutubeInterface } from '../../utils'

let iframe

export type IframeProps = {
  url: string,
  title: string,
  youtube: YoutubeInterface
}

export const Iframe = ({url, youtube, title}: IframeProps) => {
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
    if(!source) {
      iframe = (<IframeSubstitute url={url}/>)
    } else {
      iframe = (<iframe 
          title={title}
          height={"100%"}
          src={source}
          frameBorder="0" 
          allow="autoplay; encrypted-media; picture-in-picture" 
          allowFullScreen>
      </iframe>)
    }

    return (
      <div>
        {iframe}
    </div>)
}