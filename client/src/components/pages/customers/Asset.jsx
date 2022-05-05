import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

const Details = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
`

export default function Asset() {

  const params = useParams();
  const assets = useOutletContext();
  const asset = assets.find(asset => asset.id === parseInt(params.assetId, 10));

  return (
    <Details>
      <h2>Details</h2>
      <br/>
      <div>Asset ID: {asset.id}</div>
      <div>Name: {asset.name}</div>
      <div>Manufacturer: {asset.manufacturer}</div>
      <div>Model: {asset.model}</div>
      <div>Year: {asset.year}</div>
      <div>Size: {asset.size}</div>
      <div>Location: {asset.location}</div>
      <div>Last Updated: {asset.updated_date}</div>
    </Details>
  );
};
