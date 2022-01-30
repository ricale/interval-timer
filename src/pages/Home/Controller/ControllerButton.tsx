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
      sx={{
        minWidth: 48
      }}
      {...props}>
      <Icon
        size='24px'
        name={iconName}
        />
    </Button>
  )
}

export default ControllerButton;
