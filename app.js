var express = require('express');
var routes = require('./routes');
var path = require('path')

var app = express()
app.use(express.json())

const path = require('path')

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/getflights', routes.getFlights)
app.get('/gettrip', routes.getTrip)
app.get('/findhotelswithincomingflights', routes.findHotelsWithIncomingFlights);
app.get('/findairportswithnearbyhotels', routes.findAirportsWithNearbyHotels);
app.get('/findunited', routes.findUnited);
app.get('/findflightswithtwostops', routes.findflightswithstops);
app.get('/findnearbyhotels', routes.findNearbyHotels);
app.get('/getdistinctcities', routes.getDistinctCities);
app.get('/findbusiestairports', routes.findBusiestAirports);
app.get('/findbusiestairlines', routes.findBusiestAirlines);
app.get('/flightswiththreestops', routes.flightsWithThreeStops);
app.get('/findhotelsbysearch', routes.findHotelBySearch);
app.get('/findclosesthotel', routes.findClosestHotel);
app.get('/findattractions', routes.findAttractions);
app.get('/airlinesbycountry', routes.airlinesByCountry);
app.get('/getdistinctcountries', routes.getDistinctCountries);
app.get('/getdistinctairlines', routes.getDistinctAirlines);