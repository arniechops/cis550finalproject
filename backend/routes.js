const vals = ["HKB", "FAI", "BJA", "MRS", "ALG", "CDG"]

const mysql = require('mysql')
const config = require('./config.json')

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
connection.connect((err) => err && console.log(err));




var getFlights = function (req, res) {
    const val = req.query.string;
    connection.query(`
    SELECT DISTINCT id, iata, name,  CONCAT(Airports.city, ', ', Airports.name) AS full
    FROM Airports 
    WHERE name LIKE '${val}%' OR iata LIKE '${val}%' OR city LIKE '${val}%' 
    LIMIT 10
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        res.json(data);
      }
    });
}

var getAllFlights = function (req, res) {
    res.json(vals)
}

var findHotelsWithIncomingFlights = function (req, res) {
    //const country = req.query.country;
    connection.query(`
    SELECT h.title, h.address, h.latitude, h.longitude
    FROM hotels h
    INNER JOIN (
    SELECT a.lat, a.lon, COUNT(DISTINCT r.source_id) AS num_incoming_flights
    FROM Airports a
    INNER JOIN Routes r ON a.id = r.target_id
    WHERE r.source_id IN (
        SELECT id
        FROM Airports
        WHERE country = '${req.query.country}'
    )
    AND a.country <> '${req.query.country}'
    GROUP BY a.lat, a.lon
    HAVING COUNT(DISTINCT r.source_id) >= 10
    ) c ON (6371 * acos(cos(radians(h.latitude)) * cos(radians(c.lat)) * cos(radians(c.lon) - radians(h.longitude)) + sin(radians(h.latitude)) * sin(radians(c.lat)))) <= 10
    ORDER BY (6371 * acos(cos(radians(h.latitude)) * cos(radians(c.lat)) * cos(radians(c.lon) - radians(h.longitude)) + sin(radians(h.latitude)) * sin(radians(c.lat)))) ASC;

    `, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        res.json(data);
      }
    });
  }

  var findAirportsWithNearbyHotels = function (req, res) {
    //finds airports with at least5 hotels in a 5 mile radius given the city
    connection.query(`
        SELECT a.id, a.name, a.city, a.country, a.lat, a.lon, a.alt, a.timezone, COUNT(DISTINCT h.article) AS num_hotels
        FROM Airports a
        INNER JOIN hotels h ON (6371 * ACOS(COS(RADIANS(h.latitude)) * COS(RADIANS(a.lat)) * COS(RADIANS(a.lon) - RADIANS(h.longitude)) + SIN(RADIANS(h.latitude)) * SIN(RADIANS(a.lat)))) <= 5
        WHERE a.city = '${req.query.city}'
        GROUP BY a.id, a.name, a.city, a.country, a.lat, a.lon, a.alt, a.timezone
        HAVING COUNT(DISTINCT h.article) >= 5;
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        res.json(data);
      }
    });
  }

  
  var findUnited = function (req, res) {
    //takes in an airline name and returns all flights that have outgoing flight from an airline that has the same or similar name, such as United 
    connection.query(`
        SELECT a.name, a.city
        FROM Airports a
        INNER JOIN Routes r ON a.id = r.target_id
        INNER JOIN Airlines al ON r.airline_id = al.id
        WHERE al.name LIKE '%${req.query.airline}%';
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        res.json(data);
      }
    });
  }

  var findflightswithstops = function (req, res) {
    //takes in a country and returns all names and ids of flight routes and the number of stops (0, 1, 2)
    connection.query(`
    WITH possible AS (
        WITH frenchCountries AS (
            SELECT id, name FROM Airports WHERE country = '${req.query.country}'
        )
        SELECT source_id, target_id FROM Routes
        WHERE source_id IN (SELECT id FROM frenchCountries) AND target_id IN (SELECT id FROM frenchCountries)
    )
    SELECT DISTINCT
        0 as num_stops,
        A.source_id as source_id,
        ASrc.name as source_name,
        A.target_id as target_id,
        ATgt.name as target_name
    FROM possible A 
    JOIN Airports ASrc ON A.source_id = ASrc.id
    JOIN Airports ATgt ON A.target_id = ATgt.id
    GROUP BY source_id, target_id, source_name, target_name
    
    UNION ALL
    
    SELECT DISTINCT 
        1 as num_stops, 
        A.source_id as source_id, 
        ASrc.name as source_name,
        B.target_id as target_id, 
        BTgt.name as target_name
    FROM possible A
    JOIN possible B ON A.target_id = B.source_id
    JOIN Airports ASrc ON A.source_id = ASrc.id
    JOIN Airports BTgt ON B.target_id = BTgt.id
    WHERE A.source_id <> B.target_id
    GROUP BY source_id, target_id, source_name, target_name
    
    UNION ALL
    
    SELECT DISTINCT 
        2 as num_stops, 
        A.source_id as source_id, 
        ASrc.name as source_name,
        C.target_id as target_id, 
        CTgt.name as target_name
    FROM possible A
    JOIN possible B ON A.target_id = B.source_id
    JOIN possible C ON B.target_id = C.source_id
    JOIN Airports ASrc ON A.source_id = ASrc.id
    JOIN Airports CTgt ON C.target_id = CTgt.id
    WHERE A.source_id <> C.source_id AND A.source_id <> B.target_id AND B.source_id <> C.target_id AND A.target_id <> C.target_id AND A.source_id <> C.target_id
    GROUP BY source_id, target_id, source_name, target_name;
    
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        res.json(data);
      }
    });
  }

  var findNearbyHotels = function (req, res) {
    //takes in an airport (req.query.airport) and finds top X (req.query.limit) nearby hotels, ordered by distance 
    connection.query(`
    SELECT h.title, h.type, h.description, h.article,
    (6371 * ACOS(COS(RADIANS(a.lat)) * COS(RADIANS(h.latitude)) * COS(RADIANS(a.lon) - RADIANS(h.longitude)) + SIN(RADIANS(a.lat)) * SIN(RADIANS(h.latitude)))) AS distance
    FROM Airports a
    INNER JOIN hotels h ON (6371 * ACOS(COS(RADIANS(a.lat)) * COS(RADIANS(h.latitude)) * COS(RADIANS(a.lon) - RADIANS(h.longitude)) + SIN(RADIANS(a.lat)) * SIN(RADIANS(h.latitude)))) < ${req.query.distance ?? 10}
    WHERE a.name = '${req.query.airport}'
    ORDER BY distance;


    `, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        res.json(data);
      }
    });
  }

  var getTrip = function(req, res) {
    connection.query(`
    SELECT name, id
    FROM Airlines
    WHERE id IN (
    SELECT airline_id
    FROM Routes
    WHERE source_id = '${req.query.from}' AND target_id = '${req.query.to}')
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        res.json(data);
      }
    });
  }
  

var routes = {
    getFlights,
    getAllFlights, 
    findHotelsWithIncomingFlights, 
    findAirportsWithNearbyHotels,
    findUnited, 
    findflightswithstops, 
    findNearbyHotels,
    getTrip
};

module.exports = routes;

