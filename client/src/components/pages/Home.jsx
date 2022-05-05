import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  height: 30px;
  width: 30px;
  border: 1px solid gray;
  font-size: 20px;
  background: none;
  margin-right: 10px;
  padding: 0;
  cursor: pointer;
  &:hover {
    background-color: #f2f3f4;
  }
`

export default function Home () {

  return (
    <Link to="/">
      <Button>&lsaquo;</Button>
    </Link>
  )
}
