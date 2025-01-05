import React from 'react'
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
  title: string
  textClassName?: string
  className?: string
  isLoading?: boolean
  handlePress: (event: GestureResponderEvent) => void
}

export default function Button({
  title,
  textClassName = '',
  className = '',
  isLoading = false,
  handlePress = (e: any) => {},
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-primary rounded-xl flex items-center justify-center text-center w-full px-3 py-3 ${
        isLoading ? 'opacity-50' : ''
      } ${className}`}
    >
      <Text className={`text-dark font-semibold ${textClassName}`}>{title}</Text>
    </TouchableOpacity>
  )
}
