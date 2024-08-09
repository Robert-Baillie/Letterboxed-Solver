import React, { useContext } from 'react';
import { Button} from 'reactstrap';


import './Root.css'; 

import Puzzle from './Puzzle/Puzzle';
import { ThemeContext, ThemeProvider } from '../contexts/ThemeContext';



function RootContent() {
  /* States and Contexts */
  const {theme, toggleTheme} = useContext(ThemeContext);
  

  return (
    <div className={`content ${theme}`}>
      <h1>Letterboxed Solver</h1>
      
      {/* Theme button - On click we want to call toggle theme from ThemeProvider located in ThemeContext */}
      <Button onClick={toggleTheme} className="btn-primary mt-3">Toggle Theme</Button>
      <br/>
      <Puzzle />
     
    </div>
  )
}


function Root() {
  
  return (
    // Use the Theme provider to supply into the Root Content - all theme
    <ThemeProvider>
      <RootContent />
    </ThemeProvider>

  );
}

export default Root;
