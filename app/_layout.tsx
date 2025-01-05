import { useFonts } from 'expo-font'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import './global.scss'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  // hooks
  const [fonts, error] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
    SourceSansPro: require('../assets/fonts/SourceSansPro-Regular.ttf'),
  })
  const router = useRouter()

  useEffect(() => {
    if (error) throw error

    if (fonts) SplashScreen.hideAsync()
  }, [fonts, error])

  if (!fonts && !error) return null

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='search/[query]' options={{ headerShown: false }} />
    </Stack>
  )
}
