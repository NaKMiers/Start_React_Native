import React, { memo } from 'react'
import { Text, View } from 'react-native'

interface InfoBoxProps {
  title: string | number
  subTitle?: string
  titleClassName?: string
  className?: string
}

function InfoBox({ title, subTitle, titleClassName, className }: InfoBoxProps) {
  return (
    <View className={`${className}`}>
      <Text className={`text-center font-semibold text-light ${titleClassName}`}>{title}</Text>
      <Text
        className="text-center font-body tracking-wider"
        style={{ color: '#aaa', fontSize: 12 }}
      >
        {subTitle}
      </Text>
    </View>
  )
}

export default memo(InfoBox)
