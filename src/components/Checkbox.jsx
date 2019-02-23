import styled, {css} from 'styled-components';

const Checkbox = styled.input.attrs({type: 'checkbox'})`
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
    background-color: #6C757D;

    ${p => p.primary && css`
      background-color: #017CFF;
    `};
    ${p => p.warning && css`
      background-color: #FFC208;
    `};
    ${p => p.success && css`
      background-color: #28a745;
    `};
    ${p => p.light && css`
      background-color: #f8f9fa;
    `};
  }
`;

export default Checkbox;
