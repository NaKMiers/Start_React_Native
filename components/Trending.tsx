import { icons } from '@/constants'
import React, { useCallback, useState } from 'react'
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

interface TrendingProps {
  posts: any[]
  className?: string
}

function Trending({ posts, className = '' }: TrendingProps) {
  // states
  const [activeItem, setActiveItem] = useState<any>(posts[0])

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
      ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      className={`${className}`}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
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
    transform: [{ scale: 1 }],
  },
  1: { transform: [{ scale: 1.1 }] },
}

const zoomOut = {
  0: { transform: [{ scale: 1.1 }] },
  1: { transform: [{ scale: 1 }] },
}

function TrendingItem({ activeItem, item, className = '' }: TrendingItemProps) {
  // states
  const [play, setPlay] = useState<boolean>(false)

  return (
    <Animatable.View
      className={`${className}`}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
    >
      {play ? (
        <Text className="text-light">Playing...</Text>
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

export default Trending
