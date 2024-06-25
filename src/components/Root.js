import React, { useContext } from 'react';
import { handleLoadLettersClick } from '../utils/buttonHandlers';
import Puzzle from './Puzzle/Puzzle';

import { Button} from 'reactstrap';
import { ThemeContext, ThemeProvider } from '../contexts/ThemeContext';

/* For now this is the page which will be added onto the website - this needs to be redirected to a 'Letterboxed Solver' component in the future */

// Test
function RootContent() {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <div className={`content ${theme}`}>
      <h1>Letterboxed Solver</h1>
      <Button onClick={toggleTheme} className="btn-primary mt-3">Toggle Theme</Button>
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
