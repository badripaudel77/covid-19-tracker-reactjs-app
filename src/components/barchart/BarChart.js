import React, {useState,useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import axios from '../../api/axios';

import './BarChart.css'

const BarChart = () => {
     const [chartData, setChartData] = useState({});

     useEffect(() => {
        const fetchChartData = async () => {
            const response = await axios.get('/historical/all');
            console.log('chartdata ' ,response.data)
        }
        fetchChartData();
        
     }, []);

    return (
        <div className="barchart">
            <Line data = {chartData}
                width={100}
                height={50}
            />
        </div>
    )
}

export default BarChart
