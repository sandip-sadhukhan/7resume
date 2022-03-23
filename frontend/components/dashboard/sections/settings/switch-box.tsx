import { FormControl, FormLabel, Switch } from "@chakra-ui/react"
import React, { ChangeEvent } from "react"

interface SwitchBoxProps {
  name: string
  label: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SwitchBox: React.FC<SwitchBoxProps> = (props: SwitchBoxProps) => {
  const { name, label, checked, onChange } = props

  return (
    <FormControl
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w={["full", "70%", "40%", "40%", "30%"]}
    >
      <FormLabel fontSize={13} fontWeight="normal" htmlFor={name} mb="0">
        {label}
      </FormLabel>
      <Switch
        size="sm"
        id="displayBlog"
        ring={0}
        _hover={{ ring: 0 }}
        isChecked={checked}
        name={name}
        onChange={onChange}
      />
    </FormControl>
  )
}

export default SwitchBox
