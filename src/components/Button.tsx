import { Button as MUIButton, ButtonProps as MUIButtonProps } from "@mui/material";

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export type ButtonProps = MUIButtonProps;

const Button = MUIButton;

export default Button;
