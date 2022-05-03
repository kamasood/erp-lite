CREATE DATABASE mvp;
\c mvp;

-- locations

CREATE TABLE locations (
  id SERIAL,
  name VARCHAR,
  PRIMARY KEY (id)
);

-- departments

CREATE TABLE departments (
  id SERIAL,
  name VARCHAR,
  PRIMARY KEY (id)
);

-- customers

CREATE TABLE customers (
  id SERIAL,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  address_1 VARCHAR,
  address_2 VARCHAR,
  city VARCHAR,
  state VARCHAR,
  zip VARCHAR,
  phone VARCHAR,
  "text_msg?" BOOLEAN,
  created_date TIMESTAMP,
  updated_date TIMESTAMP,
  manager_id INTEGER,
  PRIMARY KEY (id)
);

-- assets


CREATE TABLE assets (
  id SERIAL,
  customer_id INTEGER,
  make VARCHAR,
  model VARCHAR,
  year INTEGER,
  length REAL,
  location VARCHAR,
  created_date TIMESTAMP,
  updated_date TIMESTAMP,
  PRIMARY KEY (id)
);

-- work_orders

CREATE TABLE work_orders (
  id SERIAL,
  customer_id INTEGER,
  asset_id INTEGER,
  begin_date TIMESTAMP,
  updated_date TIMESTAMP,
  completed_date TIMESTAMP,
  "open?" BOOLEAN,
  location_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id)
);

-- wo_operations

CREATE TABLE wo_operations (
  id SERIAL,
  wo_id INTEGER,
  operation_id INTEGER,
  rate INTEGER,
  PRIMARY KEY (id)
);

-- operations

CREATE TABLE operations (
  id SERIAL,
  description VARCHAR,
  default_rate INTEGER,
  department_id INTEGER,
  PRIMARY KEY (id)
);

-- employees

CREATE TABLE employees (
  id SERIAL,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  address_1 VARCHAR,
  address_2 VARCHAR,
  city VARCHAR,
  state VARCHAR,
  zip VARCHAR,
  phone VARCHAR,
  "text_msg?" BOOLEAN,
  location_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id)
);

-- wo_labor

CREATE TABLE wo_labor (
  id SERIAL,
  emp_id INTEGER,
  wo_id INTEGER,
  date TIMESTAMP,
  hours INTEGER,
  description VARCHAR,
  notes VARCHAR,
  "completed?" BOOLEAN,
  op_id INTEGER,
  PRIMARY KEY (id)
);

-- parts

CREATE TABLE parts (
  id SERIAL,
  description VARCHAR,
  class VARCHAR,
  subclass VARCHAR,
  department_id INTEGER,
  list_price REAL,
  retail_price REAL,
  WAC REAL,
  keywords VARCHAR,
  notes VARCHAR,
  qty_onhand REAL,
  qty_available REAL,
  qty_onorder REAL,
  thumb_url VARCHAR,
  updated_date TIMESTAMP,
  PRIMARY KEY (id)
);

-- vendors

CREATE TABLE vendors (
  id SERIAL,
  name VARCHAR,
  class VARCHAR,
  email VARCHAR,
  phone VARCHAR,
  address_1 VARCHAR,
  address_2 VARCHAR,
  city VARCHAR,
  state VARCHAR,
  zip VARCHAR,
  fax VARCHAR,
  URL VARCHAR,
  PRIMARY KEY (id)
);

-- purchase_orders

CREATE TABLE purchase_orders (
  id SERIAL,
  vendor_id INTEGER,
  order_date TIMESTAMP,
  expected_date TIMESTAMP,
  received_date TIMESTAMP,
  "open?" BOOLEAN,
  parent_po INTEGER,
  PRIMARY KEY (id)
);

-- parts_photos

CREATE TABLE parts_photos (
  id SERIAL,
  part_id INTEGER,
  url VARCHAR,
  description VARCHAR,
  PRIMARY KEY (id)
);

-- assets_photos

