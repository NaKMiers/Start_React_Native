import Button from '@/components/Button'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { Link, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Login() {
  // hooks
  const { setUser, setIsLoggedIn }: any = useGlobalContext()
  const router = useRouter()

  // states
  const [form, setForm] = useState<any>({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // handle login
  const handleLogin = useCallback(async () => {
    // validate form
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields')
      return
    }

    // start loading
    setIsLoading(true)

    try {
      // login
      await signIn(form.email, form.password)
      const res = await getCurrentUser()
      setUser(res)
      setIsLoggedIn(true)

      Alert.alert('Success', 'User signed in successfully')
      router.replace('/home')
    } catch (err: any) {
      Alert.alert('Error', err.message)
    } finally {
      // stop loading
      setIsLoading(false)
    }
  }, [form, router, setIsLoggedIn, setUser])

  return (
    <SafeAreaView className="h-full bg-neutral-950 text-light">
      <ScrollView contentContainerClassName="p-21 w-full max-w-[400px] mx-auto">
        <View className="flex min-h-[85vh] justify-center">
          <View className="flex h-[50px] items-center justify-center overflow-hidden">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="h-full max-w-[100px]"
            />
          </View>

          <Text className="mt-2 text-center text-2xl font-semibold tracking-wider text-light">
            Login to{' '}
            <Link
              href="/"
              className="font-bold text-primary"
            >
              Start
            </Link>
          </Text>

          {/* Form */}
          <View>
            <FormField
              title="Email"
              name="email"
              value={form.email}
              setForm={setForm}
              className="mt-7"
              type="email-address"
              autoComplete="email"
            />

            <FormField
              title="Password"
              name="password"
              value={form.password}
              setForm={setForm}
              className="mt-7"
              type="password"
            />

            <Button
              className="mt-10 h-[50px]"
              title="Login"
              handlePress={handleLogin}
              isLoading={isLoading}
            />
          </View>

          <Text className="mt-7 text-center text-light">
            Don't you have an account?{' '}
            <Link
              href="/register"
              className="font-semibold text-primary"
            >
              Register
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login
