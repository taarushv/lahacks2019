var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD4B3vCkjkk5SZU5GTJyQrgMlou_4ICXe4'
});
var query = [34.0705, -118.4468]

const navitationInit = () => {
    googleMapsClient.reverseGeocode({
        latlng: query
      }, function(err, response) {
        if (!err) {
          this.setState({start:response.json.results[0].formatted_address});
        }
    });
    
}

navitationInit()