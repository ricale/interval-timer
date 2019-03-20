import React from 'react';
import styled, {css} from 'styled-components';

import {compose, lifecycle, withProps} from 'lib';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  height: ${p => `${p.init}%`};

  background-color: ${p => p.theme.inactiveColor};

  ${p => p.active && css`
    background-color: ${p => p.theme.activeColor};
  `}

  ${p => p.negative && css `
    background-color: ${p => p.theme.negativeColor};
  `}
`;

const SandView = ({active, negative, init}) => (
  <Container
      active={active}
      negative={negative}
      // color={color}
      // duration={duration}
      init={init}
      // goal={goal}
      />
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
