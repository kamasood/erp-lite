 \copy locations(name) FROM 'locations.csv' WITH CSV HEADER;

 \copy departments(name) FROM 'departments.csv' WITH CSV HEADER;

\copy operations(id, description, default_rate, department_id) FROM 'operations.csv' WITH CSV HEADER;

\copy workstations(name, created_date, status, department_id, cost, hours, last_maintenance, maintenance_cycle_months) FROM 'workstations.csv' WITH CSV HEADER;

\copy managers(name, emp_id, location_id) FROM 'managers.csv' WITH CSV HEADER;

\copy managers_departments(manager_id, department_id) FROM 'managers_departments.csv' WITH CSV HEADER;

\copy employees(first_name, last_name, email, address_1, address_2, city, state, zip, phone, "text_msg?", created_date, updated_date, location_id, manager_id) FROM 'employees.csv' WITH CSV HEADER;


