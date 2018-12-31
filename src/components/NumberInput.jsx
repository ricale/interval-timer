import {getDigitFromNumber, fillWithZero} from 'lib';
import {compose, withProps, withHandlers} from 'lib/recompose';

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
      const {min, max, digit, onChange} = props;

      const parsedValue = parseInt(e.target.value, 10);
      const validValue = (
        parsedValue > max ? max :
        parsedValue < min ? min :
                            parsedValue
      );
      const value = fillWithZero(validValue, digit);

      onChange && onChange({
        ...e,
        target: {
          ...e.target,
          value,
        },
      });
    },
  }),

)('input');

export default NumberInput;
