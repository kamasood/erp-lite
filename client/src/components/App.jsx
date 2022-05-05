import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './Menu.jsx';
import Banner from './Banner.jsx';
import Widget from './Widget.jsx';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  font-family: Roboto;
`

const Header = styled.header`
  height: 150px;
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin: 50px 5% 0 5%;
`

const IconsContainer = styled.main`
`

export default function App () {
  return (
    <AppContainer>
      <Header>
        <Menu />
        <Banner />
        <Widget />
      </Header>
      <IconsContainer>
        <Outlet />
      </IconsContainer>
    </AppContainer>
  );
}
