import Button from '@/components/Button'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { Redirect, useRouter } from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  // hooks
  const { isLoading, isLoggedIn }: any = useGlobalContext()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace('/home')
    }
  }, [isLoading, isLoggedIn])

  // press button
  const handlePress = useCallback(() => {
    router.push('/login')
  }, [])

  return (
    <SafeAreaView className="flex h-full bg-slate-950">
      <ScrollView contentContainerClassName="p-21">
        <View className="mt-10 flex h-[40px] items-center justify-center overflow-hidden">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-full max-h-full w-full max-w-full"
          />
        </View>

        <View className="flex h-[300px] items-center justify-center overflow-hidden">
          <Image
            source={images.cards}
            resizeMode="contain"
            className="h-full max-h-full w-full max-w-full"
          />
        </View>

        <Text className="mt-5 px-21/2 text-center text-4xl font-bold tracking-wide text-light">
          Discover Endless Possibilities with{' '}
          <Text className="text-primary underline underline-offset-1">Start</Text>
        </Text>

        <Text className="mt-7 px-21/2 text-center text-sm text-slate-400">
          Where creativity meets innovation: embark on a journey of limitless exploration with Start
        </Text>

        <Button
          title="Connect Now"
          handlePress={handlePress}
          // isLoading={isLoading}
          className="mx-auto mt-7 max-w-[300px] py-4"
        />
      </ScrollView>
    </SafeAreaView>
  )
}
