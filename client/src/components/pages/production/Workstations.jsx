import React from 'react';
import styled from 'styled-components';

const View = styled.div`

`;

export default function Workstations () {
  return (
    <View>
      <form>
        <label>Workstation ID:</label>
        <input type="text" />
      </form>
      <section>
        WORKSTATION DISPLAYS HERE
      </section>
    </View>
  );
};
