'use strict';

var util = require('util');
var request = require("request");
module.exports = {
  fuelInfo: fuelInfo,
  batteryInfo:batteryInfo
};

function fuelInfo(req, res) {
  var id = req.swagger.params.id.value;
	var options = { method: 'POST',
	  url: 'http://gmapi.azurewebsites.net/getEnergyService',
	  headers: { 'content-type': 'application/json' },
	  body: { id: id, responseType: 'JSON' },
	  json: true };
	var result = null;
	var promise = new Promise(function(resolve, reject) {
  	request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		  if (response) {
		    resolve(body);
		  }
		  else {
		    reject(Error("It broke"));
		  }
 		});
	});
	promise.then(function(result) { 
			if(result.status!=200)
			  res.json({"status":result.status,"error":result.reason});
			var gmResponse = result.data;
			var smartCarData={};
			var tankLevel = gmResponse.tankLevel;
			tankLevel.value == null ? smartCarData.percent = 0 : smartCarData.percent = tankLevel.value;
		    res.json(smartCarData);
		}, function(err) {
		  res.status(500).end();
	});  
}


function batteryInfo(req, res) {
  var id = req.swagger.params.id.value;
	var options = { method: 'POST',
	  url: 'http://gmapi.azurewebsites.net/getEnergyService',
	  headers: { 'content-type': 'application/json' },
	  body: { id: id, responseType: 'JSON' },
	  json: true };
	var result=null;
	var promise = new Promise(function(resolve, reject) {
		request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		  if (response) {
		    resolve(body);
		  }
		  else {
		    reject(Error("It broke"));
		  }
			});
	});
	promise.then(function(result) {
			if(result.status!=200)
			  res.json({"status":result.status,"error":result.reason});
			var gmResponse = result.data;
			var smartCarData={};
			var batteryLevel = gmResponse.batteryLevel;
			batteryLevel.value == null ? smartCarData.percent = 0 : smartCarData.percent = batteryLevel.value;
		    res.json(smartCarData);
		}, function(err) {
		  res.status(500).end();
});  
}