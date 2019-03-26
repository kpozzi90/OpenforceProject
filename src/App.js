import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Rating from './Rating.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quote: '',
      rating: 0,
    }
    this.getShortQuote = this.getShortQuote.bind(this);
    this.getMediumQuote = this.getMediumQuote.bind(this);
    this.getLongQuote = this.getLongQuote.bind(this);
    this.refreshRating = this.refreshRating.bind(this);
  }

  getShortQuote() {
    axios.get('/openforce/getShortQuote')
      .then((res) => {
        this.setState({
          quote: res.data.rows[0].quote,
          // set rating rounded to two decimal places
          rating: Math.round(res.data.rows[0].rating * 100) / 100,
        })
      })
  }

  getMediumQuote() {
    axios.get('/openforce/getMediumQuote')
      .then((res) => {
        this.setState({
          quote: res.data.rows[0].quote,
          rating: Math.round(res.data.rows[0].rating * 100) / 100,
        })
      })
  }

  getLongQuote() {
    axios.get('/openforce/getLongQuote')
      .then((res) => {
        this.setState({
          quote: res.data.rows[0].quote,
          rating: Math.round(res.data.rows[0].rating * 100) / 100,
        })
      })
  }

  refreshRating() {
    axios.get('openforce/rating', {params: this.state.quote})
      .then((res) => {
        this.setState({
          rating: Math.round(res.data.rows[0].rating * 100) / 100
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <button onClick = {this.getShortQuote}>get a short quote</button>
        <button onClick = {this.getMediumQuote}>get a medium quote</button>
        <button onClick = {this.getLongQuote}>get a long quote</button>
        <p>{this.state.quote}</p>
        <Rating quote = {this.state.quote} rating = {this.state.rating} refreshRating = {this.refreshRating}/>
      </div>
    );
  }
}

export default App;