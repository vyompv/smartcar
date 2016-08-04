'use strict';

var util = require('util');
var request = require("request");
module.exports = {
  vehicleInfo: vehicleInfo
};

function vehicleInfo(req, res) {
  var id = req.swagger.params.id.value;
  var options = { method: 'POST',
    url: 'http://gmapi.azurewebsites.net/getVehicleInfoService',
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
      var doorCount=0;
      smartCarData.vin=gmResponse.vin.value;
      smartCarData.color=gmResponse.vin.value;
      gmResponse.fourDoorSedan.value == 'True'? doorCount=4 : (gmResponse.twoDoorCoupe.value == 'True'? doorCount=2 : doorCount=0);
      smartCarData.doorCount=doorCount;
      smartCarData.driverTrain=gmResponse.vin.value;
      res.json(smartCarData);
    }, function(err) {
      res.status(result.status).end();
  });  
}
