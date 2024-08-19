import React, {useContext, useState, useRef, useEffect} from 'react';
import { Button} from 'reactstrap';

import { ThemeContext } from '../../contexts/ThemeContext'
import ThemeColourPicker from './ThemeColourPicker';

import './ThemeSettings.css'


function ThemeSettings() {
    /***********  Context  ***********/
    const {theme, setThemeMode} = useContext(ThemeContext);

    /***********  States  ***********/
    const [isMenuOpen, setIsMenuOpen]= useState(false);
    
    /****** Refs  ***************/
    const menuRef = useRef(null);

    /******* Functions ************/
    // Menu - simply switch depending on the previous
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    }

    // Toggle theme - used from switching to light and dark
    const toggleTheme = () =>{
        setThemeMode((theme ==='dark' || theme === 'custom') ? 'light' : 'dark')
    }

    // Handle clicks outside of the dropdown menu
    const handleClickOutside = (event) => {
        console.log("Handle Click - Theme Settings")
        if(menuRef.current && !menuRef.current.contains(event.target))
            {   
                console.log("Here");
                setIsMenuOpen(false);
            }
    }


    /*********** Use Effect Hooks *************/
    // Attatch an event listener - mousedown
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

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
            <div className="theme-dropdown"  ref = {menuRef} >
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

