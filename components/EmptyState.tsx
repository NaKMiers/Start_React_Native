import { View, Text, Image } from 'react-native'
import React, { memo } from 'react'
import { images } from '@/constants'
import Button from './Button'
import { router } from 'expo-router'

interface EmptyStateProps {
  title: string
  subTitle: string
  showButton?: boolean
  className?: string
}

function EmptyState({ title, subTitle, showButton = true, className = '' }: EmptyStateProps) {
  return (
    <View className={`flex items-center justify-center px-21/2 ${className}`}>
      <Image
        source={images.empty}
        resizeMode="contain"
        style={{
          width: 270,
          height: 215,
        }}
      />

      <Text
        className="text-center text-sm font-semibold"
        style={{ color: '#aaa' }}
      >
        {title}
      </Text>
      <Text className="mt-2 text-center text-xl font-semibold text-light">{subTitle}</Text>

      {showButton && (
        <Button
          title="Create video"
          handlePress={() => router.push('/create')}
          className="mt-7 max-w-[300px]"
        />
      )}
    </View>
  )
}

export default memo(EmptyState)
