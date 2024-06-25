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

    // Method for toggling theme
    const toggleTheme = () => {
        // Call Set Theme, if prev is light then dark.
        // Calls setTheme -> the parameter is in use State so always the previously saved one.
        // the cahnge in 'theme' means that the useEffect is called
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }


    return (
        <ThemeContext.Provider value = {{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};

export {ThemeContext, ThemeProvider};

