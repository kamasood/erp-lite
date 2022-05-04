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

export default function Employees() {

  return (
    <>
      <Header>
        <Link to="/">
          <button>Back</button>
        </Link>
        <h1>Employees</h1>
        <button>Settings</button>
      </Header>
      <nav>
        <Link to="details">
          <Tab style={{ borderLeft: "1px solid gray" }}>Employees</Tab>
        </Link>
        <Link to="development">
          <Tab>Development</Tab>
        </Link>
        <Link to="benefits">
          <Tab>Benefits</Tab>
        </Link>
        <Link to="communication">
          <Tab>Communication</Tab>
        </Link>
      </nav>
      <View>
        <Outlet />
      </View>
    </>
  );
};
