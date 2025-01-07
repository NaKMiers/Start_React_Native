import React, { memo } from 'react'
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
  title: string
  textClassName?: string
  className?: string
  isLoading?: boolean
  style?: any
  handlePress: (event: GestureResponderEvent) => void
}

function Button({
  title,
  textClassName = '',
  className = '',
  isLoading = false,
  style = {},
  handlePress = (e: any) => {},
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`flex w-full items-center justify-center rounded-xl bg-primary px-3 py-3 text-center ${
        isLoading ? 'opacity-50' : ''
      } ${className}`}
      style={{ ...style }}
    >
      <Text className={`font-semibold text-dark ${textClassName}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default memo(Button)
