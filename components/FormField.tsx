import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

interface FormFieldProps {
  title: string
  name: string
  value: any
  setForm: any
  type?: string
  placeholder?: string
  className?: string
}

export default function FormField({
  title,
  name,
  value,
  type = 'text',
  setForm,
  placeholder,
  className = '',
}: FormFieldProps) {
  // states
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <View className={`${className}`}>
      <Text className='text-light font-semibold'>{title}</Text>

      <View className='h-14 flex overflow-hidden flex-row items-center justify-between bg-neutral-900 mt-3 rounded-xl'>
        <TextInput
          className='h-full flex-1 text-light font-body tracking-wider outline-none px-4'
          value={value}
          onChangeText={text => setForm((prev: any) => ({ ...prev, [name]: text }))}
          placeholder={placeholder}
          secureTextEntry={type === 'password' && !showPassword}
        />

        {type === 'password' && (
          <TouchableOpacity className='px-4' onPress={() => setShowPassword(prev => !prev)}>
            {showPassword ? (
              <FontAwesome name='eye-slash' color='yellow' size={16} />
            ) : (
              <FontAwesome name='eye' color='yellow' size={16} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
