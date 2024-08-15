import React, {useState} from 'react';
import { Button, Container} from 'reactstrap';

// Wheel from React-Color: https://uiwjs.github.io/react-color
import Wheel from '@uiw/react-color-wheel';

function ThemeColourPicker({ setThemeMode}) {
    /**** States ****/
    // Set hex wheel centered - white
    const [hex, setHex] = useState("#fff");

    

    /*********** Functions ************/
     // Function to handle color change
     const handleColorChange = (color) => {
        setHex(color.hex);
    };

    // Set the custom theme - calls on seThemeMode supplied by the state in ThemeSettings
    const toggleThemeCustom = ()=>  {
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
                onChange={(color) => {
                setHex(color.hex);
                }}
            />

            

           {/* Button To Set Custom Theme */}
           <Button onClick={toggleThemeCustom} 
                color = "primary"
                className='btn-set-custom-theme'
                title="Apply Theme">
                {'Apply'}
            </Button>
        </Container>
      );
}

export default ThemeColourPicker;

