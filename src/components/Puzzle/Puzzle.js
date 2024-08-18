import React, { useState, useContext, useRef, useEffect   } from 'react';

import { Container, Alert, Button } from 'reactstrap';
import { ThemeContext } from '../../contexts/ThemeContext';

import '../LetterboxedSolverPage.css'

import { fetchLetterboxedLetters } from '../../utils/buttonHandlers';
import { areAllRowsPopulated, readFileIntoArray, canFormWordFromLetters, isValidWord, solveForTwoWords } from '../../utils/puzzleHelpers';

import wordsFilePath from '../../assets/words_hard.txt'

function Puzzle() {

  /************* Contexts *************/
  // Theme
  const { theme } = useContext(ThemeContext);

  /************* States *************/
  // Puzzle
  const [rows, setRows] = useState({
    top: ['', '',''],
    left: ['', '',''],
    right: ['', '',''],
    bottom: ['', '','']
  });

  // Define the solutions
  const [solutions, setSolutions] = useState([]);
  // Define the error message
  const [errorMessage, setErrorMessage] = useState('');
  // Use state alert to manage alert visibility
  const [showAlert, setShowAlert] = useState(false);

  /************* Refs *************/
  // Define a reference to results section - for automated scrolling
  const resultsRef = useRef(null);



  /******* Visual JSX ***********/
  const renderPuzzleVisual = (rows) => {
    // Define where circles will render on square container
    // index is either 0, 1, 2 based on the index of the row entry
    // 33.3 is a third, we want it to be place 1/6, 1/2 or 5/6 through the line
    const positions = {
      top: (index) => ({  
                    top: '0', 
                    left: `${index * 33.33 + 16.67}%`,
                    transform: 'translate(-50%, -50%)', // Up and Left to appear on the line
                    zIndex: 1 // Appear above the line
                    }),
      bottom: (index) => ({
                    bottom: '0',
                    left: `${index * 33.33 + 16.67}%`,
                    transform: 'translate(-50%, 50%)', // Move left and down
                    zIndex: 1,
                    }),
      left: (index) => ({
                    left: '0',
                    top: `${index * 33.33 + 16.67}%`,
                    transform: 'translate(-50%, -50%)', // Move left and up
                    zIndex: 1,
                    }),
                    right: (index) => ({
                    right: '0',
                    top: `${index * 33.33 + 16.67}%`,
                    transform: 'translate(50%, -50%)', // Move right and up
                    zIndex: 1,
                    }),
    };


    return (
      <div className = "puzzle-render-visual">
          {Object.keys(rows).map((side) =>
            rows[side].map((content, index) => (
              <div className = "input-circle" style ={positions[side](index)} key={`${side}-${index}` }>
                    <input
                    type="text"
                    value={content}
                    onChange={(e) => handleChange(side, index, e.target.value)}
                    className={`puzzle-input ${theme}`}
                    maxLength={1} // Restrict input to one character
                  />
                </div>
            ))
          )}
      </div>
    )
  }

  /****** Logic Functions *****/
  // Handle any change - called from event of changin an input box
  const handleChange = (row, index, value) => {
    // Transform the value - we want to have uppercase - trim removes whitespace
    const transformedValue = value.trim().toUpperCase().substring(0, 1);

    // If the transformed is a non-capital or number, return early
    if(!/^[A-Z]*$/.test(transformedValue)) {
      setErrorMessage('Please only enter alphabetical characters');
      return;
    }
    
    // If the letter is already in the puzzle then set another error
    for (const key in rows) {
      if (rows[key].includes(transformedValue)) {
        setErrorMessage('Value already exists in the puzzle.');
        return;
      }
    }

    // Valid entry, reset the error message
    setErrorMessage('');

    // Set rows calls function which takes prev rows - this is Spreading' (copy the previous state)
    setRows((prevRows) => ({
      ...prevRows,
      // Set [row] to previous rows -> if index is the same as the one passed, replace the value
      [row]: prevRows[row].map((val, idx) => (idx === index ? transformedValue : val))
    }))
  }



  
  // Change this - should load on website launch
  const loadLetters = async () => {
    const response = await fetchLetterboxedLetters();

    const letters = response.sides;
    if (letters) {
      const newRows = {
        top: letters[0].split(''),
        left: letters[3].split(''),
        right: letters[1].split(''),
        bottom: letters[2].split('')
      };
      setRows(newRows);
  }
  }

  const resetLetters = async () => {
      const newRows = {
        top: ['', '',''],
      left: ['', '',''],
      right: ['', '',''],
      bottom: ['', '','']}


      setRows(newRows);
  }
  
  const solvePuzzle = async () => {
        // Step One
    // Letter Boxed does not have words of length 1 or 2 - strip them
    // From the rules, we cannot have two identical letters in a row - strip if this occurs
    // console.log(`Resolved file path: ${wordsFilePath}`);
    const textArray = await readFileIntoArray(wordsFilePath);

    /*
    18/08/24: Words now stripped before loading.
    const strippedWords = [];
    textArray.forEach((word) => {
      if(word.length > 2 && !hasDoubleLetter(word)) {
        strippedWords.push(word);
      }
    });

    */

    // Step Two
    // Check one - Grab all valid words - Can it can be formed from the letters provided
    // Check two - In the context of the puzzle can it be solved i,e the row/column the letter is on.
    const validWords = [];
    const allLetters = Object.values(rows).flat().join('');

    for(let word of textArray) {
      if(canFormWordFromLetters(word, allLetters)) {
        if(isValidWord(word, allLetters)) {
          validWords.push(word);
        }
      }
    };

    

    // console.log(validWords);
    const solutionArr = [];

    validWords.forEach(word => {
      solveForTwoWords(validWords, word, allLetters, solutionArr);
    });

    // Update the solutions
    setSolutions(solutionArr);

    // Scroll to the results section
    if(resultsRef.current) {
      resultsRef.current.scrollIntoView({behavior: 'smooth', block: 'start' });
    }
  }


  /******************* Use Effect Hooks ****************/
  useEffect(() => {

    // Error message - if it shows, set the alert show to true and create a timer to display the message for a length of time
    if(errorMessage) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Duration for fadeout

      return() => clearTimeout(timer);
    }
  }, [errorMessage])


  /********************** JSX Return *******************/
  return (
    <Container className={`puzzle ${theme}`}>
    {/* Error Alert */}
    <div className="alert-container">
      {errorMessage && (
        <Alert
          className={`alert-fade-in ${showAlert ? 'alert-fade-in-show' : 'alert-fade-out'}`}
          color="danger"
        >
          {errorMessage}
        </Alert>
      )}
    </div>

      {/* Square render of puzzle */}
        {renderPuzzleVisual(rows)}


        {/* Buttons */}
        <div className = "puzzle-buttons-container">
          {/* Load Daily button - On click call the load letter function */ }
          <Button onClick={loadLetters} color ="primary" className = "btn-primary mt-3">Load Daily Letters</Button>
          {/* Reset Button */}
          <Button onClick={resetLetters} color ="primary" className = "btn-primary mt-3">Reset Letters</Button>
          {/* Solve Button */}
          <Button onClick={solvePuzzle} color ="primary" className = "btn-primary mt-3" disabled = {!areAllRowsPopulated(rows)}>Solve Puzzle</Button> 
        </div>

    {/* Solutions Section */}
    <div ref = {resultsRef} className="puzzle-results-section">
      <h2>Solutions</h2>
      {solutions.length > 0 ? (
        <ul>
            {solutions.map((solution, index) => (
            <li key={index}>{solution.join(', ')}</li>
              ))}
        </ul>
        ) : (
        <p>No solutions found.</p>
      )}
    </div>

    </Container>
  );
}

export default Puzzle;
