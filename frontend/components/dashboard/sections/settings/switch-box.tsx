import { FormControl, FormLabel, Switch } from "@chakra-ui/react"
import React from "react"
import { Control, Controller } from "react-hook-form"
import { CheckboxName, IFormData } from "./general-settings"

interface SwitchBoxProps {
  label: string
  name: CheckboxName
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<IFormData, any>
}

const SwitchBox: React.FC<SwitchBoxProps> = (props: SwitchBoxProps) => {
  const { name, label, control } = props

  return (
    <FormControl
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w={["full", "70%", "40%", "40%", "30%"]}
    >
      <FormLabel fontSize={13} fontWeight="normal" mb="0">
        {label}
      </FormLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={false}
        render={({ field: { onChange, value, ref } }) => (
          <Switch
            size="sm"
            ring={0}
            _hover={{ ring: 0 }}
            onChange={onChange}
            isChecked={value}
            ref={ref}
          />
        )}
      />
    </FormControl>
  )
}

export default SwitchBox
