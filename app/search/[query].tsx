import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import { searchPosts } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Search() {
  // hooks
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query as string))

  console.log('posts', posts)

  // auto refresh on query change
  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className="h-full bg-slate-950">
      <FlatList
        data={posts}
        contentContainerStyle={{
          paddingHorizontal: 10.5,
        }}
        renderItem={({ item }) => <VideoCard post={item} />}
        keyExtractor={(item: any) => item.$id}
        ListHeaderComponent={() => (
          <View className="py-4">
            <View className="flex flex-row justify-between">
              <View className="font-body text-sm">
                <Text className="text-sm text-light">Search Results For</Text>
                <Text className="text-2xl font-semibold text-light">{query}</Text>
              </View>
            </View>

            <SearchInput
              className="my-3"
              initialQuery={query as string}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search
