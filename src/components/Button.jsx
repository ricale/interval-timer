import styled, {css} from 'styled-components';

import {withProps} from 'lib';

const ButtonView = styled.button`
  display: inline-block;
  margin: 2px;
  padding: 6px 12px;

  border-width: 0;
  border-style: solid;
  border-radius: 3px;
  background-color: transparent;
  background-image: none;

  font-size: 1.1em;

  cursor: pointer;

  ${p => p.small && css`
    padding: 4px 6px;
    font-size: 0.8em;
  `};

  ${p => p.compact && css`
    padding: 1px;
  `}

  ${p => p.disabled && css`
    opacity: 0.5;

    ${p.bordered && css`
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background-color: #000;
        opacity: .5;
      }
    `}
  `}

  ${p => !p.disabled && css`
    :active {
      /*background-color: transparent;*/
      background-image: none;
      box-shadow: 0 0 0 0.2rem rgba(108,117,125,.5);
    }

    :hover {
      color: #fff;
    }
  `}

  ${p => css`
    color: ${p.theme.button[p.themeName]};

    ${p.bordered && css`
      border: 1px solid ${p.theme.button[p.themeName]};
    `}

    ${!p.disabled && css`
      :active {
        color: ${p.theme.button[p.themeName]};
        border-color: ${p.theme.button[p.themeName]};
      }
      :hover {
        color: #FFF;
        background-color: ${p.theme.button[p.themeName]};
        border-color: ${p.theme.button[p.themeName]};
      }
    `}
  `}
`;

const Button = withProps(({primary, warning, success, info}) => ({
  themeName: (
    primary ? 'primary' :
    warning ? 'warning' :
    success ? 'success' :
    info    ? 'info' :
              'default'
  ),
}))(ButtonView);

export default Button;
