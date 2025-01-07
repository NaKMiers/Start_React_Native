import Button from '@/components/Button'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { createUser } from '@/lib/appwrite'
import { Link, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Register() {
  // hooks
  const { setUser, setIsLoggedIn }: any = useGlobalContext()
  const router = useRouter()

  // states
  const [form, setForm] = useState<any>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // handle register
  const handleRegister = useCallback(async () => {
    // validate form
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      Alert.alert('Error', 'Please fill all fields')
      return
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Password does not match')
      return
    }

    // start loading
    setIsLoading(true)

    try {
      const res = await createUser(form.username, form.email, form.password)
      setUser(res)
      setIsLoggedIn(true)

      Alert.alert('Success', 'User created successfully')
      // navigate to home
      router.replace('/home')
    } catch (err: any) {
      Alert.alert('Error', err.message)
    } finally {
      // stop loading
      setIsLoading(false)
    }
  }, [form])

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
            Register to{' '}
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
              title="Username"
              name="username"
              value={form.username}
              setForm={setForm}
              className="mt-7"
              type="text"
              autoComplete="username"
            />

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
              autoComplete="password"
            />

            <FormField
              title="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              setForm={setForm}
              className="mt-7"
              type="password"
              autoComplete="password"
            />

            <Button
              className="mt-10 h-[50px]"
              title="Register"
              handlePress={handleRegister}
              isLoading={isLoading}
            />
          </View>

          <Text className="mt-7 text-center text-light">
            Have an account already?{' '}
            <Link
              href="/login"
              className="font-semibold text-primary"
            >
              Login
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register
