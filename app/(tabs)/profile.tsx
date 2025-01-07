import EmptyState from '@/components/EmptyState'
import InfoBox from '@/components/InfoBox'
import VideoCard from '@/components/VideoCard'
import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getUserPosts, signOut } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { FlatList, Image, RefreshControl, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Profile() {
  // hooks
  const { user, setUser, setIsLoggedIn }: any = useGlobalContext()
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user?.$id))

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

  // logout
  const handleLogout = useCallback(async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/login')
  }, [])

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
          <View
            className="w-full items-center justify-center px-21/2"
            style={{ marginTop: 24, marginBottom: 48 }}
          >
            {/* Logout Button */}
            <View className="flex w-full flex-row justify-end">
              <TouchableOpacity onPress={handleLogout}>
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            </View>

            <View
              className="aspect-square overflow-hidden rounded-lg shadow-lg"
              style={{ width: 48, height: 48, marginTop: 21 }}
            >
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="cover"
                className="max-wh-full h-full w-full max-w-full"
              />
            </View>

            <InfoBox
              title={user?.username}
              className="mt-3"
            />
            <View
              className="mt-4 flex flex-row justify-center"
              style={{ gap: 21 }}
            >
              <InfoBox
                title={posts.length}
                subTitle="Posts"
              />
              <InfoBox
                title="10.5k"
                subTitle="Followers"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="No videos found for this search query"
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

export default Profile