CREATE TABLE assets_photos (
  id SERIAL,
  asset_id INTEGER,
  url VARCHAR,
  description VARCHAR,
  notes VARCHAR,
  created_date TIMESTAMP,
  PRIMARY KEY (id)
);

-- purchase_orders_entries

CREATE TABLE purchase_orders_entries (
  id SERIAL,
  po_id INTEGER,
  part_id INTEGER,
  qty REAL,
  "special_order?" BOOLEAN,
  wo_id INTEGER,
  PRIMARY KEY (id)
);

-- parts_costs

CREATE TABLE parts_costs (
  id SERIAL,
  part_id INTEGER,
  vendor_id INTEGER,
  buy_qty INTEGER,
  cost REAL,
  updated_date TIMESTAMP,
  PRIMARY KEY (id)
);

-- workstations

CREATE TABLE workstations (
  id SERIAL,
  name VARCHAR,
  created_date TIMESTAMP,
  "online?" BOOLEAN,
  department_id INTEGER,
  cost REAL,
  hours REAL,
  last_maintenance TIMESTAMP,
  next_maintenance TIMESTAMP,
  PRIMARY KEY (id)
);

-- maintenance

CREATE TABLE maintenance (
  id SERIAL,
  workstation_id INTEGER,
  tool_id INTEGER,
  expected_date TIMESTAMP,
  completed_date TIMESTAMP,
  description VARCHAR,
  cost REAL,
  emp_id INTEGER,
  sub_id INTEGER,
  manager_id INTEGER,
  "approved?" BOOLEAN,
  hours REAL,
  notes VARCHAR,
  PRIMARY KEY (id)
);

-- wo_parts

CREATE TABLE wo_parts (
  id SERIAL,
  wo_id INTEGER,
  part_id INTEGER,
  qty REAL,
  emp_id INTEGER,
  notes VARCHAR,
  "on_order?" BOOLEAN,
  PRIMARY KEY (id)
);

-- calendars

CREATE TABLE calendars (
  id SERIAL,
  name VARCHAR,
  location_id INTEGER,
  department_id INTEGER,
  "restricted?" BOOLEAN,
  PRIMARY KEY (id)
);

-- calendars_entries

CREATE TABLE calendars_entries (
  id SERIAL,
  calendar_id INTEGER,
  date TIMESTAMP,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  wo_id INTEGER,
  maintenance_id INTEGER,
  emp_id INTEGER,
  manager_id INTEGER,
  "placeholder?" BOOLEAN,
  customer_id INTEGER,
  PRIMARY KEY (id)
);

-- managers

CREATE TABLE managers (
  id SERIAL,
  name VARCHAR,
  emp_id INTEGER,
  location_id INTEGER,
  PRIMARY KEY (id)
);

-- managers_departments

CREATE TABLE managers_departments (
  id SERIAL,
  manager_id INTEGER,
  department_id INTEGER,
  PRIMARY KEY (id)
);

-- tools

CREATE TABLE tools (
  id SERIAL,
  name VARCHAR,
  "hourly?" BOOLEAN,
  price REAL,
  rate REAL,
  cost REAL,
  last_maintenance TIMESTAMP,
  next_maintenance TIMESTAMP,
  location VARCHAR,
  "available?" BOOLEAN,
  PRIMARY KEY (id)
);

-- wo_tools

CREATE TABLE wo_tools (
  id SERIAL,
  tool_id INTEGER,
  emp_id INTEGER,
  wo_id INTEGER,
  "returned?" BOOLEAN,
  PRIMARY KEY (id)
);

-- foreign keys

