import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  height: 100px;
`

const Tab = styled.button`
  height: 50px;
  width: 200px;
  margin-top: 25px;
  border-top: 1px solid gray;
  border-right: 1px solid gray;
  border-bottom: none;
  border-left: none;
  background: none;
  &:hover {
    background-color: #f2f3f4;
  }
`

const View = styled.section`
  box-sizing: border-box;
  border: 1px solid gray;
  height: 625px;
`

export default function Customers() {

  return (
    <>
      <Header>
        <Link to="/">
          <button>Back</button>
        </Link>
        <h1>Customers</h1>
        <button>Settings</button>
      </Header>
      <nav>
        <Link to="details">
          <Tab style={{ borderLeft: "1px solid gray" }}>Customers</Tab>
        </Link>
        <Link to="assets">
          <Tab>Assets</Tab>
        </Link>
        <Link to="reminders">
          <Tab>Reminders</Tab>
        </Link>
        <Link to="reports">
          <Tab>Reports</Tab>
        </Link>
      </nav>
      <View>
        <Outlet />
      </View>
    </>
  );
};
