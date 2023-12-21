import React, { useEffect, useState } from "react";
import './SoundRow.css';
import BarChart from "../BarChart/BarChart";
import NoiseIndecator from "../NoiseIndicator/NoiseIndicator";
import FileUpload from "../FileUpload/FileUpload";


const SoundRow = ({soundType}) => {
  const [audioLevel, setAudioLevel] = useState();
  const [chartAudio, setChartAudio] = useState([]);
  const [audioData, setAudioData] = useState();

  useEffect(() => {

     if(audioData !== undefined){
      if(audioData.get('error') !== undefined){
        console.log("Oops looks like you uploaded " + audioData.get('error') + " Data");
        console.log("Expected " + soundType + " Data" );
      }
      else{
        console.log("Got it: " + audioData.get('audioData'));
      setAudioLevel(audioData.get('audioLevel'));
      setChartAudio(audioData.get('audioData'));
      }
    }
  }, [audioData, soundType]);
  

  return (
    <div className="soundRow">
      <div className="nFColumn">
        <NoiseIndecator audioLevel={audioLevel} soundType={soundType}/>
        <FileUpload setAudioData={setAudioData} soundType={soundType}/>
      </div>
      <BarChart audioData={chartAudio}  soundType={soundType}/>
    </div>

  )
}

export default SoundRow;