const { db } = require('../database/index.js');

const controller = {
  
  getShortQuote: (req, res) => {
    db.query('SELECT * FROM quotes WHERE length < 5 ORDER BY RANDOM() LIMIT 1')
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })
  },

  getMediumQuote: (req, res) => {
    db.query('SELECT * FROM quotes WHERE length > 4 AND length < 13 ORDER BY RANDOM() LIMIT 1')
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })
  },

  getLongQuote: (req, res) => {
    db.query('SELECT * FROM quotes WHERE length > 12 ORDER BY RANDOM() LIMIT 1')
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })
  },

  refreshRating: (req, res) => {
    let quote = req.query['0'];
    //switch apostrophes to double apostrophes for postgresql syntax
    for (let i = 0; i < quote.length; i++) {
      if(quote[i] ===`'`) {
        let newQuote = quote.slice(0,i) + `'` + quote.slice(i)
        quote = newQuote
        i++
      }
    }
    db.query(`SELECT rating FROM quotes WHERE quote = '${quote}'`)
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  },

  submitRating: (req, res) => {
    let quote = req.body.quote;
    //switch apostrophes to double apostrophes for postgresql syntax
    for (let i = 0; i < quote.length; i++) {
      if(quote[i] ===`'`) {
        let newQuote = quote.slice(0,i) + `'` + quote.slice(i)
        quote = newQuote
        i++
      };
    };
    db.query(`SELECT * FROM quotes WHERE quote = '${quote}'`)
      .then((data) => {
        let info = data.rows[0]
        //create new rating by using a weighted average based on pervious rating and number of votes
        let newRating = (parseFloat(info.rating) * info.votes + parseFloat(req.body.score)) / (info.votes + 1)
        db.query(`UPDATE quotes SET rating = ${newRating}, votes = ${info.votes + 1} WHERE quote = '${quote}'`)
          .then((data)=> {
            data.newRating = newRating;
            res.send(data)
          })
          .catch((err) => {
            console.log(err);
            res.send(err);
          })
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })
  }

}

module.exports = controller;