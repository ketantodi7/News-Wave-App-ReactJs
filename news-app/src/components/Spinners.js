import React, { Component } from 'react';
import pinwheel from "./Pinwheel.gif";

// scroll wheel component
export default class Spinners extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className="my-3" src={pinwheel} alt="loading2" />
      </div>
    )
  }
}


