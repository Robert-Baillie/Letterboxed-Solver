import React, {createContext, useState, useEffect } from 'react'


// Create Context from React
const ThemeContext = createContext();

// Create Theme Provider, function body which takes in 'children' as props
const ThemeProvider = ({ children }) => {
    // Hook onto use state, call set theme 
    const [theme, setTheme] = useState('light');   
    
    // Hook onto Use Effect - change the state of the class name
    // Listens to any change in 'Theme'
    useEffect(() => {
        document.body.className = theme; // Set Class of body based on theme
    }, [theme]);

    // Method for setting theme
    const setThemeMode = (newTheme) => {
        setTheme(newTheme);
    }


    return (
        <ThemeContext.Provider value = {{theme, setThemeMode}}>
            {children}
        </ThemeContext.Provider>
    )
};

export {ThemeContext, ThemeProvider};

