import React, { useState } from 'react';
import styled from 'styled-components';

const Status = styled.span`
  cursor: pointer;
  &:hover {
    text-shadow: .25px .25px 1px gray;
  }
`

export default function Banner() {

  const [plant1, setPlant1] = useState(true);
  const [plant2, setPlant2] = useState(true);



  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Manufacturing Inc.</h1>
        <h2>Plant 1: <Status
            style={plant1 ? { color: "green" } : { color: "red" }}
            onClick={() => setPlant1(!plant1)}
          >
            {plant1 ? 'Active' : 'Offline'}
          </Status> | Plant 2: <Status
            style={plant2 ? { color: "green" } : { color: "red" }}
            onClick={() => setPlant2(!plant2)}
          >
            {plant2 ? 'Active' : 'Offline'}
          </Status> | Active Employees: 6</h2>
      </div>
    </>
  );
};
