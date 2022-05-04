import React from 'react';
import { Link } from 'react-router-dom';

export default function Financials() {

  return (
    <>
      <header>
        <Link to="/">
          <button>Back</button>
        </Link>
        <h1>Financials</h1>
        <button>Settings</button>
      </header>
      <nav>
        <Link to="summary">
          <Tab style={{ borderLeft: "1px solid gray" }}>Summary</Tab>
        </Link>
        <Link to="ledgers">
          <Tab>Ledgers</Tab>
        </Link>
        <Link to="adjustments">
          <Tab>Adjustments</Tab>
        </Link>
        <Link to="reports">
          <Tab>Reports</Tab>
        </Link>
      </nav>
      <View>l
        <Outlet />
      </View>
    </>
  );
};
