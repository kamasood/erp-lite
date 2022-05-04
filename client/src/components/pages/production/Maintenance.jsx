import React from 'react';
import styled from 'styled-components';

const View = styled.div`

`;

export default function Maintenance () {
  return (
    <View>
      <form>
        <label>Maintenance ID:</label>
        <input type="text" />
      </form>
      <section>
        MAINTENANCE EVENT DISPLAYS HERE
      </section>
    </View>
  );
};
