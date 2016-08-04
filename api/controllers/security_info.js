'use strict';

var util = require('util');
var request = require("request");
module.exports = {
  securityInfo: securityInfo
};

function securityInfo(req, res) {
  var id = req.swagger.params.id.value;
	var options = { method: 'POST',
	  url: 'http://gmapi.azurewebsites.net/getSecurityStatusService',
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
	promise.then(function(result) {;
			if(result.status!=200)
				res.json({"status":result.status,"error":result.reason});
			var gmDoorResponse = result.data.doors.values;
			var smartCarData=[];
			var doors={}
			for (var i = gmDoorResponse.length - 1; i >= 0; i--) {
				smartCarData.push({"location":gmDoorResponse[i].location.value ,"locked":gmDoorResponse[i].locked.value})
			}
		  res.json(smartCarData);
		}, function(err) {
		  res.status(500).end();
	});  
}
