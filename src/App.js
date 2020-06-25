import React from 'react';
import Search from './components/search/Search';

export default function App() {
    
    return (
        <div className="App">
            <h1>Project Looking Glass</h1>
            <h2>Check what Your employees are doing in their free time!</h2>
            <small>start typing to search for specific last name</small>
            <Search />
        </div>
    );
}

