


"use strict";


import * as loc_parser from './parser.js';
(function(){


window.onload = function(){

  //fetchLocation();
  document.getElementById("location_input").addEventListener("click", parseInput, false);
};

function getFormattedDates(){

  let current = new Date();
  let start = new Date();

  let startMonth = current.getUTCMonth() - 1;
  startMonth = ((startMonth % 12) + 12) % 12;
  start.setUTCMonth(startMonth);

  current = current.toISOString();
  current = current.split('T')[0];

  start = start.toISOString();
  start = start.split('T')[0];

  return [start, current];
}

function parseInput(){
  let frm = document.getElementById("location_input_form");
  let a = new loc_parser.Data(frm.elements);
  //testinglatlon = '45.433132,-122.805875,45.553004,-122.497575';
  a.fetchStations();
}

function assembleParameters(){

  let endpoint = "data"
  let parameters = "?datasetid=GHCND&locationid=ZIP:97229&startdate=2010-05-01&enddate=2010-05-05"

  return {endpoint, parameters}
}

function fetchLocation(){

  let currentDate = new Date();
  let url = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/'

  let options = {
    method: 'GET',
    headers: {
      'token': undefined,
    },
  };

//  let dates = getFormattedDates();
//  let parameters = assembleParameters();
//  console.log(parameters);
//    .then(function(response){ 
//      if(response.ok){
//        console.log('response ok');
//        return response.json();
//      }
//    })
//    .then(function(res){
//      console.log(JSON.stringify(res));
//    })
//    .catch(function(error){
//
//      console.log(error.message);
//    });
}

})();


