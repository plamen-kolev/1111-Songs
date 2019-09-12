import React from "react";
import { IframeSubstitute } from "./IframeSubstitute";
import { IJsonSong } from "utils";

let iframeComponent;

const hasComponentChanged = (currentProps: IIframeProps, nextProps: IIframeProps) => {
    return (currentProps !== nextProps);
};

export interface IIframeProps {
    autoplay: boolean;
    song: IJsonSong;
}

export const Iframe = React.memo<IIframeProps>((({song, autoplay}: IIframeProps) => {
    console.log("rendering");
    const autoplayValue = autoplay ? 1 : 0;
    let source;
    
    switch (song && song.kind) {
        case "youtube#video":
            source = `https://www.youtube.com/embed/${song.url}?autoplay=${autoplayValue}`;
            break;
        case "youtube#playlist":
            source = `https://www.youtube.com/embed/videoseries?list=${song.url}`;
            break;
        default:
            break;
    }
    
    if (!source) {
        iframeComponent = (<IframeSubstitute {...song} />);
    } else {
        iframeComponent = (<iframe
            title={song.title}
            height="150px"
            width="300px"
            src={source}
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
        >
        </iframe>);
    }

    return (
        <React.Fragment>
            {iframeComponent}
        </React.Fragment>
    );
}), hasComponentChanged);
