const express = require('express');
const router = express.Router();
const controller = require('./controller')

router
  .route('/getShortQuote')
  .get(controller.getShortQuote)
router
  .route('/getMediumQuote')
  .get(controller.getMediumQuote)
router
  .route('/getLongQuote')
  .get(controller.getLongQuote)
router
  .route('/rating')
  .get(controller.refreshRating)
  .put(controller.submitRating)

module.exports = router;