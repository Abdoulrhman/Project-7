import Draggable from 'react-draggable';
import React from 'react';


class Info_display extends React.Component {


    render() {
      const { Loc: Location } = this.props;
  
      return (
      <Draggable>
        <article className='Show' >
          <h1 className='Loc_info' >Mosque Info</h1>
          <h2 className='Loc_name'>{Location.name}</h2>
          <h3 className='Exit_display' onClick={() => {this.props.Close_window()}} > X </h3>
          <h3 className='Add'> Address: {Location.location.address}, {Location.location.city}</h3>
          <p className='Set'>TypeOfPlace: {Location.categories[0].name}</p>
        </article>
      </Draggable>
      )
    }
  }

  export default Info_display;


  