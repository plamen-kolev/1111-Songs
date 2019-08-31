import React from "react";
import { IframeSubstitute } from "./IframeSubstitute";

let iframeComponent;

export interface IIframeProps {
    id: number;
    url: string;
    title: string;
    autoplay?: boolean;
    kind: string;
}

const hasComponentChanged = (currentProps: IIframeProps, nextProps: IIframeProps) => {
    return (currentProps.title === nextProps.title && currentProps.url === nextProps.url);
};

export const Iframe = React.memo<IIframeProps>((({url, kind, title, autoplay}: IIframeProps) => {
    const autoplayValue = autoplay ? 1 : 0;
    let source;
    if (kind) {
        switch (kind) {
            case "youtube#video":
                source = `https://www.youtube.com/embed/${url}?autoplay=${autoplayValue}`;
                break;
            case "youtube#playlist":
                source = `https://www.youtube.com/embed/videoseries?list=${url}`;
                break;
            default:
                break;
        }
    }
    if (!source) {
        iframeComponent = (<IframeSubstitute title={title} url={url}/>);
    } else {
        iframeComponent = (<iframe
            title={title}
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
