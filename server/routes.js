const express = require('express');
const path = require('path');
require('dotenv').config();

const router = express.Router();
const db = require('./db');

// GET routes

const defaultCount = 20;

router.get('/departments', (req, res) => {
  const count = req.query.count || defaultCount;
  db.query(`
    SELECT *
    FROM departments
    OFFSET $1
    LIMIT $2
    `,
    [count]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/employees', (req, res) => {
  const count = req.query.count || defaultCount;
  db.query(`
    SELECT *
    FROM employees
    LIMIT $1
    `,
    [count]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/employees/:employee_id', (req, res) => {
  db.query(`
    SELECT *
    FROM employees
    WHERE id = $1
    `,
    [req.params.employee_id]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/locations', (req, res) => {
  const count = req.query.count || defaultCount;
  db.query(`
    SELECT *
    FROM locations
    LIMIT $1
    `,
    [count]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/managers', (req, res) => {
  const count = req.query.count || defaultCount;
  db.query(`
    SELECT *
    FROM managers
    LIMIT $1
    `,
    [count]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/operations', (req, res) => {
  const count = req.query.count || defaultCount;
  db.query(`
    SELECT *
    FROM operations
    LIMIT $1
    `,
    [count]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/workstations', (req, res) => {
  const count = req.query.count || defaultCount;
  db.query(`
    SELECT *
    FROM workstations
    LIMIT $1
    `,
    [count]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/workstations/:ws_id', (req, res) => {
  db.query(`
    SELECT *
    FROM workstations
    WHERE id = $1
    `,
    [req.params.ws_id]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/customers', (req, res) => {
  const count = req.query.count || defaultCount;
  db.query(`
    SELECT *
    FROM customers
    LIMIT $1
    `,
    [count]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/customers/:customer_id', (req, res) => {
  db.query(`
    SELECT *
    FROM customers
    WHERE id = $1
    `,
    [req.params.customer_id]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/assets', (req, res) => {
  const count = req.query.count || defaultCount;
  db.query(`
    SELECT *
    FROM assets
    LIMIT $1
    `,
    [count]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/assets/:asset_id', (req, res) => {
  db.query(`
    SELECT *
    FROM assets
    WHERE id = $1
    `,
    [req.params.asset_id]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/parts', (req, res) => {
  const count = req.query.count || defaultCount;
  db.query(`
    SELECT *
    FROM parts
    LIMIT $1
    `,
    [count]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/parts/:part_id', (req, res) => {
  db.query(`
    SELECT *
    FROM parts
    WHERE id = $1
    `,
    [req.params.part_id]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/workorders', (req, res) => {
  const count = req.query.count || defaultCount;
  db.query(`
    SELECT *
    FROM work_orders
    LIMIT $1
    `,
    [count]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/workorders/:wo_id', (req, res) => {
  db.query(`
    SELECT *
    FROM work_orders
    WHERE id = $1
    `,
    [req.params.wo_id]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/maintenance', (req, res) => {
  const count = req.query.count || defaultCount;
  db.query(`
    SELECT *
    FROM maintenance
    LIMIT $1
    `,
    [count]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

router.get('/maintenance/:mo_id', (req, res) => {
  db.query(`
    SELECT *
    FROM maintenance
    WHERE id = $1
    `,
    [req.params.mo_id]
  )
    .then(({ rows }) => res.send(rows))
    .catch(err => res.status(500).send(err));
});

// POST routes

router.post('/workstations', (req, res) => {
  const { name, department_id, cost, maintenance_cycle } = req.body;
  db.query(`
    INSERT INTO workstations
      (name, created_date, status, department_id, cost, hours, last_maintenance, maintenance_cycle_months)
    VALUES
      ($1, current_timestamp, true, $2, $3, 0, current_timestamp, $4)
    `,
    [name, department_id, cost, maintenance_cycle]
  )
    .then(() => res.sendStatus(201))
    .catch(err => res.status(500).send(err));
});

router.post('/customers', (req, res) => {
  const { first_name, last_name, email, address_1, address_2, city, state, zip, phone, manager_id } = req.body;

  db.query(`
    INSERT INTO customers
      (first_name, last_name, email, address_1, address_2, city, state, zip, phone, created_date, updated_date, manager_id)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, current_timestamp, current_timestamp, $10)
    `,
    [first_name, last_name, email, address_1, address_2, city, state, zip, phone, manager_id]
  )
    .then(() => res.sendStatus(201))
    .catch(err => res.status(500).send(err));
});

router.post('/employees', (req, res) => {
  const { first_name, last_name, email, address_1, address_2, city, state, zip, phone, location_id, manager_id } = req.body;

  db.query(`
    INSERT INTO employees
      (first_name, last_name, email, address_1, address_2, city, state, zip, phone, created_date, updated_date, location_id, manager_id)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, current_timestamp, current_timestamp, $10, $11)
    `,
    [first_name, last_name, email, address_1, address_2, city, state, zip, phone, location_id, manager_id]
  )
    .then(() => res.sendStatus(201))
    .catch(err => res.status(500).send(err));
});

router.post('/assets', (req, res) => {
  const { customer_id, name, manufacturer, model, year, size, location } = req.body;

  db.query(`
    INSERT INTO assets
      (customer_id, name, manufacturer, model, year, size, location, created_date, updated_date)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, current_timestamp, current_timestamp)
    `,
    [customer_id, name, manufacturer, model, year, size, location]
  )
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    });
});

router.post('/parts', (req, res) => {
  const { part_number, description, subclass, department_id, list_price, retail_price, keywords, notes } = req.body;

  db.query(`
    INSERT INTO parts
      (part_number, description, subclass, department_id, list_price, retail_price, WAC, keywords, notes, qty_onhand, updated_date)
    VALUES
      ($1, $2, $3, $4, $5, $6, 0, $7, $8, 0, current_timestamp)
    `,
    [part_number, description, subclass, department_id, list_price, retail_price, keywords, notes]
  )
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    });
});

router.post('/workorders', (req, res) => {
  const { customer_id, asset_id, name, description, begin_date, location_id, manager_id } = req.body;

  db.query(`
    INSERT INTO work_orders
      (customer_id, asset_id, name, description, begin_date, updated_date, status, location_id, manager_id)
    VALUES
      ($1, $2, $3, $4, $5, current_timestamp, true, $6, $7)
    `,
    [customer_id, asset_id, name, description, begin_date, location_id, manager_id]
  )
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    });
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
