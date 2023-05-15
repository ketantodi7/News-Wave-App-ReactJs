import './App.css';
import Navbar from './components/navbar';
import Newscompo from './components/newscompo';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import React, { Component } from 'react';

export default class App extends Component {

  // **********giving the page size and importing the NewsApi key from .env.local file**********
  pageSize = 9;
  apiKey = process.env.REACT_APP_NEWS_KEY


  state = {
    progress: 0 // *********using the react top loading bar library setting the progress initial stage**********
  }

  setProgress = (progress) => {
    this.setState({ progress: progress }); // *********Updating the progress set progress for loading bar**********
  }

  render() {
    return (
      <div>
        {/* using react router dom version 6.11.1 to build the routing part  */}
        <BrowserRouter>
          <Navbar></Navbar>
          <LoadingBar color='#f11946'height={3}progress={this.state.progress}/>
          
          <Routes>
            {/* routing through different category of the news app  */}
            <Route exact path="/" element={<Newscompo setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country={"in"} category='general' />} />
            <Route exact path="/entertainment" element={<Newscompo setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country={"in"} category='entertainment' />} />
            <Route exact path="/business" element={<Newscompo setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country={"in"} category='business' />} />
            <Route exact path="/health" element={<Newscompo setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country={"in"} category='health' />} />
            <Route exact path="/science" element={<Newscompo setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country={"in"} category='science' />} />
            <Route exact path="/sports" element={<Newscompo setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country={"in"} category='sports' />} />
            <Route exact path="/technology" element={<Newscompo setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country={"in"} category='technology' />} />
            <Route exact path="/general" element={<Newscompo setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country={"in"} category='general' />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}