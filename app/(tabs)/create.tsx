import Button from '@/components/Button'
import FormField from '@/components/FormField'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'
import React, { useCallback, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
// import * as DocumentPicker from 'expo-document-picker'

function Create() {
  // states
  const [form, setForm] = useState<any>({
    title: '',
    prompt: '',
    video: null,
    thumbnail: null,
  })
  const [uploading, setUploading] = useState<boolean>(false)

  const openPicker = useCallback(async (type: 'video' | 'image') => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   type: type === 'image' ? ['/image/png', '/image/jpg'] : ['/video/mp4', '/video/gif'],
    // })
  }, [])

  // handle create video
  const handleSubmit = useCallback(() => {}, [])

  return (
    <SafeAreaView className="h-full bg-neutral-950">
      <ScrollView className="p-21/2">
        <Text className="text-2xl font-semibold text-light">Upload Video</Text>

        <FormField
          title="Video Title"
          name="title"
          value={form.title}
          setForm={setForm}
          placeholder="Give your video a catch title..."
          className="mt-10"
        />

        <View className="mt-7 flex flex-col gap-2">
          <Text className="text-light">Upload Video</Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                style={{ width: '100%', height: 256, borderRadius: 12 }}
                source={{ uri: form.video.url }}
                useNativeControls
                isLooping
                resizeMode={ResizeMode.COVER}
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

        <View className="mt-7 flex flex-col gap-2">
          <Text className="text-light">Thumbnail</Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail }}
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
