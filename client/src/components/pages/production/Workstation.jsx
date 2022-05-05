import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

const Details = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
`

export default function WorkStation() {

  const params = useParams();
  const workstations = useOutletContext();
  const workstation = workstations.find(workstation => workstation.id === parseInt(params.wsId, 10));

  return (
    <Details>
      <h2>Details</h2>
      <br/>
      <div>Workstation ID: {workstation.id}</div>
      <div>Name: {workstation.name}</div>
      <div>Department: {workstation.department_id}</div>
      <div>Hours: {workstation.hours}</div>
      <div>Status: {workstation.status}</div>
      <div>Last Maintained: {workstation.last_maintenance}</div>
      <div>Maintenance Cycle: {workstation.maintenance_cycle_months} Months</div>
      <div>Cost: {workstation.cost}</div>
    </Details>
  );
};
