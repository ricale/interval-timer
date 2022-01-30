import * as Icons from '@mui/icons-material';
import { SxProps, Theme } from '@mui/material';

export type IconProps = {
  name: keyof typeof Icons
  size?: string | number
  width?: string | number
  height?: string | number
  onClick?: () => void
  sx?: SxProps<Theme>
}
function Icon({
  name,
  size,
  width,
  height,
  sx,
  ...props
}: IconProps) {
  const IconComp = Icons[name];

  return (
    <IconComp
      {...props}
      width={width ?? size}
      height={height ?? size}
      sx={{fontSize: size, ...sx}}
      />
  )
}

export default Icon;
