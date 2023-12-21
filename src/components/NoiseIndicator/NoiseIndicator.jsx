import React, { useEffect, useState } from 'react';
import { TbCat, TbDog } from "react-icons/tb";
import { MdOutlineFace } from "react-icons/md";
import './NoiseIndicator.css'

const NoiseIndicator = ({ audioLevel, soundType }) => {

  const [circleColor, setCircleColor] = useState('red');

  const soundIcon = () => {
    switch (soundType) {
      case 'human':
        return <MdOutlineFace className='cat-icon'/>;
      case 'cat':
        return <TbCat className='cat-icon'/>;
      case 'dog':
        return <TbDog className='cat-icon'/>;
      default:
        return <div className='cat-icon'/>;
    }
  }
  const testIcon = soundIcon();


  useEffect(() => {
    const handleAudioLevel = () => {
      const soundTargets = new Map([
        ['human', [77,85]],
        ['dog', [85,90]],
        ['cat', [80,85]]
      ]);
      const a = soundTargets.get(soundType);

      if(audioLevel < 1 || audioLevel === undefined) setCircleColor('white');
      else if(audioLevel < a[0]) setCircleColor('green');
      else if(audioLevel < a[1]) setCircleColor('yellow');
      else setCircleColor('#DF2935');
      console.log("audio Level: " + audioLevel);
    }
    handleAudioLevel();
  }, [audioLevel, soundType]);

  return (
    <div className='circleDiv'>
      {testIcon}
      <div className='circleIndicator' style={{ background: circleColor }} />
    </div>
  );
}

export default NoiseIndicator;