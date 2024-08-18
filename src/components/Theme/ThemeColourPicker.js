import React, {useState} from 'react';
import { Container} from 'reactstrap';

// Wheel from React-Color: https://uiwjs.github.io/react-color
import Wheel from '@uiw/react-color-wheel';

function ThemeColourPicker({ setThemeMode}) {
    /**** States ****/
    // Set hex wheel centered - white
    const [hex, setHex] = useState("#fff");


    // Set the Colours to a random default
    const [colours, setColours] = useState({
        background: '#cecea0',
        text:       '#000000',
        primary:    '#480337',
        secondary:  '#f1ecb1',
        accent:     '#e0079c',
    })


    // Variable for the Selected Colour on the wheel
    const [selectedColour, setSelectedColour] = useState(null);

    /*********** Functions ************/
     // Function to handle color change - need to pass the currently selected colour too.
     const handleColorChange = (color) => {
        const hex = color.hex;
        setHex(hex);

        // If a colour is selected - change the previous colour
        if(selectedColour) {
            setColours(prevColours => ({
                ...prevColours,
                [selectedColour]: hex
            }));
        }

        toggleThemeCustom()
    };



    // Set the custom theme - calls on seThemeMode supplied by the state in ThemeSettings
    const toggleThemeCustom = ()=>  {

        // Define the custom css code to add
        const customCss = `
        body.custom {
            --background: ${colours.background};
            --text: ${colours.text};
            --primary: ${colours.primary};
            --secondary: ${colours.secondary};
            --accent: ${colours.accent};
            }
        `;

        // Clean up - check if a custom already exists - if so remove it
        // Below the define the style to be data-theme so use again to remove
        const existingStle = document.querySelector('style[data-theme="custom"]')
        if(existingStle) existingStle.remove();

        // Create a new style and append on
        const style = document.createElement('style');
        style.textContent = customCss;
        style.setAttribute('data-theme', 'custom') // defined style, used for cleanup
        document.head.appendChild(style);

        // Set the theme
        setThemeMode('custom');
    }

    /*** JSX RETURN ***/
    return (
        <Container className = "theme-colour-picker-container">
            <p>Custom Theme Picker</p>
            {/*// Wheel and 5 smaller circles labelled to each of their corresponding data
            // They are: Primary, Secondary, Background, Text, Accent.*/}
            <Wheel
                className='theme-colour-picker'
                color={hex}
                onChange={handleColorChange}
            />

            {/* Circles to show each of the colours - loop over the colours container and print a circle with that background */}
            <div className = "colours-container">
                {Object.entries(colours).map(([key, colour]) => (
                    <div key = {key} 
                        className = {`colour-circle-wrapper ${selectedColour === key ? 'selected' : ''}`}
                        onClick={() => { setSelectedColour(key); console.log(key);}}
                    >
                        <div className='colour-circle' style = {{backgroundColor: colour}}></div>
                        <p className ='colour-circle-text'>{key.toUpperCase()}</p>
                    </div>
                    )
                )}
            </div>
                

        </Container>
      );
}

export default ThemeColourPicker;