ALTER TABLE customers ADD FOREIGN KEY (manager_id) REFERENCES managers (id);
ALTER TABLE assets ADD FOREIGN KEY (customer_id) REFERENCES customers (id);
ALTER TABLE work_orders ADD FOREIGN KEY (customer_id) REFERENCES customers (id);
ALTER TABLE work_orders ADD FOREIGN KEY (manager_id) REFERENCES managers (id);
ALTER TABLE work_orders ADD FOREIGN KEY (location_id) REFERENCES locations (id);
ALTER TABLE wo_operations ADD FOREIGN KEY (wo_id) REFERENCES work_orders (id);
ALTER TABLE wo_operations ADD FOREIGN KEY (operation_id) REFERENCES operations (id);
ALTER TABLE operations ADD FOREIGN KEY (department_id) REFERENCES departments (id);
ALTER TABLE employees ADD FOREIGN KEY (manager_id) REFERENCES managers (id);
ALTER TABLE employees ADD FOREIGN KEY (location_id) REFERENCES locations(id);
ALTER TABLE wo_labor ADD FOREIGN KEY (emp_id) REFERENCES employees (id);
ALTER TABLE wo_labor ADD FOREIGN KEY (wo_id) REFERENCES work_orders (id);
ALTER TABLE wo_labor ADD FOREIGN KEY (op_id) REFERENCES wo_operations (id);
ALTER TABLE parts ADD FOREIGN KEY (department_id) REFERENCES departments (id);
ALTER TABLE purchase_orders ADD FOREIGN KEY (vendor_id) REFERENCES vendors (id);
ALTER TABLE parts_photos ADD FOREIGN KEY (part_id) REFERENCES parts (id);
ALTER TABLE assets_photos ADD FOREIGN KEY (asset_id) REFERENCES assets (id);
ALTER TABLE purchase_orders_entries ADD FOREIGN KEY (po_id) REFERENCES purchase_orders (id);
ALTER TABLE purchase_orders_entries ADD FOREIGN KEY (part_id) REFERENCES parts (id);
ALTER TABLE purchase_orders_entries ADD FOREIGN KEY (wo_id) REFERENCES work_orders (id);
ALTER TABLE parts_costs ADD FOREIGN KEY (part_id) REFERENCES parts (id);
ALTER TABLE parts_costs ADD FOREIGN KEY (vendor_id) REFERENCES vendors (id);
ALTER TABLE workstations ADD FOREIGN KEY (department_id) REFERENCES departments (id);
ALTER TABLE maintenance ADD FOREIGN KEY (workstation_id) REFERENCES workstations (id);
ALTER TABLE maintenance ADD FOREIGN KEY (tool_id) REFERENCES tools (id);
ALTER TABLE maintenance ADD FOREIGN KEY (emp_id) REFERENCES employees (id);
ALTER TABLE maintenance ADD FOREIGN KEY (manager_id) REFERENCES managers (id);
ALTER TABLE managers ADD FOREIGN KEY (location_id) REFERENCES locations (id);
ALTER TABLE managers_departments ADD FOREIGN KEY (manager_id) REFERENCES managers (id);
ALTER TABLE managers_departments ADD FOREIGN KEY (department_id) REFERENCES departments (id);
ALTER TABLE wo_parts ADD FOREIGN KEY (wo_id) REFERENCES work_orders (id);
ALTER TABLE wo_parts ADD FOREIGN KEY (part_id) REFERENCES parts (id);
ALTER TABLE calendars ADD FOREIGN KEY (location_id) REFERENCES locations (id);
ALTER TABLE calendars ADD FOREIGN KEY (department_id) REFERENCES departments (id);
ALTER TABLE calendars_entries ADD FOREIGN KEY (calendar_id) REFERENCES calendars (id);
ALTER TABLE calendars_entries ADD FOREIGN KEY (wo_id) REFERENCES work_orders (id);
ALTER TABLE calendars_entries ADD FOREIGN KEY (maintenance_id) REFERENCES maintenance (id);
ALTER TABLE calendars_entries ADD FOREIGN KEY (emp_id) REFERENCES employees (id);
ALTER TABLE calendars_entries ADD FOREIGN KEY (manager_id) REFERENCES managers (id);
ALTER TABLE calendars_entries ADD FOREIGN KEY (customer_id) REFERENCES customers (id);
ALTER TABLE wo_tools ADD FOREIGN KEY (tool_id) REFERENCES tools (id);
ALTER TABLE wo_tools ADD FOREIGN KEY (emp_id) REFERENCES employees (id);
ALTER TABLE wo_tools ADD FOREIGN KEY (wo_id) REFERENCES work_orders (id);