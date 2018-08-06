import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class Map_info extends Component {
  componentDidMount() {
    window.Loaded = false;
    setTimeout(() => {
      if (!window.Loaded) {
        this.props.error();
      }
      else {
        window.alert("OOOOPS Error Occurs");
      }
    }, 8000);
  }

  render() {
    return <div

       className='containerMap'>
       <CM
        googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCHCHK9TsmYNqXRlGYFhl8Gc0p7IawJYOwA&libraries=places'
        Marker_Apear={this.props.All_locs.length > 0}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        loadingElement={<div style={{ height: `100%` }} />}
        Close_window={this.props.Close_window}
        Marker_Click={this.props.Marker_Click}
        All_locs={this.props.All_locs}

      />
     
    </div>;
  }
}

export default Map_info ;

let  CM = withScriptjs(withGoogleMap(props => {
    return <GoogleMap
      defaultOptions={{scrollwheel: false}}
      defaultZoom={10}
      defaultCenter={props.All_locs.length > 1 ? props.All_locs[0] : {lat: 37.4220, lng: -122.0841}}
      onClick={props.Close_window}
      >
      {props.Marker_Apear && (props.All_locs.map((Place, Element) =>
        <Marker
          key={Element}
          position={Place}
          animation={Place.clicked ? window.google.maps.Animation.DROP : 0}
          onClick={() => {props.Marker_Click(Element)}} /> ))
      }
    </GoogleMap>
    
  }
))
