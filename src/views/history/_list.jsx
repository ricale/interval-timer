import React from 'react';
import styled, {css} from 'styled-components';

import HistoryItem from './_item';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  ${props => props.reverse && css`
    flex-direction: column-reverse;
  `}
`;

const Message = styled.p`
  text-align: center;
`;

const HistoryList = ({data, reverse = true}) => (
  <Container reverse={reverse}>
    {data.map((d,i) =>
      <HistoryItem
          key={i}
          {...d}
          nextTimestamp={(data[i+1] || {}).timestamp}
          reverse={reverse}
          />
    )}
    {data.length === 0 &&
      <Message>No history.</Message>
    }
  </Container>
);

export default HistoryList;
