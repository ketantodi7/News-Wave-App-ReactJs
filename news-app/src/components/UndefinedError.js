import React, { Component } from 'react'

export default class UndefinedError extends Component {
  // component to be show we the news app encountered a bad request or any internal or api error 
  render() {
    return (
      <div className="card-body">
        <h5 className="card-title my-3">WE ARE SORRY</h5>
        <p className="card-text">Something Went Wrong. Try Again Later</p>
      </div>
    )
  }
}
