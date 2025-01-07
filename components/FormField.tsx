import { FontAwesome } from '@expo/vector-icons'
import React, { memo, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

interface FormFieldProps {
  title: string
  name: string
  value: any
  setForm: any
  type?: string
  placeholder?: string
  className?: string
  [key: string]: any
}

function FormField({
  title,
  name,
  value,
  type = 'text',
  setForm,
  placeholder,
  className = '',
  ...rest
}: FormFieldProps) {
  // states
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <View className={`${className}`}>
      <Text className="font-semibold text-light">{title}</Text>

      <View className="mt-3 flex h-14 flex-row items-center justify-between overflow-hidden rounded-xl bg-neutral-900">
        <TextInput
          className="h-full flex-1 px-4 font-body tracking-wider text-light outline-none"
          value={value}
          onChangeText={text => setForm((prev: any) => ({ ...prev, [name]: text }))}
          placeholder={placeholder}
          placeholderTextColor="#7C7C7C"
          secureTextEntry={type === 'password' && !showPassword}
          {...rest}
        />

        {type === 'password' && (
          <TouchableOpacity
            className="px-4"
            onPress={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? (
              <FontAwesome
                name="eye-slash"
                color="yellow"
                size={16}
              />
            ) : (
              <FontAwesome
                name="eye"
                color="yellow"
                size={16}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default memo(FormField)
