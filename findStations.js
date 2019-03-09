"use strict";


export class Stations {

  constructor(raw_data) {
    this.stations_obj = {
      'data': raw_data,
      'stations': undefined,
      'min_date': undefined, 
      'station_ids': undefined,
    };
    this.findCurrentStations();
    this.findStationIds();
    this.findMinDate();
  }

  findCurrentStations(){

    let arr = [];
    let date = new Date();
    let year = date.getUTCFullYear();
    let rep = year.toString()+'-\\d{2}-\\d{2}';
    let re = new RegExp(rep);

    this.stations_obj.data.results.forEach(function(o, i){
      if (re.test(o.maxdate)===true){
        arr.push(o);
      }

    });
    
    this.stations_obj.stations = arr;
  }

  findMinDate(){

    let arr = this.stations_obj.stations;
    arr.sort(function (a, b) {
      let x = a.maxdate;
      let y = b.maxdate;
      if (x < y ) {
        return -1;
      }
      if (x > y ) {
        return 1;
      }
      return 0;

    });
    this.stations_obj.min_date = arr[0].maxdate;

  }

  findStationIds(){

    let arr = [];
    this.stations_obj.stations.forEach(function (o) {
      arr.push(o.id);
    });

    this.stations_obj.station_ids = arr;
  }

  print() {
    console.log(this.stations_obj);

  }

};
