import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './BarChart.css';

Chart.register(...registerables);

const BarChart = ({audioData, soundType}) => {
  // Sample data for the bar chart
  const [frequencyValue, setFrequencyValue] = useState([]);
  const [blueFrequency, setBlueFrequency] = useState([]);
  const [yellowFrequency, setYellowFrequency] = useState([]);
  const [redFrequency, setRedFrequency] = useState([]);
  

  const data = {
    labels: frequencyValue.map((_, index) => `${frequencyValue[index]} Hz`),
    datasets: [
      {
        label: '',
        data: blueFrequency, //
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: '',
        data: yellowFrequency,
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: '',
        data: redFrequency,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
            display: false,
          },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 120, // Adjust max based on your data
        title: {
          display: false,
          text: 'Amplitude',
          font: {
            size: 14,
          },
        },
        grid: {
            display: false,
          },
      },
    },
    indexAxis: 'x', // Use 'x' axis as the index axis for bar charts
    elements: {
      bar: {
        // Adjust the bar width by changing barPercentage and categoryPercentage
        barPercentage: 0.1, // Adjust as needed
        categoryPercentage: 0.7, // Adjust as needed
      },
    },
  };

  useEffect(()=>{
    const amplitude = [];
    const frequencyVal = [];
    for(let i = 0; i < audioData.length; i++) {
      frequencyVal.push(audioData[i][0]);
      amplitude.push(audioData[i][1]);
      if(amplitude[i] < 0) amplitude[i] = 0;
    }

    let tempFrequency = amplitude;
    let tempBlue = [];
    let tempYellow = [];
    let tempRed = [];
    for(let i = 0; i < tempFrequency.length; i++) {
        if(tempFrequency[i] > 30) {
            tempBlue[i] = 30;
            tempFrequency[i] -= 30;
            
            if(tempFrequency[i] > 30) {
                tempYellow[i] = 30;
                tempFrequency[i] -= 30;
                
                if(tempFrequency[i] >= 60) tempRed[i] = 60;
                else tempRed[i] = tempFrequency[i];
            }
            else tempYellow[i] = tempFrequency[i];
        }
        else tempBlue[i] = tempFrequency[i];
        console.log("index [" + i + "]: blue - " + tempBlue[i] + " yellow - " + tempYellow[i] + " red - " + tempRed[i]);
    }

    setBlueFrequency(tempBlue);
    setRedFrequency(tempRed);
    setYellowFrequency(tempYellow);
    
    setFrequencyValue(frequencyVal);
  }, [audioData]);

  return (
    <div className='Bar-div'>
        <Bar className={`${soundType}-chart`} data={data} options={options} />
    </div>
  )
};

export default BarChart;