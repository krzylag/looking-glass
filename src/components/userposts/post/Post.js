import React from 'react';

export default function Post(props) {
    
    if (typeof props.data === 'undefined') return '';

    return (
        <div>
            <h3>{props.data.title}</h3>
            <div>{props.data.body}</div>
        </div>
    )
}