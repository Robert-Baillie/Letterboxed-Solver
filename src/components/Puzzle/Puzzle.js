import React, { useState, useContext, useEffect   } from 'react';

import { Container, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ThemeContext } from '../../contexts/ThemeContext';

import '../LetterboxedSolverPage.css'

import { fetchLetterboxedLetters,fetchLetterboxedSolutions } from '../../utils/buttonHandlers';
import { areAllRowsPopulated, readFileIntoArray, canFormWordFromLetters, isValidWord, solveForTwoWords } from '../../utils/puzzleHelpers';

import wordsFilePath from '../../assets/words_hard.txt'
import LoadingSpinner from '../Utility/LoadingSpinner';

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
  // Define the loading state
  const [loading, setLoading] = useState(false);
  // Define the error message
  const [errorMessage, setErrorMessage] = useState('');
  // Use state alert to manage alert visibility
  const [showAlert, setShowAlert] = useState(false);

  // On Component Mount populate this
  const [dailyLetters, setDailyLetters] = useState({
    top: ['', '',''],
    left: ['', '',''],
    right: ['', '',''],
    bottom: ['', '','']
  });

  // On Component Mount populate the solutions
  const [dailySolutions, setDailySolutions] = useState(['','']);

  // Modal - Popup window for the solutions rather than the bottom
  const [isModalOpen, setIsModalOpen] = useState(false);


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
    }));
  }



  
  // Change this - should load on website launch
  const loadLetters = () => {
    if(dailyLetters.top[0] === '') setErrorMessage('The daily letters were not loaded. Please refresh the page.')
    else setRows(dailyLetters);
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
    // Allow Loading Symbol to open
      setLoading(true);
    // Set a time out => This forces a state update mid function so the loading symbol can open:
     setTimeout(async () => { requestAnimationFrame(async () => {
           try {
              // Step One
          // Letter Boxed does not have words of length 1 or 2 - strip them
          // From the rules, we cannot have two identical letters in a row - strip if this occurs
          // console.log(`Resolved file path: ${wordsFilePath}`);
          const textArray = await readFileIntoArray(wordsFilePath);

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

        } catch {
          setErrorMessage('Failed to solve puzzle. Please try again');
        } finally {
          // Loading is done, set to false
          
          setLoading(false);
        setIsModalOpen(true)

        };
    })
  },0);
  }


  const toggleModal = () => setIsModalOpen(!isModalOpen);

  /******************* Use Effect Hooks ****************/
  // Error Message
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


  // Loading daily letters on mounting
  useEffect(() => {
    // Async function to fetch
    const loadDailyLetters = async () => {
      try {
          // Try to find a response - if we get one, load in the daily letters into the split
          const response = await fetchLetterboxedLetters();
          const letters = response.sides;
          if (letters) {
            setDailyLetters({
              top: letters[0].split(''),
              left: letters[3].split(''),
              right: letters[1].split(''),
              bottom: letters[2].split('')
            })
            
          };
    } catch (error) {
      console.error('Failed to fetch daily letters: ', error);
    }};

    if(dailyLetters.top[0] === '') loadDailyLetters() ;
    }, [dailyLetters]); // This runs the effect if daily letters changes.

    // Loading daily solutions on mounting
  useEffect(() => {
    
    const loadDailySolution = async () => {
      try {
          const response = await fetchLetterboxedSolutions();
          const sol = response.solution;
          if (sol) {
            setDailySolutions(sol);
            
          };
    } catch (error) {
      console.error('Failed to fetch solutions letters: ', error);
    }};

    if(dailySolutions[0] === '') loadDailySolution() ;
    }, [dailySolutions]); // This runs the effect if daily letters changes.
  

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


    {/* Loading Spinner - render in middle of screen */}
    {loading ? (
      <div className='puzzle-loading-overlay'>
        <LoadingSpinner className = "puzzle-loading" />
      </div>) : null}


    {/* Solutions Section */}
    <div className="puzzle-results-section">
      <Modal className = "puzzle-results-modal" 
            isOpen = {isModalOpen} 
            toggle={toggleModal}
            backdrop = {true}
            keyboard = {true}
      >
          <ModalHeader  className = "puzzle-results-modal-header" toggle={toggleModal}>Solutions</ModalHeader>
          <ModalBody className='puzzle-results-modal-body'>
            {solutions.length > 0 ? (
              <ul>
                {/* If NYT Puzzle - show solutions */}
                {JSON.stringify(rows) === JSON.stringify(dailyLetters) && (
                <li><strong>NYT Solution:</strong> {dailySolutions.join(', ')}</li>)}


                {/* Generate solutions */}
                {solutions.map((solution, index) => (
                  <li key={index}>{solution.join(', ')}</li>
                ))}
              </ul>
            ) : (
              <p>No solutions found.</p>  
            )}
          </ModalBody>
        <ModalFooter className='puzzle-results-modal-footer'>
          <Button color="primary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>

    </Container>
  );
}

export default Puzzle;
