import React from "react";
import { IYoutubeInterface } from "../../utils";
import { IframeSubstitute } from "./IframeSubstitute";

let iframe;

export interface IIframeProps {
    unique_id: string;
    url: string;
    title: string;
    autoplay?: boolean;
    youtube: IYoutubeInterface;
}

const hasComponentChanged = (currentProps: IIframeProps, nextProps: IIframeProps) => {
    return (currentProps.youtube === nextProps.youtube && currentProps.url === nextProps.url);
};

export const Iframe = React.memo<IIframeProps>((({url, youtube, title, autoplay}: IIframeProps) => {
    const autoplayValue = autoplay ? 1 : 0;
    let source;
    if (youtube && youtube.id && youtube.id.kind) {
        switch (youtube.id.kind) {
            case "youtube#video":
                source = `https://www.youtube.com/embed/${youtube.id.videoId}?autoplay=${autoplayValue}`;
                break;
            case "youtube#playlist":
                source = `https://www.youtube.com/embed/videoseries?list=${youtube.id.playlistId}`;
                break;
            default:
                break;
        }
    }
    if (!source) {
        iframe = (<IframeSubstitute title={title} url={url}/>);
    } else {
        iframe = (<iframe
            title={title}
            height="100px"
            width="220px"
            src={source}
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
        >
        </iframe>);
    }

    return (
        <React.Fragment>
            {iframe}
        </React.Fragment>
    );
}), hasComponentChanged);
