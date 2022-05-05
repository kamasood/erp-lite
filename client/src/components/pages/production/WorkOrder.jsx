import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

const Details = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
`

export default function WorkOrder() {

  const params = useParams();
  const wos = useOutletContext();
  const wo = wos.find(wo => wo.id === parseInt(params.woId, 10));

  return (
    <Details>
      <h2>Details</h2>
      <br/>
      <div>Work Order ID: {wo.id}</div>
      <div>Customer ID: {wo.customer_id}</div>
      <div>Asset ID: {wo.asset_id}</div>
      <div>Name: {wo.name}</div>
      <div>Description: {wo.description}</div>
      <div>Start Date: {wo.begin_date}</div>
      <div>Location: {wo.location_id}</div>
      <div>Manager: {wo.manager_id}</div>
      <div>WO Status: {wo.status}</div>
      <div>Last Updated: {wo.updated_date}</div>
    </Details>
  );
};
