import styled, {css} from 'styled-components';

const COLORS = {
  primary: '#017CFF',
  warning: '#FFC208',
  success: '#28a745',
  info:    '#f8f9fa',
};

const getStyledByTheme = theme => p => p[theme] && css`
  color: ${COLORS[theme]};

  ${p.bordered && css`
    border: 1px solid ${COLORS[theme]};
  `}

  ${!p.disabled && css`
    :active {
      color: ${COLORS[theme]};
      border-color: ${COLORS[theme]};
    }
    :hover {
      color: #FFF;
      background-color: ${COLORS[theme]};
      border-color: ${COLORS[theme]};
    }
  `}
`;

const Button = styled.div`
  display: inline-block;
  margin: 2px;
  padding: 6px 12px;

  border-width: 0;
  border-style: solid;
  border-radius: 3px;
  background-color: transparent;
  background-image: none;
  color: #6C757D;

  font-size: 1.1em;

  cursor: pointer;

  ${p => p.small && css`
    padding: 4px 6px;
    font-size: 0.8em;
  `};

  ${p => p.compact && css`
    padding: 1px;
  `}

  ${p => p.bordered && css`
    border: 1px solid #6C757D;
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
      color: #6C757D;
      background-color: transparent;
      background-image: none;
      border-color: #6C757D;
      box-shadow: 0 0 0 0.2rem rgba(108,117,125,.5);
    }

    :hover {
      color: #fff;
      background-color: #6C757D;
      border-color: #6C757D;
    }
  `}

  ${getStyledByTheme('primary')}
  ${getStyledByTheme('warning')}
  ${getStyledByTheme('success')}
  ${getStyledByTheme('info')}
`;

export default Button;
