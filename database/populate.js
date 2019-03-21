const axios = require('axios');
const { db } = require('./index.js');

//use this to initially populate database by taking all quotes from API
const populate = () => {
  axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes/1000')
    .then((res) => {
      let quotes = res.data
      let values = ``;
      //iterate through each quote and add it into the values string in a format that can be read by postgresql
      for (let i = 0; i < quotes.length; i++) {
        let quote = quotes[i];
        //check for apostrophes and double them for postgresql formatting
        for (let n = 0; n < quote.length; n++) {
          if(quote[n] ===`'`) {
            let newQuote = quote.slice(0,n) + `'` + quote.slice(n)
            quote = newQuote
            n++
          }
        }
        //grab length and add to database so we can distinguish between short, medium, and long quotes
        let length = quote.split(' ').length;
        values += `('${quote}', 0, 0, ${length}),`
      }
      values = values.slice(0, -1);
      db.query(`INSERT INTO quotes(quote, rating, votes, length) VALUES${values}`)
        .then(res => console.log(res))
        .catch(err => console.log(err.stack))
    })
    .catch((err) => {
      console.log(err)
    })
}

populate();