"use strict";

export class FetchData {

  constructor(data_in) {

    this.fetch_data_obj = {
      'dataset': 'GHCND',
      'data': undefined,
      'startdate': data_in.min_date,
      'enddate': data_in.min_date,
      'stations': data_in.station_ids,
      'token': undefined,
      'url': 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=',
    };

    this.addParametersToUrl();
    this.fetchData();
  }

  addParametersToUrl() {

    let new_url = this.fetch_data_obj.url+this.fetch_data_obj.dataset+
      '&startdate='+this.fetch_data_obj.startdate+'&enddate='+
      this.fetch_data_obj.enddate

    this.fetch_data_obj.stations.forEach(function(o) { 
      new_url = new_url + '&stationid='+o
    });
    console.log(new_url);
    this.fetch_data_obj.url = new_url;
  }

  fetchData(){

    let options = {
      method: 'GET',
      headers: {
        'token': this.token,
      },
    }

    this.fetch_data_obj.data = fetch(this.fetch_data_obj.url, options)
      .then(function(response){
        return response.text(); 
      })
      .then(function(rtext) {
        return JSON.parse(rtext);
      })
      .catch(function(error) {
        console.log(error.message);
      });

  }

  
};
