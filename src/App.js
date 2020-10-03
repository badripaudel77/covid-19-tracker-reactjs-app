import React, {useState, useEffect} from 'react';

import {Box} from './components/box/Box';
import {Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';

import axios from './api/axios';
import Map from './components/map/Map';
import  {Table}  from './components/table/Table';
import BarChart from './components/barchart/BarChart';
import { sortData } from './utils/util';

import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat : 51.505, lng : -0.09});
  const [mapZoom, setMapZoom] = useState(2);

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
      // console.log(response.data.countryInfo, ' on country change response ') grab lattitude and longitude
      setCountry(selectedCountry);
      setCountryInfo(response.data);
      setMapCenter({lat :response.data.countryInfo.lat, lng: response.data.countryInfo.long})
      setMapZoom(5)
    }

  return (
    <div className="app">
      {/* {console.log(countries)} // array */}
      <div className="app__container__left">  
            {/* header */} 
            <div className="app_header">
                  <img 
                  className="app_header__image"
                  src="https://www.euro.who.int/__data/assets/image/0005/436640/coronavirus-COVID-19-WHO-Europe_250x.png" alt="Not loaded " />
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
            <Map 
               center = {mapCenter}
               zoom = {mapZoom}
               mapCountries = {countries}
               caseType = 'cases'
            />
      </div>
      <Card className="app__container__right">
        <CardContent>
          <div className="table">
             <Table tableData= {tableData}/>
          </div>         
        </CardContent>
        <div className="graph">
              <BarChart countryInfo = {countryInfo}/>
        </div> 
      </Card>
    </div>
  );
}

export default App;
