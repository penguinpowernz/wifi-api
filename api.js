#!/usr/bin/env node

var Wireless = require("wireless"),
    express  = require("express"),
    app      = express();

var CURRENT_SSID = "None";


wireless = new Wireless({
  iface: "wlan0",
  updateInterval: 10
});

wireless.enable();
wireless.start();

app.get("/ssids", function(req, res) {
  res.status(200).json(wireless.list());
});

app.get("/ssids/current", function(req, res) {
  res.status(200).json({ssid: CURRENT_SSID});
});

app.post("/ssids/join", function(req, res) {
  var networks = wireless.list(),
      network  = null;
console.log(req.param('ssid'))

  for (mac in networks) {
    if ( networks[mac].ssid == req.params.ssid ) {
      network = networks[mac];
      break;
    }
  }
  if ( network == null ) {
    res.status(404).json({error: "SSID not found: "+req.params.ssid}).end();
    return;
  }

  wireless.join(network, req.params.password || "", function(err) {
    if ( err ) {
      if ( typeof(err) == String ) {
        var reason = err;
      } else {
        var reason = err.message;
      }
      res.status(500).json({error: "Failed to connect to "+req.params.ssid+": "+reason});
    } else {
      res.status(200).end();
    }
  });

});

app.post("/ssids/leave", function(req, res) {
  wireless.leave(function() {
    wireless.disable(function() {
      CURRENT_SSID = "None";
      res.status(200).end();
    });
  });
});


wireless.on('error', function(msg) {
  console.log(msg);
});

// wireless.on('appear', function(network) {
//   console.log('network appeared: ');
//   console.log(network);
// });

server = app.listen(3000, function() {
  console.log("API serving on port 3000");
});