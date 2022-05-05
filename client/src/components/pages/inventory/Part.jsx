import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

const Details = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
`

export default function Part() {

  const params = useParams();
  const parts = useOutletContext();
  const part = parts.find(part => part.id === parseInt(params.partId, 10));

  return (
    <Details>
      <h2>Details</h2>
      <br/>
      <div>Part ID: {part.id}</div>
      <div>QOH: {part.qty_onhand}</div>
      <div>Subclass: {part.subclass}</div>
      <div>Description: {part.description}</div>
      <div>List Price: {part.list_price}</div>
      <div>Retail Price: {part.retail_price}</div>
      <div>Keywords: {part.kewyords}</div>
      <div>Notes: {part.notes}</div>
      <div>Last Updated: {part.updated_date}</div>
    </Details>
  );
};
