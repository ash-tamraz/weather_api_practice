"use strict";


export class ParseData {

  constructor(incoming) {
    this.obj = {
      'raw_data': incoming.results,
      'prcp_avg': undefined,
      'tmax_avg': undefined,
      'tmin_avg': undefined,
      'prcp_all': undefined,
      'tmax_all': undefined,
      'tmin_all': undefined,
    }

    this.getVals();
    this.getAvgs();
  }

  getVals(){

    let prcp_arr = []
    let tmax_arr = []
    let tmin_arr = []
    this.obj.raw_data.forEach(function(o) {
      switch (o.datatype) {
        case 'PRCP':
          prcp_arr.push(o.value);
          break;
        case 'TMAX':
          tmax_arr.push(o.value);
          break;
        case 'TMIN':
          tmin_arr.push(o.value);
          break;
        default:
          break;
      }
    });
    this.prcp_all = prcp_arr;
    this.tmax_all = tmax_arr;
    this.tmin_all = tmin_arr;
  }

  getAvgs(){

    let temp = 0;
    this.prcp_all.forEach(function(o) { 
      temp = temp + o;
    });
    this.prcp_avg = temp / temp.length;
    
    temp = 0;
    this.tmax_all.forEach(function(o) { 
      temp = temp + o;
    });
    this.tmax_avg = temp / temp.length;
 
    temp = 0;
    this.tmin_all.forEach(function(o) { 
      temp = temp + o;
    });
    this.tmin_avg = temp / temp.length;
 
  }

};
