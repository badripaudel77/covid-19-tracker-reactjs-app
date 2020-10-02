import React, {useState,useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import axios from '../../api/axios';

import './BarChart.css';

const BarChart = () => {
     const [chartData, setChartData] = useState([]);

     useEffect(() => {
        const fetchChartData = async () => {
            // const response = await axios.get('/countries');
            const response = await axios.get('/continents');
            console.log('chartdata ' ,response.data)
            setChartData(response.data);
        }
        fetchChartData();  
    }, []);

   const chart =  chartData && <Line
          data = {{
                  labels: chartData.map(data => data.continent),
         datasets: [
          {
            label: 'Active Cases😒',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'pink',
            borderColor: 'black',
            borderWidth: 3,
            data: chartData.map(data => data.active)
          },
          {
            label: 'Deaths🤦‍♂️',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'red',
            borderColor: 'blue',
            borderWidth: 3,
              // data: [120,340,560,780,8888]
            data: chartData.map(data => data.deaths)

          },
          {
            label: 'Recovered 🌹',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'green',
            borderColor: 'gray',
            borderWidth: 3,
            data: chartData.map(data => data.recovered)

          }
        ]
      }}
          options = {{
                title: {
                display:true,
                text:'Continents Highlight Cases',
                fontSize:20
            },
                legend: {
                display:true,
                position:'top'
            }
          }}
        />

    return (
        <div className="barchart">
        {/* {console.log('setchartdata   ' ,chartData)} */}
         {chart}
        </div>
    )
}
export default BarChart
