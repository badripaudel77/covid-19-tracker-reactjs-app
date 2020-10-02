import React, {useState, useEffect, Fragment} from 'react';

import {Box} from './components/box/Box';
import {Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';

import axios from './api/axios';
import Map from './components/map/Map';
import  {Table}  from './components/table/Table';
import BarChart from './components/barchart/BarChart';
import { sortData } from './utils/util';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  //first time when app loads
  useEffect(() => {
      const fetchOnAppLoad = async ()=> {
        const response = await axios.get('/all');
        setCountryInfo(response.data);
      }
      fetchOnAppLoad();
  }, [])

  useEffect(() => {
     const fetchCountries = async () => {
         const response = await axios.get('/countries');
        //  console.log(response)
         setCountries(response.data);
         setTableData(sortData(response.data)); //pass all list of the countries
     }
    fetchCountries();
  }, [])

  const onCountrySelect = async (e) => {
       const selectedCountry = e.target.value;
      //  console.log(selectedCountry, ' selected country');
      // countries/[countryName]
      const url = (selectedCountry === 'worldwide') ?
       '/all' : `/countries/${selectedCountry}`
      // console.log('url ............ ',url);
      const response = await axios.get(url);
      // console.log(response.data, ' response ')
      setCountry(selectedCountry);
      setCountryInfo(response.data);
    }

  return (
    <div className="app">
      <div className="app__container__left">  
            {/* header */} 
            <div className="app_header">
                  <h2>Covid-19 Tracker</h2>
                  {/* dropdown */}
                  <FormControl className="app__dropdown">
                      <Select variant="outlined"
                      value={country} onChange={onCountrySelect}>
                      <MenuItem selected value='worldwide'>Worldwide</MenuItem>
                      {
                          countries.map(country => (
                            // console.log('country ',country.country)
                            <MenuItem value={country.countryInfo.iso2} key={country.country}>{country.country}</MenuItem>
                          ))
                      }  
                      </Select>
                  </FormControl>
            </div>
            <div className="app__casesBox">
                <Box title="Cases" cases= {countryInfo.todayCases} total = {countryInfo.cases} />   
                <Box title="Recovered" cases= {countryInfo.todayRecovered} total = {countryInfo.recovered}/>   
                <Box title="Deaths" cases= {countryInfo.todayDeaths} total = {countryInfo.deaths} />   
            </div>
            <Map />
      </div>
      <Card className="app__container__right">
        <CardContent>
          <div className="table">
             <Table tableData= {tableData}/>
          </div>         
        </CardContent>
        <div className="graph">
              <BarChart />
        </div> 
      </Card>
    </div>
  );
}

export default App;
