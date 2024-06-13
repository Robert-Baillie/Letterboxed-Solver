import React from 'react';

// The most basic button possible -> pass text and a function for what happens when you click it

function Button({ text, onClick}) {
  return (
    <button onClick = {onClick}>
      {text}
    </button>
  );
}

export default Button;
