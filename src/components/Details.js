import React, { Component } from 'react';
import Geocode from 'react-geocode';
import escapeRegExp from 'escape-string-regexp';
import istanbul from '../images/istanbul.png';
/*
|--------------------------------------------------------------------------
| Google Maps Api by built in function in the Module
|--------------------------------------------------------------------------
*/
Geocode.setApiKey('AIzaSyCHCHK9TsmYNqXRlGYFhl8Gc0p7IawJYOw');

class Location_details extends Component {
  state = {
    All_locs: [],
    query: ''
  }





     Query_founder = () => {
      const { query } = this.state;
  
      return <input
          className='box'
          type='text'
          value={query}
          role="search"
          aria-label="searchbutton"
        onChange={event => this.Update(event.target.value)}
          placeholder='Select Your masjed' />
    }


    Update = (query) => {
      this.setState({ query }, () => {this.props.Mar_option(this.Location_filtration());});
    }

    Prev_places = ()=>{
      return (
        <ol
            className='loc'
            role='listbox'
            aria-label='Location _list'

        >
          {this.Location_filtration().map((t, num) =>
            <li
                tabIndex="0"
                className='one'
                key={num}
                role='option'
                onClick={() => {this.props.On_Loc(num)}}> {t.name}
            </li>
          )}
        </ol>
      )
    }

    Location_filtration = () => {

      const { query, All_locs } = this.state;
  
      while(this.state ==='') {
        return All_locs;
      }
      return All_locs.filter(t => new RegExp(escapeRegExp(query), 'i').test(t.name));
    }
  
  Googleplex = () =>{
   Geocode.fromAddress("Googleplex").then(Res =>
       {
        const { lat, lng } = Res.results[0].geometry.location;
        this.props.Four_Sq.venues.getVenues
        ({
          'll': `${lat},${lng}`,
          'categoryId': '4bf58dd8d48988d138941735'
        }).then(s =>
        {
          const L = s.response.venues;
          this.props.Mar_option(L);
          this.setState({ All_locs: L });
        });
      }
    );
}

/*
|--------------------------------------------------------------------------
|  called once all our children Elements and our Component instances are mounted onto the Native UI
|--------------------------------------------------------------------------
*/
  componentDidMount() {
   this.Googleplex();
  }

  render() {
    return (
      <div>
        <div className='Navbar'>
          <div className='header' role='heading' >
              <img src={istanbul} alt=""/>
              <h1 className='title'>Sample Of Best Mosques</h1>
            {this.Query_founder()}
          </div>
          <div className='Loc_list' role='region'>
            {this.Prev_places()}
          </div>
        </div>
        
      </div>
    );
  }
}

  export default Location_details;
