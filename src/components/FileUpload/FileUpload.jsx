import React from 'react';
import * as XLSX from 'xlsx';
import './FileUpload.css';

const FileUpload = ({setAudioData, soundType}) => {

  /**
   * getAudioData
   * @param {*} audioSheet 
   * @returns audioDataArray
   */
  const getAudioData = (audioSheet) => {
    if(audioSheet === undefined) return 0;
    const dataStartCell = 'B1'; // may be able to remove variable & directly use cell string
    const dataCountCell = 'B2';
    const dataStart = audioSheet[dataStartCell]?.v;
    const dataCount = audioSheet[dataCountCell]?.v;
    let audioDataArray = []
  
    for(let i = dataStart; i < dataStart + dataCount; i++) {
      const audioFrequency = audioSheet[`A${i}`]?.v;
      const audioValue = audioSheet[`B${i}`]?.v;
      const audioData = [audioFrequency, audioValue];
      audioDataArray.push(audioData);
    }
    return audioDataArray;
  }

  /**
   * getAudioLevel
   * @param {*} audioSheet 
   * @returns cellValue -- the value of the audio level cell
   */
  const getAudioLevel = (audioSheet) => {
    if(audioSheet === undefined) return 0;
    const audioLevelCell = 'B10';
    const cellString = audioSheet[audioLevelCell]?.v;
    const cellValue = parseFloat(cellString.match(/\d+\.\d+/));
    console.log("Audio Level: " + cellValue);

    return cellValue;
  }

  /**
   * getSheet
   * @param {*} document -- an excel document
   * @returns sheet -- the data of a single excel sheet
   */
  const getSheet = (document) => {
    const workbook = XLSX.read(document, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheetName];
    return sheet;
  }

  const checkSoundType = (sheetData) => {
    if(sheetData[sheetData.length-1][0] > 46500) return 'cat';
    else if(sheetData[sheetData.length-1][0] > 23250) return 'dog';
    else return 'human';
  }

  const parseAudioData = (data) => {
    const tempData = new Map();

    const dataSheet = getSheet(data);
    const sheetData = getAudioData(dataSheet);
    const sheetaSoundType = checkSoundType(sheetData);

    if(sheetaSoundType === soundType){
      tempData.set('audioLevel', getAudioLevel(dataSheet));
      tempData.set('audioData', sheetData);
    }
    else{
      tempData.set('error', sheetaSoundType);
      tempData.set('expected', soundType);
    }

    return tempData;
  }


  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const audioData = parseAudioData(data);
        setAudioData(audioData);
        
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className='file-div'>
      <label htmlFor={soundType} className='uploadLabel'> Upload File</label>
      <input type="file" onChange={handleFileUpload} className='file-input' id={soundType} />
    </div>
  );
};

export default FileUpload;
