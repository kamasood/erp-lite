import React from 'react';
import styled from 'styled-components';

const View = styled.div`

`;

export default function ProductionAnalysis () {
  return (
    <View>
      <form>
        <h3>Date: Today</h3>
        <label>Enter Date:</label>
        <input type="text" />
      </form>
      <section>
        PRODUCTION DATA DISPLAYS HERE
      </section>
    </View>
  );
};
