import React, { Component } from 'react'

export default class newsItem extends Component {
  render() {
    
    // news card component with different props for different fields 
    let { title, description, imageUrl, newsUrl, publisher, date, sources } = this.props
    return (
      <div className='my-3'>
        <div className="card">
        <span className="position-absolute rounded-pill badge bg-danger" style={{ right: "0%", fontSize: "0.9rem" }}>{sources}</span>
          <img style={{ height: "200px", }} src={!imageUrl ? "https://images.hindustantimes.com/tech/img/2023/04/30/1600x900/helene2_cassini_1024_1682842803995_1682842814091.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {publisher ? publisher : "Unknow"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn  btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
