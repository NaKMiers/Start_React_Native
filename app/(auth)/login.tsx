import Button from '@/components/Button'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { Link } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Login() {
  // states
  const [form, setForm] = useState<any>({
    email: '',
    password: '',
  })

  // handle login
  const handleLogin = useCallback(() => {
    console.log('Logging in...')
    alert('Logging in...')
  }, [])

  return (
    <SafeAreaView className='bg-neutral-950 text-light h-full'>
      <ScrollView contentContainerClassName='p-21 w-full max-w-[400px] mx-auto'>
        <View className='min-h-[85vh] flex justify-center'>
          <View className='overflow-hidden h-[50px] flex items-center justify-center'>
            <Image source={images.logo} resizeMode='contain' className='max-w-[100px] h-full' />
          </View>

          <Text className='text-2xl text-light font-semibold text-center tracking-wider mt-2'>
            Login to <Text className='font-bold text-primary'>Start</Text>
          </Text>

          {/* Form */}
          <View>
            <FormField
              title='Email'
              name='email'
              value={form.email}
              setForm={setForm}
              className='mt-7'
              type='email-address'
            />

            <FormField
              title='Password'
              name='password'
              value={form.password}
              setForm={setForm}
              className='mt-7'
              type='password'
            />

            <Button className='mt-10 h-[50px]' title='Login' handlePress={handleLogin} />
          </View>

          <Text className='text-light text-center mt-7'>
            Don't you have an account?{' '}
            <Link href='/register' className='font-semibold text-primary'>
              Register
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login
