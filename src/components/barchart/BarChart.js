import React, {useState,useEffect} from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from '../../api/axios';

import './BarChart.css';

const BarChart = ({countryInfo}) => {
  
  console.log(countryInfo)
  // can be destructured like this : ({countryInfo : { country, cases, recovered, active, deaths, tests }})
    const { country, cases, recovered, active, deaths, testsPerOneMillion } = countryInfo;
   
     const [chartData, setChartData] = useState([]);
     useEffect(() => {
        const fetchChartData = async () => {
            const response = await axios.get('/continents');
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
                text:'Highlight Cases',
                fontSize:20
            },
                legend: {
                display:true,
                position:'top'
            }
          }}
        />

    const barchart = cases && <Bar 
            data= {{
                   labels : ['Cases', 'Recovered', 'Active', 'Deaths', 'Tests Per Million'],
                   datasets : [{
                     label : 'People',
                     backgroundColor : ['pink', 'green', 'blue', 'red', 'yellow'],
                     data : [cases, recovered, active, deaths, testsPerOneMillion],
                   }]
            }}
          
            options={{ 
              legend : { display : false },
              title : { display : true, text : `Highlight Cases in ${country}`}
             }}
      />

    return (
        <div className="barchart">
          { country && console.log(country, '=> ', cases) }
          
          {
            country ? barchart : chart
          }
            {/* {chart} */}
        </div>
    )
}
export default BarChart
