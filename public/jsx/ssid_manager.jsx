var SSIDManager = React.createClass({

  getIntialState: function() {
    return {networks: {}};
  },

  componentDidMount: function() {
    // get networks from the API every 5 seconds
    setInterval(function() {
      this.getNetworks();
    },10000);
  },

  // handle a refresh from the UI
  handleRefresh: function() {
    this.getNetworks();
  },
  
  getNetworks: function() {
    $.getJSON(api+'/ssids', function(networks) {
      setState({networks: networks});
    });
  },

  render: function() {
    Object.keys(this.state.networks).map(function(mac) {
      var nw = this.state.networks[mac];
      nw.mac = mac;
      
      return (
        <SSID nw={this.state.networks[mac]} />
      );
    });
  }

});


React.render(
  <SSIDManager api='http://localhost:3000' />,
  document.getElementById('manager')
);
