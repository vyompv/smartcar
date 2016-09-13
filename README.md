# Smart Car GM's API

This is a simple REST API developed using Swagger, which takes in another REST API format to produces another standard format.
Herokuapp is in free usage mode, links might sleep for a few hours once randomly (in a day). If site is down return after a  few hours.

##GET:
https://smartcarapis.herokuapp.com/vehicles/1234/  <br />
https://smartcarapis.herokuapp.com/vehicles/1234/fuel  <br />
https://smartcarapis.herokuapp.com/vehicles/1234/battery  <br />
https://smartcarapis.herokuapp.com/vehicles/1234/doors  <br />

##POST:
https://smartcarapis.herokuapp.com/vehicles/1234/engine
{"action": "start"} or {"action": "stop"} 
