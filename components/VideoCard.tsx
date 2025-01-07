import { icons } from '@/constants'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Video, ResizeMode } from 'expo-av'

interface VideoCard {
  post: any
  refreshing: boolean
  className?: string
}

function VideoCard({ post, refreshing, className }: VideoCard) {
  // states
  const [play, setPlay] = useState<boolean>(false)

  useEffect(() => {
    setPlay(false)
  }, [refreshing])

  return (
    <View className={`mb-14 flex flex-col items-center gap-2 px-21/2 ${className}`}>
      {/* Card Header */}
      <View className="flex w-full flex-row items-center gap-21/2">
        <View className="aspect-square h-[40px] w-[40px] overflow-hidden rounded-lg">
          <Image
            source={{ uri: post.creator.avatar }}
            className="h-full w-full rounded-lg"
            resizeMode="cover"
          />
        </View>

        <View className="flex flex-1 flex-col gap-0.5">
          <Text
            className="text-ellipsis font-semibold text-light"
            numberOfLines={1}
          >
            {post.title}
          </Text>
          <Text style={{ color: '#aaa' }}>{post.creator.username}</Text>
        </View>

        <View className="flex flex-row justify-end gap-0.5">
          <Image
            source={icons.menu}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
      </View>

      {/* Card Body */}
      {play ? (
        <Video
          source={{ uri: post.video }}
          style={{
            width: '100%',
            aspectRatio: 16 / 9,
            borderRadius: 16,
            backgroundColor: '#333',
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false)
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative aspect-video w-full overflow-hidden rounded-lg"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            className="h-full w-full"
            source={{ uri: post.thumbnail }}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: 48, height: 48, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard
