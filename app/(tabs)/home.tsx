import EmptyState from '@/components/EmptyState'
import Search from '@/components/Search'
import Trending from '@/components/Trending'
import { images } from '@/constants'
import { useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Home() {
  return (
    <SafeAreaView className="h-full bg-slate-950">
      <FlatList
        data={[{ id: 1 }]}
        contentContainerStyle={{}}
        renderItem={({ item }) => <Text className="text-3xl text-light">{item.id}</Text>}
        keyExtractor={(item: any) => item.id}
        ListHeaderComponent={() => (
          <View className="px-21/2 py-4">
            <View className="flex flex-row justify-between">
              <View className="font-body text-sm">
                <Text className="text-sm text-light">Welcome Back</Text>
                <Text className="text-2xl font-semibold text-light">Anh Khoa</Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <Search className="mt-3" />

            <View
              className="mt-4"
              style={{ marginTop: 20 }}
            >
              <Text className="mt-4 text-light">Latest Videos</Text>

              <Trending posts={[{ id: 1 }]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first on to upload a video!"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Home
