import React, { useContext } from 'react';
import { Button} from 'reactstrap';


import './LetterboxedSolverPage.css'; 

import Puzzle from './Puzzle/Puzzle';
import { ThemeContext, ThemeProvider } from '../contexts/ThemeContext';



function PageContent() {
  /* States and Contexts */
  const {theme, toggleTheme} = useContext(ThemeContext);
  

  return (
    <div className={`content ${theme}`}>
      <h1>Letterboxed Solver</h1>
      
      {/* Theme button - On click we want to call toggle theme from ThemeProvider located in ThemeContext */}
      <Button onClick={toggleTheme} 
              className='btn-theme-toggle'
              title="Toggle Theme">
                {theme === 'light'  ? '🌙' : '🌞'}
        </Button>
        
      <br/>
      <Puzzle />
     
    </div>
  )
}


function LetterboxedSolverPage() {
  
  return (
    // Use the Theme provider to supply into the Page Content - all theme
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>

  );
}

export default LetterboxedSolverPage;
