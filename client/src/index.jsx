import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './components/App.jsx';
import Icons from './components/pages/Icons.jsx';
import Production from './components/pages/Production.jsx';
import Scheduling from './components/pages/Scheduling.jsx';
import Inventory from './components/pages/Inventory.jsx';
import Customers from './components/pages/Customers.jsx';
import Employees from './components/pages/Employees.jsx';
import Financials from './components/pages/Financials.jsx';
import WorkOrders from './components/pages/production/WorkOrders.jsx';
import WorkOrder from './components/pages/production/WorkOrder.jsx';
import Workstations from './components/pages/production/Workstations.jsx';
import Workstation from './components/pages/production/Workstation.jsx';
import Maintenance from './components/pages/production/Maintenance.jsx';
import ProductionAnalysis from './components/pages/production/ProductionAnalysis.jsx';
import Calendars from './components/pages/scheduling/Calendars.jsx';
import Events from './components/pages/scheduling/Events.jsx';
import Queue from './components/pages/scheduling/Queue.jsx';
import History from './components/pages/scheduling/History.jsx';
import Parts from './components/pages/inventory/Parts.jsx';
import Part from './components/pages/inventory/Part.jsx';
import Kits from './components/pages/inventory/Kits.jsx';
import Purchasing from './components/pages/inventory/Purchasing.jsx';
import Receiving from './components/pages/inventory/Receiving.jsx';
import CustomerDetails from './components/pages/customers/CustomerDetails.jsx';
import Customer from './components/pages/customers/Customer.jsx';
import Assets from './components/pages/customers/Assets.jsx';
import Asset from './components/pages/customers/Asset.jsx';
import Reminders from './components/pages/customers/Reminders.jsx';
import CustomerReports from './components/pages/customers/CustomerReports.jsx';
import EmployeeDetails from './components/pages/employees/EmployeeDetails.jsx';
import Employee from './components/pages/employees/Employee.jsx';
import Development from './components/pages/employees/Development.jsx';
import Benefits from './components/pages/employees/Benefits.jsx';
import Communication from './components/pages/employees/Communication.jsx';
import FinancialSummary from './components/pages/financials/FinancialSummary.jsx';
import Ledgers from './components/pages/financials/Ledgers.jsx';
import Adjustments from './components/pages/financials/Adjustments.jsx';
import Reports from './components/pages/financials/Reports.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<Icons />} />
        <Route path="production" element={<Production />}>
          <Route path="" element={<WorkOrders />}>
            <Route path=":woId" element={<WorkOrder />} />
          </Route>
          <Route path="workstations" element={<Workstations />}>
            <Route path=":wsId" element={<Workstation />} />
          </Route>
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="analysis" element={<ProductionAnalysis />} />
        </Route>
        <Route path="scheduling" element={<Scheduling />}>
          <Route path="" element={<Calendars />} />
          <Route path="calendars" element={<Calendars />} />
          <Route path="events" element={<Events />} />
          <Route path="queue" element={<Queue />} />
          <Route path="history" element={<History />} />
        </Route>
        <Route path="inventory" element={<Inventory />}>
          <Route path="" element={<Parts />}>
            <Route path=":partId" element={<Part />} />
          </Route>
          <Route path="kits" element={<Kits />} />
          <Route path="purchasing" element={<Purchasing />} />
          <Route path="receiving" element={<Receiving />} />
        </Route>
        <Route path="customers" element={<Customers />}>
          <Route path="" element={<CustomerDetails />}>
            <Route path=":customerId" element={<Customer />} />
          </Route>
          <Route path="assets" element={<Assets />}>
            <Route path=":assetId" element={<Asset />} />
          </Route>
          <Route path="reminders" element={<Reminders />} />
          <Route path="reports" element={<CustomerReports />} />
        </Route>
        <Route path="employees" element={<Employees />}>
          <Route path="" element={<EmployeeDetails />}>
            <Route path=":employeeId" element={<Employee />} />
          </Route>
          <Route path="development" element={<Development />} />
          <Route path="benefits" element={<Benefits />} />
          <Route path="communication" element={<Communication />} />
        </Route>
        <Route path="financials" element={<Financials />}>
          <Route path="" element={<FinancialSummary />} />
          <Route path="summary" element={<FinancialSummary />} />
          <Route path="ledgers" element={<Ledgers />} />
          <Route path="adjustments" element={<Adjustments />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />

      </Route>
    </Routes>
  </BrowserRouter>
);
