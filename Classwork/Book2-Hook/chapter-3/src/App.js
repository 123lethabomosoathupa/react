import React from 'react';
import Rating from './Rating';

function App() {
  return (
    <div>
      <h1>React Rating Component</h1>
      <Rating rating='1' />
      <Rating rating='2' />
      <Rating rating='3' />
      <Rating rating='4' />
      <Rating rating='5' />
    </div>
  );
}

export default App;