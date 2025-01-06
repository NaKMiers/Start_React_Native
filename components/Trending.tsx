import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'

interface TrendingProps {
  posts: any[]
  className?: string
}

function Trending({ posts, className = '' }: TrendingProps) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => (
        <Text
          className="text-light"
          style={{ fontSize: 28, marginTop: 10 }}
        >
          {item.id}
        </Text>
      )}
      className={`${className}`}
    />
  )
}

export default Trending
