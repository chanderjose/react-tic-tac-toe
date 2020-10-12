import React from 'react';

export default function ThemeSelector(props) {
    const {theme} = props;

    return (
        <div className="ThemeSelector">
            <input type="checkbox"
                id="theme-selector"
                checked={theme === 'dark'}
                onChange={(e) => {props.onSelectTheme(e.target.checked ? 'dark' : 'light')}} />
            <label htmlFor="theme-selector"></label>
        </div>
    );
}