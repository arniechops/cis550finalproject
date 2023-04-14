var express = require('express');
var routes = require('./routes');

var app = express()
app.use(express.json())

const port = 8000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/login', routes.login)

