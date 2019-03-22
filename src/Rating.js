import React, { Component } from 'react';
import './Rating.css';
import axios from 'axios';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRating: 1,
    }
    this.rateQuote = this.rateQuote.bind(this);
    this.submitRating = this.submitRating.bind(this);
  }

  rateQuote(e) {
    this.setState({
      newRating: e.target.value,
    })
  }

  submitRating() {
    axios.put('/openforce/rating', { 
      score: this.state.newRating,
      quote: this.props.quote
     })
      .then( (res) => {
        this.props.refreshRating()
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <p>{this.props.quote === '' ? '' : this.props.rating === 0 ? 'This quote has no ratings yet' :
         this.props.rating.toString() + ' / 5'}</p>
          <label>
            Rate this quote:
            <select onChange = {this.rateQuote}>
            <option value = '1' >1</option>
            <option value = '2' >2</option>
            <option value = '3' >3</option>
            <option value = '4' >4</option>
            <option value = '5' >5</option>
          </select>
         </label>
         <button onClick = {this.submitRating}>Rate!</button>
      </div>
    );
  }
}

export default Rating;