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

export default function Scheduling() {

  return (
    <>
      <Header>
        <Link to="/">
          <button>Back</button>
        </Link>
        <h1>Scheduling</h1>
        <button>Settings</button>
      </Header>
      <nav>
        <Link to="calendars">
          <Tab style={{ borderLeft: "1px solid gray" }}>Calendar</Tab>
        </Link>
        <Link to="events">
          <Tab>Events</Tab>
        </Link>
        <Link to="queue">
          <Tab>Queue</Tab>
        </Link>
        <Link to="history">
          <Tab>History</Tab>
        </Link>
      </nav>
      <View>
        <Outlet />
      </View>
    </>
  );
};
