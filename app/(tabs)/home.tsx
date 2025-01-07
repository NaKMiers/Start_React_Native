import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import VideoCard from '@/components/VideoCard'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { useCallback, useState } from 'react'
import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Home() {
  // hooks
  const { user }: any = useGlobalContext()
  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: latestPosts } = useAppwrite(getLatestPosts)

  // states
  const [refreshing, setRefreshing] = useState<boolean>(false)

  // handle refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)

    try {
      await refetch()
    } catch (err: any) {
      console.error(err)
    } finally {
      setRefreshing(false)
    }
  }, [refetch])

  return (
    <SafeAreaView className="h-full bg-slate-950">
      <FlatList
        data={posts}
        contentContainerStyle={{
          paddingHorizontal: 10.5,
        }}
        renderItem={({ item }) => (
          <VideoCard
            post={item}
            refreshing={refreshing}
          />
        )}
        keyExtractor={(item: any) => item.$id}
        ListHeaderComponent={() => (
          <View className="py-4">
            <View className="flex flex-row justify-between">
              <View className="font-body text-sm">
                <Text className="text-sm text-light">Welcome Back</Text>
                <Text className="text-2xl font-semibold text-light">{user?.username}</Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  style={{ width: 32, height: 32 }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput className="mt-3" />

            {latestPosts.length > 0 && (
              <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Text className="mt-4 font-semibold text-light">Latest Videos</Text>
                <Trending posts={latestPosts} />
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first on to upload a video!"
            className="mb-20"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      />
    </SafeAreaView>
  )
}

export default Home
