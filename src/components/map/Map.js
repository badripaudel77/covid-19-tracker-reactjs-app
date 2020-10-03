import React from 'react';

import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../../utils/util';

import './Map.css';
//leaflet docs : https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/simple.js

const Map = ({mapCountries, caseType, center, zoom})=> {
    //  console.log(center)
    return (
        <div className="map">
            <LeafletMap 
              center = {center}
              zoom = {zoom}
             >
                <TileLayer
                    // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* loop through the countries and show the circle */}
                {showDataOnMap(mapCountries, caseType)}
            </LeafletMap> 
        </div>
    )
}

export default Map;
