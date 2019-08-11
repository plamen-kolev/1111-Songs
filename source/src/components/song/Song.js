import React from 'react';

export default function (props) {
    return (
        <div key={props.unique_id}>
            <p><a href={props.url}>{`${props.artist} - ${props.song} ${props.year}`}</a></p>
        </div>
    );
}