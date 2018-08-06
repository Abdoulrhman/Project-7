import React, { Component } from 'react';
import Info_display from './Info_display';
import Map_info  from './Map_Details';
import '../App.css';
import Location_details from './Details';

class App extends Component {
  state = {
    All_locs: []
  }

/*
|--------------------------------------------------------------------------
| ClientID & ClientSecret from FourSquare
|--------------------------------------------------------------------------
*/
    Loc_details = (Location) =>{

        return (require('react-foursquare')({
            clientID: 'N4SVD5OLBYMEBXRRNZ3ZZ42YPEKKZKIN2WMKWB0QGVS1A5CX',
            clientSecret: 'WN2WQDBNP31HVPE3DW1ZCT5DWNXPP5SD04AUNVQZYLG5WO5J'})).venues.getVenue({
            'venue_id': Location.id
        })
    }



/*
|--------------------------------------------------------------------------
| Check Between Two variables if they are Equal then you are on marker
|--------------------------------------------------------------------------
*/

  Is_marker=(Marker)=>{
    
    var All_locs = this.state.All_locs.map((Result, n) => {
      if (n === Marker) {
        Result.clicked = 1;
      } else {
        Result.clicked = 0;
      }
      return Result;
    });

/*
|--------------------------------------------------------------------------
| Return More Info About Location Or Alert In Case Of Error
|--------------------------------------------------------------------------
*/    this.Loc_details(this.state.All_locs[Marker])
        .then(ven =>
          {

        this.setState({
        All_locs: All_locs,
        S_Loc: ven.response.venue
        });
        document.querySelector('.Show').focus();
         }

         ).catch(err => { this.ERROR();

        window.alert(err);});
        }


/*
|--------------------------------------------------------------------------
| Close The Displayed Screen
|--------------------------------------------------------------------------
*/    Close = () =>{
        const All_locs = this.state.All_locs.map((Result) => {
            Result.clicked = 0;
            return Result;
        });
        this.setState({ All_locs: All_locs, S_Loc: null });
    }




ERROR = () => {

    document.querySelector('.err').style.opacity = 1;
    setTimeout(() => {
      document.querySelector('.err').style.opacity = 0;
    }, 1000);
}



/*
|--------------------------------------------------------------------------
| Setting The Location
|--------------------------------------------------------------------------
*/   Marker_handler = (All_locs) => {
        this.setState({ All_locs });
    }


  render() {

    return (

      <div className='containerApp'>

        <Location_details
          Four_Sq={require('react-foursquare')
          ({
            clientID: 'N4SVD5OLBYMEBXRRNZ3ZZ42YPEKKZKIN2WMKWB0QGVS1A5CX',
            clientSecret: 'WN2WQDBNP31HVPE3DW1ZCT5DWNXPP5SD04AUNVQZYLG5WO5J'}
                        )}
          Mar_option={this.Marker_handler}
          On_Loc={this.Is_marker} />


        <Map_info
          All_locs={ this.state.All_locs.map(ven =>
          {
          return { lat: ven.location.lat, lng: ven.location.lng, clicked: ven.clicked }
          })}

          Close_window={this.Close}
          Marker_Click={this.Is_marker}
          error={this.ERROR}
           />

        {this.state.S_Loc && (<Info_display
          Loc={this.state.S_Loc}
          Four_Sq={
              require('react-foursquare')
              ({
                      clientID: 'N4SVD5OLBYMEBXRRNZ3ZZ42YPEKKZKIN2WMKWB0QGVS1A5CX',
                      clientSecret: 'WN2WQDBNP31HVPE3DW1ZCT5DWNXPP5SD04AUNVQZYLG5WO5J'}

                      )}
          Close_window={this.Close} />)}
         <div className='err'>OOOOPS Error Occurs </div>
      </div>
    );
  }
}

export default App;
