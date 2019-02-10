import React from 'react';

import {getDigitFromNumber, fillWithZero} from 'lib';
import {compose, withProps, withHandlers, lifecycle} from 'lib';

const NumberInputView = ({value, digit, ...props}) => (
  <input value={fillWithZero(value, digit)} {...props} />
);

const NumberInput = compose(
  withProps(({max, min}) => ({
    type: 'number',
    digit: getDigitFromNumber(max || 0),
    tens: Math.pow(10, getDigitFromNumber(max || 0)),
  })),
  withHandlers({
    onChange: props => e => {
      const {min, max, tens, onChange} = props;

      const v = parseInt(e.target.value, 10);

      const value = (
        isNaN(v) ? e.target.value :
        v > max  ? v % tens :
        v < min  ? min :
                   v
      );

      onChange && onChange({
        ...e,
        target: {
          ...e.target,
          value,
        },
      });
    },
    onBlur: props => e => {
      const {min, max, onChange} = props;

      const parsedValue = parseInt(e.target.value, 10);
      const value = (
        parsedValue > max ? max :
        parsedValue < min ? min :
                            parsedValue
      );

      onChange && onChange({
        ...e,
        target: {
          ...e.target,
          value,
        },
      });
    },
    onFocus: props => e => {
      e.target.select();
    },
  }),
  lifecycle({
    componentDidMount () {
      this.props.onBlur({target: {value: this.props.value}});
    },
    shouldComponentUpdate (nextProps) {
      return this.props.value !== nextProps.value;
    },
  })

)(NumberInputView);

export default NumberInput;
