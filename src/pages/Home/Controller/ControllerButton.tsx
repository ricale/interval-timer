import { Icon, IconProps, Button, ButtonProps } from "components";

type ControllerButtonProps = ButtonProps & {
  iconName: IconProps['name']
  disabled?: boolean
}
function ControllerButton({
  iconName,
  sx,
  disabled,
  ...props
}: ControllerButtonProps) {
  return (
    <Button
      variant='text'
      size='small'
      disabled={disabled}
      sx={{ minWidth: 48, padding: 1.375 }}
      {...props}>
      <Icon name={iconName} />
    </Button>
  )
}

export default ControllerButton;
