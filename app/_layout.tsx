import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import React, { useEffect } from 'react'
import './global.scss'
import { SafeAreaView } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fonts, error] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
    SourceSansPro: require('../assets/fonts/SourceSansPro-Regular.ttf'),
  })

  useEffect(() => {
    if (error) throw error

    if (fonts) SplashScreen.hideAsync()
  }, [fonts, error])

  if (!fonts && !error) return null

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  )
}
