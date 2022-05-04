import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.button`
  height: 300px;
  width: 300px;
  margin: 25px;
`

export default function Icons() {

  return (
    <>
      <Link to="/production">
        <Box>Production</Box>
      </Link>
      <Link to="/scheduling">
        <Box>Scheduling</Box>
      </Link>
      <Link to="/inventory">
        <Box>Inventory</Box>
      </Link>
      <Link to="/customers">
        <Box>Customers</Box>
      </Link>
      <Link to="/employees">
        <Box>Employees</Box>
      </Link>
      <Link to="/financials">
        <Box>Financials</Box>
      </Link>
    </>
  );
};
