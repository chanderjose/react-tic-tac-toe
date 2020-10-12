import React from 'react';

import ThemeSelector from './ThemeSelector';

export default function Header(props) {
    return (
        <header className="Header">
            <ThemeSelector
                theme={props.theme}
                onSelectTheme={props.onSelectTheme} />
            <h1>{props.title1}</h1>
            <h2>{props.title2}</h2>
        </header>
    );
}