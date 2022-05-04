import React from 'react';
import styled from 'styled-components';

const View = styled.div`

`;

export default function WorkOrders () {
  return (
    <View>
      <form>
        <label>WO ID:</label>
        <input type="text" />
      </form>
      <section>
        WORK ORDER DISPLAYS HERE
      </section>
    </View>
  );
};
