import Button from '@/components/Button'
import { images } from '@/constants'
import { Link, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Image, ScrollView, StatusBar, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  // hooks
  const router = useRouter()

  // states
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // press button
  const handlePress = useCallback(() => {
    router.push('/login')
  }, [])

  return (
    <SafeAreaView className='flex h-full bg-slate-950'>
      <ScrollView className='w-full h-full px-21/2'>
        <View className='flex items-center'>
          <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />
          <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain' />
        </View>

        <Text className='text-4xl text-light font-bold tracking-wide text-center mt-5 px-21/2'>
          Discover Endless Possibilities with{' '}
          <Text className='text-primary underline underline-offset-1'>Start</Text>
        </Text>

        <Text className='text-sm text-slate-400 mt-7 text-center px-21/2'>
          Where creativity meets innovation: embark on a journey of limitless exploration with Start
        </Text>

        <Button
          title='Connect Now'
          handlePress={handlePress}
          isLoading={isLoading}
          className='mt-7 py-5 max-w-[300px] mx-auto'
        />
      </ScrollView>

      <StatusBar backgroundColor='#161622' />
    </SafeAreaView>
  )
}
