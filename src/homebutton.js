// HomeButton.js
import React from 'react';
import './homebutton.css';

function HomeButton({ onClick }) {
  return (
    <button onClick={onClick}>Back</button>
  );
}

export default HomeButton;
