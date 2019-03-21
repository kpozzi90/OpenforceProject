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
  }

}

module.exports = controller;