import React, {Component} from 'react';

import {getDigitFromNumber, fillWithZero} from 'lib';

class NumberInput extends Component {
  static defaultProps = {
    onChange: () => {},
    type: 'number',
  };

  getValueFromInput (inputValue) {
    const {max, min} = this.props;
    const digit = getDigitFromNumber(max);
    const tens = Math.pow(10, digit);

    const v = parseInt(inputValue, 10);

    if(isNaN(v)) {
      return inputValue;
    }

    if(v > max) {
      return fillWithZero(v % tens, digit);
    }

    if(v < min) {
      return fillWithZero(min, digit);
    }

    return fillWithZero(v, digit);
  }

  handleChange = (e) => {
    this.props.onChange({
      ...e,
      target: {
        ...e.target,
        value: this.getValueFromInput(e.target.value),
      },
    });
  }

  handleBlur = (e) => {
    const {max, min} = this.props;
    const {value} = e.target;

    const v = (
      value > max ? max :
      value < min ? min :
                    value
    );

    this.props.onChange({
      ...e,
      target: {
        ...e.target,
        value: v,
      },
    });
  }

  render () {
    const {onChange, ...props} = this.props;
    return (
      <input {...props} onChange={this.handleChange} onBlur={this.handleBlur} />
    );
  }
}

export default NumberInput;
