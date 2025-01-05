import Button from '@/components/Button'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { Link } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Register() {
  // states
  const [form, setForm] = useState<any>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  // handle register
  const handleRegister = useCallback(() => {
    console.log('Registering...')
    alert('Registering...')
  }, [])

  return (
    <SafeAreaView className='bg-neutral-950 text-light h-full'>
      <ScrollView contentContainerClassName='p-21 w-full max-w-[400px] mx-auto'>
        <View className='min-h-[85vh] flex justify-center'>
          <View className='overflow-hidden h-[50px] flex items-center justify-center'>
            <Image source={images.logo} resizeMode='contain' className='max-w-[100px] h-full' />
          </View>

          <Text className='text-2xl text-light font-semibold text-center tracking-wider mt-2'>
            Register to <Text className='font-bold text-primary'>Start</Text>
          </Text>

          {/* Form */}
          <View>
            <FormField
              title='Username'
              name='username'
              value={form.username}
              setForm={setForm}
              className='mt-7'
              type='text'
            />

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

            <FormField
              title='Confirm Password'
              name='confirmPassword'
              value={form.confirmPassword}
              setForm={setForm}
              className='mt-7'
              type='password'
            />

            <Button className='mt-10 h-[50px]' title='Register' handlePress={handleRegister} />
          </View>

          <Text className='text-light text-center mt-7'>
            Haven an account already?{' '}
            <Link href='/login' className='font-semibold text-primary'>
              Login
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register
