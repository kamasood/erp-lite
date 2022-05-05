import React from 'react';
import styled from 'styled-components';

const Box = styled.button`
  height: 100px;
  width: 100px;
  border: 1px solid gray;
  background: none;
  box-shading: 1px 1px 2px gray;
  &:hover {
    background-color: #f2f3f4;
  }
`

export default function Menu() {
  return (
    <Box>Settings</Box>
  );
};
