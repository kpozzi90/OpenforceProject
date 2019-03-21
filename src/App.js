import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quote: '',
      rating: '',
    }
    this.getShortQuote = this.getShortQuote.bind(this);
    this.getMediumQuote = this.getMediumQuote.bind(this);
    this.getLongQuote = this.getLongQuote.bind(this);
  }

  getShortQuote() {
    axios.get('/openforce/getShortQuote')
      .then((res) => {
        this.setState({
          quote: res.data.rows[0].quote,
          rating: res.data.rows[0].rating
        })
      })
  }

  getMediumQuote() {
    axios.get('/openforce/getMediumQuote')
      .then((res) => {
        this.setState({
          quote: res.data.rows[0].quote,
          rating: res.data.rows[0].rating
        })
      })
  }

  getLongQuote() {
    axios.get('/openforce/getLongQuote')
      .then((res) => {
        this.setState({
          quote: res.data.rows[0].quote,
          rating: res.data.rows[0].rating
        })
      })
  }

  render() {
    return (
      <div>
        <button onClick = {this.getShortQuote}>get a short quote</button>
        <button onClick = {this.getMediumQuote}>get a medium quote</button>
        <button onClick = {this.getLongQuote}>get a long quote</button>
        <p>{this.state.quote}</p>
        <p>{this.state.quote === '' ? '' : this.state.rating === '0' ? 'This quote has no ratings yet' : this.state.rating.toString() + ' / 5'}</p>
      </div>
    );
  }
}

export default App;