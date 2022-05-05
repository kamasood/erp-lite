import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

const Details = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
`

export default function Employee() {

  const params = useParams();
  const employees = useOutletContext();
  const employee = employees.find(employee => employee.id === parseInt(params.employeeId, 10));

  return (
    <Details>
      <h2>Details</h2>
      <br/>
      <div>Employee ID: {employee.id}</div>
      <div>Name: {employee.first_name + ' ' + employee.last_name}</div>
      <div>Email: {employee.email}</div>
      <div>Phone: {employee.phone}</div>
      <div>Address:</div>
      {employee.address_1}
      <br/>
      {employee.address_2 ? (<><div>employee.address_2</div><br/></>) : null}
      {employee.city}, {employee.state} {employee.zip}
      <br/>
      <div>Location: {employee.location_id}</div>
      <div>Manager: {employee.manager_id}</div>
      <div>Last Updated: {employee.updated_date}</div>
    </Details>
  );
};
