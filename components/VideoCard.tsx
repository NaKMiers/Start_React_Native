import { icons } from '@/constants'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import { FontAwesome } from '@expo/vector-icons'
import { useGlobalContext } from '@/context/GlobalProvider'
import { addFavorites, deleteVideo, removeFavorites } from '@/lib/appwrite'

interface VideoCard {
  post: any
  refreshing?: boolean
  className?: string
}

function VideoCard({ post: data, refreshing, className }: VideoCard) {
  // hooks
  const { user, favorites, setFavorites }: any = useGlobalContext()

  // states
  const [post, setPost] = useState<any>(data)
  const [play, setPlay] = useState<boolean>(false)
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  // values
  const isCreator = user?.$id === data.creator?.$id
  const isFavorite = favorites.some((fav: any) => fav.videoId === data?.$id)

  // auto pause video when refreshing
  useEffect(() => {
    setPlay(false)
  }, [refreshing])

  // handle add to favorite
  const handleAddToFavorite = useCallback(async () => {
    try {
      const newFavoritePost = await addFavorites(user.$id, post?.$id)

      // update favorites
      setFavorites((prev: any) => [newFavoritePost, ...prev])

      // close menu
      setOpenMenu(false)
    } catch (err: any) {
      Alert.alert('Error', err.message)
    }
  }, [])

  // remove from favorite
  const handleRemoveFromFavorite = useCallback(async () => {
    try {
      const id = favorites.find((fav: any) => fav.videoId === post?.$id)?.$id
      await removeFavorites(id)

      // update favorites
      setFavorites((prev: any) => prev.filter((fav: any) => fav.videoId !== post?.$id))

      // close menu
      setOpenMenu(false)
    } catch (err: any) {
      Alert.alert('Error', err.message)
    }
  }, [])

  // handle delete video
  const handleDeleteVideo = useCallback(async () => {
    try {
      await deleteVideo(data.$id)

      // show message
      Alert.alert('Success', 'Video deleted successfully')

      setPost(null)
    } catch (err: any) {
      Alert.alert('Error', err.message)
    }
  }, [])

  return (
    post && (
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

          <TouchableOpacity
            className="flex flex-row justify-end gap-0.5"
            onPress={() => setOpenMenu(prev => !prev)}
          >
            <Image
              source={icons.menu}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </View>

        {openMenu && (
          <View className="absolute right-21/2 top-11 z-10 flex flex-col gap-2 rounded-lg bg-white px-4 py-3 shadow-lg">
            {isFavorite ? (
              <TouchableOpacity
                className="flex flex-row items-center gap-2"
                onPress={handleRemoveFromFavorite}
              >
                <FontAwesome
                  name="heart"
                  color="red"
                  size={16}
                  className="w-5"
                />
                <Text className="text-base">Remove From Favorite</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="flex flex-row items-center gap-2"
                onPress={handleAddToFavorite}
              >
                <FontAwesome
                  name="heart-o"
                  color="red"
                  size={16}
                  className="w-5"
                />
                <Text className="text-base">Add To Favorite</Text>
              </TouchableOpacity>
            )}
            {isCreator && (
              <TouchableOpacity
                className="flex flex-row items-center gap-2"
                onPress={handleDeleteVideo}
              >
                <FontAwesome
                  name="trash"
                  color="#333"
                  size={18}
                  className="w-5"
                />
                <Text className="text-base">Delete Video</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

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
              style={{
                width: 48,
                height: 48,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 10,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    )
  )
}

export default memo(VideoCard)
