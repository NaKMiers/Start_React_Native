import { icons } from '@/constants'
import React, { memo, useCallback, useRef, useState } from 'react'
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Video, ResizeMode } from 'expo-av'

interface TrendingProps {
  posts: any[]
  className?: string
}

function Trending({ posts, className = '' }: TrendingProps) {
  // states
  const [activeItem, setActiveItem] = useState<any>(posts[0])

  // refs
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
  })

  // handle viewable items changed
  const handleViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }, [])

  return (
    <FlatList
      data={posts}
      keyExtractor={(item: any) => item.$id}
      horizontal
      renderItem={({ item }) => (
        <TrendingItem
          item={item}
          activeItem={activeItem}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ width: 10.5 }} />}
      className={`${className}`}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={viewabilityConfig.current}
    />
  )
}

interface TrendingItemProps {
  activeItem: any
  item: any
  className?: string
}

const zoomIn = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: { transform: [{ scale: 1 }] },
}

const zoomOut = {
  0: { transform: [{ scale: 1 }] },
  1: { transform: [{ scale: 0.9 }] },
}

function TrendingItem({ activeItem, item, className = '' }: TrendingItemProps) {
  // states
  const [play, setPlay] = useState<boolean>(false)

  return (
    <Animatable.View
      className={`flex items-center justify-center ${className}`}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={{
            width: 208,
            height: 288,
            borderRadius: 35,
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
          className="relative flex items-center justify-center shadow-lg"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="my-5 h-72 w-52 overflow-hidden rounded-[35px] shadow-lg shadow-black/40"
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
    </Animatable.View>
  )
}

export default memo(Trending)
