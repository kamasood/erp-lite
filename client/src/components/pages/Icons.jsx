import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.button`
  height: 350px;
  width: 350px;
  margin: 40px 60px;
  border: 1px solid gray;
  background: none;
  box-shading: 1px 1px 2px gray;
  &:hover {
    background-color: #f2f3f4;
  }
`

export default function Icons() {

  return (
    <>
      <Link to="/production">
        <Box>Production</Box>
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
      <Link to="/scheduling">
        <Box>Scheduling</Box>
      </Link>
      <Link to="/financials">
        <Box>Financials</Box>
      </Link>
    </>
  );
};
