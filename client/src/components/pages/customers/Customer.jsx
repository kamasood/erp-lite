import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

const Details = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
`

export default function Customer() {

  const params = useParams();
  const customers = useOutletContext();
  const customer = customers.find(customer => customer.id === parseInt(params.customerId, 10));

  return (
    <Details>
      <h2>Details</h2>
      <br/>
      <div>Customer ID: {customer.id}</div>
      <div>Name: {customer.first_name + ' ' + customer.last_name}</div>
      <div>Email: {customer.email}</div>
      <div>Phone: {customer.phone}</div>
      <div>Address:</div>
      {customer.address_1}
      <br/>
      {customer.address_2 ? (<><div>customer.address_2</div><br/></>) : null}
      {customer.city}, {customer.state} {customer.zip}
      <br/>
      <div>Manager: {customer.manager_id}</div>
      <div>Last Updated: {customer.updated_date}</div>
    </Details>
  );
};
