import React from 'react';

const TextButton = ({ text, hidden, onClick }) => {
  if (hidden) {
    return (
      <button 
        className="bg-transparent aspect-square flex items-center justify-center 
        cursor-default rounded-lg"
        style={{ visibility: 'hidden' }}
      >
        {/* Empty content but occupies space */}
      </button>
    );
  }

  // If text is checkmark, make the box green with no text
  // If text is cross, make the box red with no text
  // Else, normal color and text

  if (text === "✔") {
    return (
      <button className="bg-green-500 aspect-square flex items-center justify-center 
      text-green-500 text-4xl font-bold leading-none rounded-lg"
      onClick={onClick}>
      </button>
    );
  }
  if (text === "✘") {
    return (
      <button className="bg-red-500 aspect-square flex items-center justify-center 
      text-red-500 text-4xl font-bold leading-none rounded-lg"
      onClick={onClick}>
      </button>
    );
  }
  return (
    <button className="bg-[#1e1e1e] aspect-square flex items-center justify-center 
    text-white text-4xl font-bold leading-none rounded-lg hover:bg-[#202020] active:bg-[#2e2e2e]"
    onClick={onClick}>
      {text}
    </button>
  );
}

export default TextButton;
