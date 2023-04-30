const vals = ["USA", "India", "Canada"]

var getFlights = function (req, res) {
    const val = req.query.string;
    res.json(vals.filter(str => str.indexOf(val) !== -1))
}

var getAllFlights = function (req, res) {
    res.json(vals)
}

var routes = {
    getFlights,
    getAllFlights
};

module.exports = routes;

