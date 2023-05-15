import React, { Component } from "react";
import NewsItem from "./newsItem";
import Spinners from "./Spinners";
import PropTypes from 'prop-types'
import UndefinedError from "./UndefinedError";
import InfiniteScroll from "react-infinite-scroll-component";

export default class newscompo extends Component {
  // Default Porps passing
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'science',
  }

  // capitalize function To Capitalize some words in the app
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // props types
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = { // state intialization in the start 
      articles: [],
      loading: true,
      page: 1,
      undefined: false,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Wave `;
  }

  // updateNow function is called to update the news if a user scroll the the page or changes the category in the news app using the navbar 
  async updateNow() {
    this.props.setProgress(10); // updating progress for nav bar
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true }); // to show the loading scroll gif if loading = true
    let data = await fetch(apiUrl); // fetch data
    this.props.setProgress(30); 
    let parseData = await data.json();
    this.props.setProgress(80);
    this.setState({ // changing the state 
      articles: parseData.articles ? parseData.articles : [] && this.setState({
        undefined: true
      }),
      totalResults: parseData.totalResults ? parseData.totalResults : 0,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNow();
  }
// fetchMoreData is used to fetch the news whenevr a use scroll the page and concat the articles with the old articles.
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(apiUrl);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults ? parseData.totalResults : 0,
    });
  };
  
/*  ************************************** to add buttons in the app to go to next and previous page ************************************************************
  prev_page = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNow();
  };

  next_page = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNow();
  };
*************************************************************************************************************************************************************  */

  // render will start from here
  render() {
    return (
      <>
        {!this.state.undefined ? <div>
          <h1 style={{ margin: "30px 0px ", textAlign: "center" }}>News Wave - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
          {this.state.loading && <Spinners />}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinners />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => {
                  return <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} publisher={element.author} date={element.publishedAt} sources={element.source.name} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div> : this.state.undefined && <UndefinedError />}

        {/* !*******************************************************************************************************************************!
                          this code can be use to add buttons to load the news if not using infinite scrolling

           <div className=" d-flex justify-content-between">
            <button disabled={this.state.page <= 1} className="btn btn-primary" type="submit" onClick={this.prev_page}>Previous</button>
            <button
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults ? this.state.totalResults : 0 / this.props.pageSize)}
              className="btn btn-primary "
              type="submit"
              onClick={this.next_page}
            >
              Next
            </button>

          </div>
        </div>  
!************************************************************************************************************************************! */}
      </>
    );
  }
}


