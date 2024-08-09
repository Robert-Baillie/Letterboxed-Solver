/* Solving */
// Check if a word has two identical letters in a row: i.e Sleep = False, Howdy = True.
export const hasDoubleLetter = (word) => {
  for (let i = 0; i < word.length -1; i++) {
    if(word[i] === word[i + 1]) { return true;}
  }
  return false;
}

// Create sets for the word and letters - if the word has a letter not in the all letters set then it cannot be created, hence invalid.
export const canFormWordFromLetters = (word, allLetters) => {
  const wordSet = new Set(word);
  const allLettersSet = new Set(allLetters);

  for(let letter of wordSet){
    if(!allLettersSet.has(letter)) {
      return false; 
    }
  }
  return true;
}


// Check whether the word is valid in context of the puzzle
export const isValidWord = (word, allLetters) => {
  // Loop over the word
  for(let i = 0; i < word.length - 1; i++) {
    // Grab the index of this letter in the word list
    // Use this to find seperate the row it is in from the others.
    const letterIndex = allLetters.indexOf(word[i]);
    const rowStartIndex = Math.floor(letterIndex /3) * 3;

    // Create the current row the letter is in
    const row = [];
    for(let j =  rowStartIndex; j < rowStartIndex + 3; j++) {
      row.push(allLetters[j]);
    }

    // If the next letter is in the row it cannot be a valid word
    if(row.includes(word[i+1])) {
      return false;
    }
  }
  return true;
}

// Simply create sets and compare to all letters
const checkAllLettersUsedTwoWords = (wordOne, wordTwo, allLetters) => {
  const combined = wordOne + wordTwo;
  const combinedSet = new Set(combined);
  const letterSet = new Set(allLetters);


  return combinedSet.size === letterSet.size  && [...combinedSet].every(letter => letterSet.has(letter));
}

// Solve the puzzle!
export const solveForTwoWords = (validWords, currentWord, allLetters, solutions) => {
  // All words are now valid so find the last word of the current word you are on
  // With the last leter you can find the next potential candidates!
  const lastLetter = currentWord[currentWord.length - 1];

  const nextCandidates = validWords.filter(
    word => word !== currentWord && word[0] === lastLetter
  );

  // Loop through the next candidates list
  // If the current word and the next candidate create a complete solution, push that array to solutions!
  nextCandidates.forEach(candidate => {
    if(checkAllLettersUsedTwoWords(currentWord, candidate, allLetters)) {
      solutions.push([currentWord, candidate]);
    }
  });
};



/* Utility Functions */

export const areAllRowsPopulated = (rows) => {
    // Go over each row and in each row check every letter does not contain a blank value
    return Object.values(rows).every(row => row.every(letter => letter !== ''));
  };


 
export const readFileIntoArray = async (filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    return data.split('\n'); 
  } catch (error) {
    console.error(`Error reading file from ${filePath}:`, error);
    throw error;
  }
};

