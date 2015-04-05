#!/usr/bin/env node

var PORT    = 4343,
    express = require('express'),
    app     = express();

app.use(express.static(__dirname + '/public'));


app.listen(PORT, function() {
  console.log("App started on port "+PORT);
});
