import { getCurrentUser, getUserFavorites } from '@/lib/appwrite'
import { createContext, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'

export interface GlobalContextType {
  isLoggedIn: boolean
  user: any
  isLoading: boolean
  setIsLoggedIn: (value: boolean) => void
  setUser: (value: any) => void
  setIsLoading: (value: boolean) => void
}

// create and export (context and hook)
export const GlobalContext = createContext<GlobalContextType | null>(null)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }: any) => {
  // states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<any>(null)
  const [favorites, setFavorites] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // get current user
    const getCurUser = async () => {
      // start loading
      setIsLoading(true)

      try {
        const currentUser = await getCurrentUser()

        if (currentUser) {
          setIsLoggedIn(true)
          setUser(currentUser)

          // get favorites
          const favorites = await getUserFavorites(currentUser.$id)
          setFavorites(favorites)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      } catch (err: any) {
        Alert.alert('Error', err.message)
      } finally {
        // stop loading
        setIsLoading(false)
      }
    }

    getCurUser()
  }, [])

  return (
    <GlobalContext.Provider
      value={
        {
          isLoading,
          setIsLoading,
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          favorites,
          setFavorites,
        } as GlobalContextType
      }
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
