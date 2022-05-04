const express = require('express');
const path = require('path');
require('dotenv').config();

const router = express.Router();

// basic route
router.get('/', (req, res) => {
  res.status(200).send('ping! hello world.');
});

// deal with react router refresh issue
router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = router;
