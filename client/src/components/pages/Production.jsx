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

export default function Production() {

  return (
    <>
      <Header>
        <Link to="/">
          <button>Back</button>
          <button>Settings</button>
        </Link>
        <h1>Production</h1>

      </Header>
      <nav>
        <Link to="workorders">
          <Tab style={{ borderLeft: "1px solid gray" }}>Work Orders</Tab>
        </Link>
        <Link to="workstations">
          <Tab>Workstations</Tab>
        </Link>
        <Link to="maintenance">
          <Tab>Maintenance</Tab>
        </Link>
        <Link to="analysis">
          <Tab>Analysis</Tab>
        </Link>
      </nav>
      <View>
        <Outlet />
      </View>
    </>
  );
};
