import EmptyState from '@/components/EmptyState'
import VideoCard from '@/components/VideoCard'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getAllPosts } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { useEffect } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Favorite() {
  // hooks
  const { user, favorites }: any = useGlobalContext()
  const { data: posts, refetch }: any = useAppwrite(() =>
    getAllPosts(favorites.map((fav: any) => fav.videoId))
  )

  // auto refresh on query change
  useEffect(() => {
    refetch()
  }, [favorites])

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
                <Text className="text-sm text-light">My Favorites</Text>
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
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle='Add videos to your "Favorites" by clicking the "heart" icon on the video.'
            showButton={false}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Favorite
