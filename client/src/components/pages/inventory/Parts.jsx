import React from 'react';
import styled from 'styled-components';

const View = styled.div`

`;

export default function Parts () {
  return (
    <View>
      <form>
        <label>ID:</label>
        <input type="text" />
      </form>
      <section>
        DISPLAY
      </section>
    </View>
  );
};