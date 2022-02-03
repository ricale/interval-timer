import * as Icons from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';

export type IconProps = SvgIconTypeMap<{}>['props'] & {
  name: keyof typeof Icons
}
function Icon({
  name,
  ...props
}: IconProps) {
  const IconComp = Icons[name];
  return (
    <IconComp
      {...props}
      />
  )
}

export default Icon;
