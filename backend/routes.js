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

var findHotelBySearch = function (req, res) {
  //const country = req.query.country;
  connection.query(`
  SELECT 
  COALESCE(h.title) AS hotel_name,
  COALESCE(h.address, 'Not Listed') AS address,
  COALESCE(h.hours, 'Not Listed') AS hours,
  COALESCE(h.url, 'Not Listed') AS url,
  COALESCE(h.phone, 'Not Listed') AS phone_number,
  COALESCE(h.price, 'Not Listed') AS price,
  COALESCE(h.description, 'Not Listed') AS description
  FROM 
    hotels h 
  WHERE 
    h.title = '${req.query.title}'
  ORDER BY 
    h.title, h.address

  `, (err, data) => {
    if (err) {
      console.log(err);
    } else if (data) {
      res.json(data);
    }
  });
}

var findHotelsWithIncomingFlights = function (req, res) {
    //const country = req.query.country;
    connection.query(`
    CREATE VIEW airport_flights AS
    (SELECT a.id, COUNT(DISTINCT r.source_id) AS num_incoming_flights
    FROM Airports a
    INNER JOIN Routes r ON a.id = r.target_id
    GROUP BY a.id)

    SELECT h.title, h.address, h.latitude, h.longitude
    FROM (
    SELECT h.id, (6371 * acos(cos(radians(h.latitude)) * cos(radians(a.lat)) * cos(radians(a.lon) - radians(h.longitude)) + sin(radians(h.latitude)) * sin(radians(a.lat)))) AS distance
    FROM hotels h
    INNER JOIN Airports a ON a.country = 'United States' AND a.country <> 'United States'
    ) h2
    INNER JOIN airport_flights af ON af.id = h2.id AND af.num_incoming_flights >= 10
    INNER JOIN hotels h ON h.id = h2.id
    WHERE h2.distance <= 10
    ORDER BY h2.distance ASC;

    `, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        res.json(data);
      }
    });
  }

  var findAirportsWithNearbyHotels = function (req, res) {
    //given a city, finds airports with at least 5 hotels in a 5 mile radius given the city
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
  
  var flightsWithThreeStops = function (req, res) {
    //takes in a country and returns all names and ids of flight routes and the number of stops (0, 1)
    connection.query(`
    WITH possible AS (
        SELECT source_id, target_id, airline_id FROM Routes
        WHERE source_id IN (SELECT id FROM Airports) AND target_id IN (SELECT id FROM Airports)
    ),
    routes AS (
      (SELECT DISTINCT
          0 AS num_stops,
          A.source_id AS source_id,
          ASrc.name AS source_name,
          A.target_id AS target_id,
          ATgt.name AS target_name,
          NULL AS stop1_name,
          NULL AS stop2_name,
          NULL AS airline1,
          NULL AS airline2,
          NULL AS airline3,
          'First Trip' AS TripStatus
      FROM possible A
      JOIN Airports ASrc ON A.source_id = ASrc.id 
      JOIN Airports ATgt ON A.target_id = ATgt.id
      JOIN Airlines X ON X.id = A.airline_id
      WHERE ASrc.city = '${req.query.fromCity}' AND ATgt.city = '${req.query.midCity}'
      LIMIT 10)

      UNION ALL
  
      (SELECT DISTINCT
          1 AS num_stops,
          A.source_id AS source_id,
          ASrc.name AS source_name,
          B.target_id AS target_id,
          BTgt.name AS target_name,
          ABtgt.name AS stop1_name,
          NULL AS stop2_name,
          Airline1.name AS airline1,
          Airline2.name AS airline2,
          NULL AS airline3,
          'First Trip' AS TripStatus
      FROM possible A
      JOIN possible B ON A.target_id = B.source_id
      JOIN Airports ASrc ON A.source_id = ASrc.id
      JOIN Airports BTgt ON B.target_id = BTgt.id
      JOIN Airports ABtgt ON A.target_id = ABtgt.id
      JOIN Airlines Airline1 ON Airline1.id = A.airline_id
      JOIN Airlines Airline2 ON Airline2.id = B.airline_id
      WHERE A.source_id <> B.target_id AND ASrc.city = '${req.query.fromCity}' AND BTgt.city = '${req.query.midCity}'
      LIMIT 10)

      UNION ALL 

      (SELECT DISTINCT
          0 AS num_stops,
          A.source_id AS source_id,
          ASrc.name AS source_name,
          A.target_id AS target_id,
          ATgt.name AS target_name,
          NULL AS stop1_name,
          NULL AS stop2_name,
          NULL AS airline1,
          NULL AS airline2,
          NULL AS airline3,
          'Second Trip' AS TripStatus
      FROM possible A
      JOIN Airports ASrc ON A.source_id = ASrc.id 
      JOIN Airports ATgt ON A.target_id = ATgt.id
      JOIN Airlines X ON X.id = A.airline_id
      WHERE ASrc.city = '${req.query.midCity}' AND ATgt.city = '${req.query.toCity}')
      

      UNION ALL
  
      (SELECT DISTINCT
          1 AS num_stops,
          A.source_id AS source_id,
          ASrc.name AS source_name,
          B.target_id AS target_id,
          BTgt.name AS target_name,
          ABtgt.name AS stop1_name,
          NULL AS stop2_name,
          Airline1.name AS airline1,
          Airline2.name AS airline2,
          NULL AS airline3,
          'Second Trip' AS TripStatus
      FROM possible A
      JOIN possible B ON A.target_id = B.source_id
      JOIN Airports ASrc ON A.source_id = ASrc.id
      JOIN Airports BTgt ON B.target_id = BTgt.id
      JOIN Airports ABtgt ON A.target_id = ABtgt.id
      JOIN Airlines Airline1 ON Airline1.id = A.airline_id
      JOIN Airlines Airline2 ON Airline2.id = B.airline_id
      WHERE A.source_id <> B.target_id AND ASrc.city = '${req.query.midCity}' AND BTgt.city = '${req.query.toCity}'
      LIMIT 10)
    )
    SELECT
      num_stops,
      source_name,
      stop1_name,
      stop2_name,
      airline1, 
      airline2,
      airline3,
      target_name,
      TripStatus
    FROM routes
    ORDER BY num_stops, source_name, target_name;
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        res.json(data);
      }
    });
  }

  var findflightswithstops = function (req, res) {
    //takes in a country and returns all names and ids of flight routes and the number of stops (0, 1)
    connection.query(`
    WITH possible AS (
        SELECT source_id, target_id, airline_id FROM Routes
        WHERE source_id IN (SELECT id FROM Airports) AND target_id IN (SELECT id FROM Airports)
    ),
    routes AS (
      SELECT DISTINCT
          0 AS num_stops,
          A.source_id AS source_id,
          ASrc.name AS source_name,
          A.target_id AS target_id,
          ATgt.name AS target_name,
          NULL AS stop1_name,
          NULL AS stop2_name,
          NULL AS airline1,
          NULL AS airline2,
          NULL AS airline3
      FROM possible A
      JOIN Airports ASrc ON A.source_id = ASrc.id 
      JOIN Airports ATgt ON A.target_id = ATgt.id
      JOIN Airlines X ON X.id = A.airline_id
      WHERE ASrc.city = '${req.query.fromCity}' AND ATgt.city = '${req.query.toCity}'
      
      UNION ALL
  
      SELECT DISTINCT
          1 AS num_stops,
          A.source_id AS source_id,
          ASrc.name AS source_name,
          B.target_id AS target_id,
          BTgt.name AS target_name,
          ABtgt.name AS stop1_name,
          NULL AS stop2_name,
          Airline1.name AS airline1,
          Airline2.name AS airline2,
          NULL AS airline3
      FROM possible A
      JOIN possible B ON A.target_id = B.source_id
      JOIN Airports ASrc ON A.source_id = ASrc.id
      JOIN Airports BTgt ON B.target_id = BTgt.id
      JOIN Airports ABtgt ON A.target_id = ABtgt.id
      JOIN Airlines Airline1 ON Airline1.id = A.airline_id
      JOIN Airlines Airline2 ON Airline2.id = B.airline_id
      WHERE A.source_id <> B.target_id AND ASrc.city = '${req.query.fromCity}' AND BTgt.city = '${req.query.toCity}'
    )
    SELECT
      num_stops,
      source_name,
      stop1_name,
      stop2_name,
      airline1, 
      airline2,
      airline3,
      target_name
    FROM routes
    ORDER BY num_stops, source_name, target_name;
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
    SELECT h.title, h.type, h.description, h.article, h.url,
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

  var findBusiestAirports = function(req, res) {
    connection.query(`
    SELECT a.name AS airport_name, COUNT(*) AS num_flights, GROUP_CONCAT(DISTINCT al.name ORDER BY al.name SEPARATOR ', ') AS airlines
    FROM Airports a
    INNER JOIN (
        SELECT source_id AS airport_id, airline_id FROM Routes
        UNION ALL
        SELECT target_id AS airport_id, airline_id FROM Routes
    ) r ON a.id = r.airport_id
    INNER JOIN Airlines al ON r.airline_id = al.id
    GROUP BY a.id
    ORDER BY num_flights DESC
    LIMIT 10;
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        res.json(data);
      }
    });
  }

  var findBusiestAirlines = function(req, res) {
    connection.query(`
    WITH airline_route_counts AS (
      SELECT airline_id, COUNT(*) AS num_routes
      FROM Routes
      GROUP BY airline_id
  ),
  top_airlines AS (
      SELECT airline_id
      FROM airline_route_counts
      ORDER BY num_routes DESC
      LIMIT 10
  ),
  source_airport_counts AS (
      SELECT airline_id, source_id AS airport_id, COUNT(*) AS num_routes
      FROM Routes
      GROUP BY airline_id, source_id
  ),
  target_airport_counts AS (
      SELECT airline_id, target_id AS airport_id, COUNT(*) AS num_routes
      FROM Routes
      GROUP BY airline_id, target_id
  ),
  top_source_airports AS (
      SELECT airline_id, airport_id
      FROM (
          SELECT airline_id, airport_id, ROW_NUMBER() OVER (PARTITION BY airline_id ORDER BY num_routes DESC) AS row_num
          FROM source_airport_counts
          WHERE airline_id IN (SELECT airline_id FROM top_airlines)
      ) sub
      WHERE row_num <= 10
  ),
  top_target_airports AS (
      SELECT airline_id, airport_id
      FROM (
          SELECT airline_id, airport_id, ROW_NUMBER() OVER (PARTITION BY airline_id ORDER BY num_routes DESC) AS row_num
          FROM target_airport_counts
          WHERE airline_id IN (SELECT airline_id FROM top_airlines)
      ) sub
      WHERE row_num <= 10
  )
  SELECT a.name AS airline_name, arc.num_routes AS num_routes,
         GROUP_CONCAT(DISTINCT sa.name ORDER BY sa.name SEPARATOR ', ') AS source_airports,
         GROUP_CONCAT(DISTINCT ta.name ORDER BY ta.name SEPARATOR ', ') AS target_airports
  FROM Airlines a
  INNER JOIN airline_route_counts arc ON a.id = arc.airline_id
  INNER JOIN top_airlines ta ON a.id = ta.airline_id
  INNER JOIN source_airport_counts sac ON a.id = sac.airline_id
  INNER JOIN top_source_airports tsa ON sac.airline_id = tsa.airline_id AND sac.airport_id = tsa.airport_id
  INNER JOIN target_airport_counts tac ON a.id = tac.airline_id
  INNER JOIN top_target_airports tta ON tac.airline_id = tta.airline_id AND tac.airport_id = tta.airport_id
  INNER JOIN Airports sa ON sac.airport_id = sa.id
  INNER JOIN Airports ta ON tac.airport_id = ta.id
  GROUP BY a.id
  ORDER BY arc.num_routes DESC;
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        res.json(data);
      }
    });
  }

  const getDistinctCities = function(res, req) {
    connection.query(`
    SELECT DISTINCT city
    FROM Airports
    WHERE city like '${req.query.string}%'
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
    findHotelsWithIncomingFlights, 
    findAirportsWithNearbyHotels,
    findUnited, 
    findflightswithstops, 
    findNearbyHotels,
    getTrip,
    getDistinctCities,
    findBusiestAirports, 
    findBusiestAirlines, 
    flightsWithThreeStops,
    findHotelBySearch
};

module.exports = routes;

