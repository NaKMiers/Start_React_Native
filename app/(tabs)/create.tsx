import Button from '@/components/Button'
import FormField from '@/components/FormField'
import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { createVideo } from '@/lib/appwrite'
import { ResizeMode, Video } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export type VideoFormType = {
  title: string
  prompt: string
  video: any
  thumbnail: any
  creator: string
}

function Create() {
  // hooks
  const { user }: any = useGlobalContext()

  // states
  const [form, setForm] = useState<VideoFormType>({
    title: '',
    prompt: '',
    video: null,
    thumbnail: null,
    creator: user?.$id,
  })
  const [uploading, setUploading] = useState<boolean>(false)

  const openPicker = useCallback(async (type: 'video' | 'image') => {
    if (type === 'image') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        quality: 1,
      })

      if (!result.canceled) {
        setForm(prev => ({ ...prev, thumbnail: result.assets[0] }))
      }
    } else if (type === 'video') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'videos',
        allowsEditing: true,
        quality: 1,
      })

      if (!result.canceled) {
        setForm(prev => ({ ...prev, video: result.assets[0] }))
      }
    }
  }, [])

  // handle create video
  const handleSubmit = useCallback(async () => {
    // validate form
    if (!form.title || !form.prompt || !form.video || !form.thumbnail) {
      return Alert.alert('Please fill in all fields')
    }

    // user not found
    if (!user) {
      return Alert.alert('You have to login to create video')
    }

    // start uploading
    setUploading(true)

    try {
      await createVideo(form)

      Alert.alert('Success', 'Uploaded Successfully')
      router.push('/home')
    } catch (err: any) {
      Alert.alert('Error', err.message)
    } finally {
      // stop uploading
      setUploading(false)
    }
  }, [form, user, createVideo, setUploading, Alert, router])

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-neutral-950"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      <SafeAreaView className="h-full">
        <ScrollView className="p-21/2">
          <View className="mx-auto w-full max-w-[500px]">
            <Text className="text-2xl font-semibold text-light">Upload Video</Text>

            {/* Title */}
            <FormField
              title="Video Title"
              name="title"
              value={form.title}
              setForm={setForm}
              placeholder="Give your video a catch title..."
              className="mt-10"
            />

            {/* Video */}
            <View className="mt-7 flex flex-col gap-2">
              <Text className="text-light">Upload Video</Text>

              <TouchableOpacity onPress={() => openPicker('video')}>
                {form.video ? (
                  <Video
                    style={{ width: '100%', height: 256, borderRadius: 12 }}
                    source={{ uri: form.video.uri }}
                    resizeMode={ResizeMode.CONTAIN}
                  />
                ) : (
                  <View className="flex h-40 w-full items-center justify-center rounded-xl bg-neutral-900">
                    <View
                      className="flex items-center justify-center rounded-md border-2 border-dashed border-orange-400"
                      style={{ width: 56, height: 56, padding: 10 }}
                    >
                      <Image
                        source={icons.upload}
                        resizeMode="contain"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Thumbnail */}
            <View className="mt-7 flex flex-col gap-2">
              <Text className="text-light">Thumbnail</Text>

              <TouchableOpacity onPress={() => openPicker('image')}>
                {form.thumbnail ? (
                  <Image
                    source={{ uri: form.thumbnail.uri }}
                    style={{ width: '100%', height: 256, borderRadius: 12 }}
                    resizeMode="cover"
                  />
                ) : (
                  <View className="flex h-14 w-full flex-row items-center justify-center gap-2 rounded-xl bg-neutral-900">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      style={{ width: 24, height: 24 }}
                    />
                    <Text className="text-light">Choose a file</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <FormField
              title="Prompt"
              name="prompt"
              value={form.prompt}
              setForm={setForm}
              placeholder="The prompt for the video..."
              className="mt-7"
            />

            <Button
              title="Submit and Push"
              handlePress={handleSubmit}
              isLoading={uploading}
              className="mt-7"
              style={{ marginBottom: 50, height: 48 }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default Create
