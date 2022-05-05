require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'kamranmasood',
  host: 'localhost',
  database: 'mvp',
  password: null,
  port: 5432
});

module.exports = pool;
