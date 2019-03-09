
"use strict";

import * as station_parser from './findStations.js';
import * as fetch_data from './fetchData.js';
import * as parse_data from './parseData.js';

export class Data {

  constructor(input) {
    this.loc = {
      'lat': parseFloat(input[0].value),
      'lon': parseFloat(input[1].value),
    };
    this.loc_diff = {
      'lat': this.loc.lat+0.119872,
      'lon': this.loc.lon+0.3083,
    };
    this.data = {
      'rain': undefined,
      'tmax': undefined,
      'tmin': undefined,
    }
    this.url = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/';
    this.token = undefined;
    this.raw_station_data = null; 
  }

  fetchStations(){

    let url = this.url+'stations?extent='+this.loc.lat+','+this.loc.lon+','+
      this.loc_diff.lat+','+this.loc_diff.lon+'&datasetid=GHCND';

    let options = {
      method: 'GET',
      headers: {
        'token': this.token,
      },
    }

    fetch(url, options)
      .then(function(response) {
        if (response.ok) {
          return response.text();
        }
      })
      .then(function(res) {
        let a = new station_parser.Stations(JSON.parse(res));
        let b = new fetch_data.FetchData(a.stations_obj);
        b.fetch_data_obj.data
          .then(function(data) { 
            console.log(data);
            let p = new parse_data.ParseData(data);
            console.log(Object.keys(p.obj));
          });
        
        return;
      })
      .catch(function(error){
        console.log(error.message);

      });
  }

}


