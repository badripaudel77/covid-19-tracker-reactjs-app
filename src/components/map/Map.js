import React from 'react';

import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import './Map.css';
//leaflet docs : https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/simple.js

const Map = ({center, zoom})=> {
    return (
        <div className="map">
            <LeafletMap 
              center = {center}
              zoom = {zoom}
             >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LeafletMap> 
        </div>
    )
}

export default Map;
