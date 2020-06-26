import React from 'react';
import rotator from './PleaseWait.svg';
import './PleaseWait.scss';

export default function PleaseWait(props) {

    return (
        <div className="PleaseWait">
            <div className="layout">
                <div 
                    className="rotator" 
                    style={{backgroundImage: 'url('+rotator+')'}} 
                />
            </div>
        </div>
    );

}
