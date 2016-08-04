'use strict';

var util = require('util');
var request = require("request");
module.exports = {
  engineInfo: engineInfo
};

function engineInfo(req, res) {
  var id = req.swagger.params.id.value;
  var action = req.swagger.params.action.value;
  var cmd=null;
  if(action.toLowerCase() == "start")
  		cmd = "START_VEHICLE";
  else if(action.toLowerCase() == "stop")	
  		cmd = "STOP_VEHICLE";
  else 	res.json({"status": 500,"error":"Please send the START or STOP command in the action field"});
	var options = { method: 'POST',
	  url: 'http://gmapi.azurewebsites.net/actionEngineService',
	  headers: { 'content-type': 'application/json' },
	  body: { id: id, command: cmd, responseType: 'JSON' },
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
			if(result.status != 200)
				res.json({"status":result.status,"error":result.reason});
			var gmResponse = result.actionResult;
			var smartCarData = {};
			var status= gmResponse.status.trim().toUpperCase();
			status == "EXECUTED" ? smartCarData.status = "success": (status == "FAILED" ? smartCarData.status = "error" : smartCarData.status = null) ;
		  	res.json(smartCarData);
		}, function(err) {
		  res.status(500).end();
	});  
}
