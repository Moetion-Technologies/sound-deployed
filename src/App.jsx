import React from 'react';
import SoundRow from './components/SoundRow/SoundRow';
import './App.css'


const App = () => {

  return (
    <div>
      <h1>Bissell Sound Graph</h1>
      <SoundRow soundType='human' />
      <SoundRow soundType='dog' />
      <SoundRow soundType='cat' />
    </div>
  );
};

export default App;
