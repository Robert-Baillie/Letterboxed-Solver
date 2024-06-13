import React from 'react';
import { handleLoadLettersClick } from '../utils/buttonHandlers';
import Button from './Button/Button';
import Puzzle from './LetterboxedSolver/Puzzle';

/* For now this is the page which will be added onto the website - this needs to be redirected to a 'Letterboxed Solver' component in the future */



function Root() {

 

  return (
    <div>
      <h1>Letterboxed Solver</h1>
      
      <Button text = "Fill With Todays Puzzle - TO DO!" onClick={handleLoadLettersClick} />

      <Puzzle></Puzzle>
</div>

  );
}

export default Root;
