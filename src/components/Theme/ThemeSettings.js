import React, {useContext, useState} from 'react';
import { Button} from 'reactstrap';

import { ThemeContext } from '../../contexts/ThemeContext'
import ThemeColourPicker from './ThemeColourPicker';

import './ThemeSettings.css'


function ThemeSettings() {
    /***********  Context  ***********/
    const {theme, setThemeMode} = useContext(ThemeContext);

    /***********  States  ***********/
    const [isMenuOpen, setIsMenuOpen]= useState(false);
    

    /******* Functions ************/
    // Menu - simply switch depending on the previous
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    }

    // Toggle theme - used from switching to light and dark
    const toggleTheme = () =>{
        setThemeMode((theme ==='dark' || theme === 'custom') ? 'light' : 'dark')
    }

    return (
        <div className='theme-settings-container'>
            {/* Button for toggling the theme - if it is on dark then go to light */}
            <Button onClick={toggleTheme} 
                color = "secondary"
                className='btn-theme-toggle'
                title="Toggle Theme">
                {(theme === 'dark' || theme === 'custom')  ? '🌞' : '🌙'}
            </Button>


            {/* Menu expanding button */}
            <div className="theme-dropdown">
                {/* Dropdown button to expand section - if open show a collapse symbol */}
                <Button onClick={toggleMenu} color = "secondary" className="theme-dropdown-btn">
                {isMenuOpen ? '-' : '+'}
                </Button>
                {/* If Menu is open then show the theme colour picker*/}
                {isMenuOpen && (
                   <ThemeColourPicker setThemeMode = {setThemeMode}></ThemeColourPicker>
                )}
            </div>
            
        </div>
      );
}

export default ThemeSettings;

