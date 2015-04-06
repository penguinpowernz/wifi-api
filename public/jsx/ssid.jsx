var SSID = React.createClass({
  render: function() {
    return (
      <div className='ssid'>
        <h2>{this.props.nw.ssid}</h2>
        <h3>{this.props.nw.mac}</h3>
      </div>
    );
  }
});
