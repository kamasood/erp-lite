const express = require('express');
require('dotenv').config();

const router = express.Router();

// basic route
router.get('/', (req, res) => {
  res.status(200).send('ping! hello world.');
});

module.exports = router;
