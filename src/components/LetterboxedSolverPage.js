import React from 'react';



import './LetterboxedSolverPage.css'; 

import ThemeSettings from './Theme/ThemeSettings';
import Puzzle from './Puzzle/Puzzle';
import {   ThemeProvider } from '../contexts/ThemeContext';



function PageContent() {
 
  

  return (
    <div className={`letterboxed-page-content`}>
      <h1>Letterboxed Solver</h1>
       
      <ThemeSettings />
       
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
