import React, { useState } from 'react';


function Puzzle() {
  // Define the use State and the initial state
  const [rows, setRows] = useState({
    top: ['', '',''],
    left: ['', '',''],
    right: ['', '',''],
    bottom: ['', '','']
  });

  // Define the error message
  const [errorMessage, setErrorMessage] = useState('');

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


  // Define the row render -> to be used in the return (Basically a cut down row class)
  // Create a row based on a key from the state. for each element in the row create an input box
  const renderRow = (title, rowKey) => (
    <div className = "row" key = {rowKey}>
      <h1>{title}</h1>
      {rows[rowKey].map((input, index) => (
        <input
            key = {index}
            type = "text"
            value = {input}
            onChange = {(e) => handleChange(rowKey, index, e.target.value)}
            />
      ))}
    </div>
  )

  // Return the element - a div with 4 rows rendered as above
  // Also includes any potential error messages
  return (
    <div className = "puzzle">

    {/* Puzzle Entries */}
    {renderRow('Top',      'top')}
    {renderRow('Left',     'left')}
    {renderRow('Right',    'right')}
    {renderRow('Bottom',   'bottom')}

    {/* Error message: Only Render if it is true */}
    {errorMessage ? <p className="error-message">{errorMessage}</p> : null}

    {/*<button onClick = {handleSubmit}>Submit</button>*/}
    </div>
  );
}

export default Puzzle;
