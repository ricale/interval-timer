import React from 'react';
import styled, {css} from 'styled-components';

import {compose, lifecycle, withProps} from 'lib';

const Container = styled.div`
  position: absolute;
  @media (max-width: 768px) {
    position: fixed;
  }
  bottom: 0;
  left: 0;
  z-index: -5;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;

  border: 1px solid ${p => p.theme.inactiveColor};

  ${p => p.active && !p.negative && css`
    border: 3px solid ${p => p.theme.activeColor};
  `}

  ${p => p.active && p.negative && css `
    border: 3px solid ${p => p.theme.negativeColor};
  `}
`;

const Fill = styled.div`
  width: 100%;

  height: ${p => `${p.init}%`};

  background-color: ${p => p.theme.inactiveColor};

  ${p => p.active && css`
    background-color: ${p.theme.activeColor};
  `}

  ${p => p.negative && css `
    background-color: ${p.theme.negativeColor};
  `}
`;

const SandView = ({active, negative, init}) => (
  <Container
      active={active}
      negative={negative}>
    <Fill
        active={active}
        negative={negative}
        // color={color}
        // duration={duration}
        init={init}
        // goal={goal}
        />
  </Container>
);

const Sand = compose(
  withProps(({init}) => ({
    init: init > 100 ? 100 : init,
  })),
  lifecycle({
    shouldComponentUpdate (nextProps) {
      return (
        (this.props.active !== nextProps.active) ||
        (this.props.init !== nextProps.init)
      );
    },
  })
)(SandView);

export default Sand;
