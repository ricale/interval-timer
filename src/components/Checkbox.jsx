import styled from 'styled-components';

import {withProps} from 'lib';

const CheckboxView = styled.input.attrs({type: 'checkbox'})`
  position: relative;
  width: 20px;
  height: 20px;
  border: 1px solid #AAA;
  border-radius: 2px;
  background-color: #FFF;

  &:checked::after {
    content: '';

    position: absolute;
    top: 1px;
    left: 1px;

    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    background-color: ${p => p.theme.checkbox[p.themeName]};
  }
`;

const Checkbox = withProps(({primary, warning, success, info}) => ({
  themeName: (
    primary ? 'primary' :
    warning ? 'warning' :
    success ? 'success' :
    info    ? 'info' :
              'default'
  ),
}))(CheckboxView);

export default Checkbox;
