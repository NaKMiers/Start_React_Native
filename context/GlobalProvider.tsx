import { getCurrentUser } from '@/lib/appwrite'
import { createContext, useContext, useEffect, useState } from 'react'

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
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // get current user
    const getCurUser = async () => {
      console.log('getCurUser')
      // start loading
      setIsLoading(true)

      try {
        const currentUser = await getCurrentUser()
        console.log('currentUser', currentUser)

        if (currentUser) {
          setIsLoggedIn(true)
          setUser(currentUser)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      } catch (err: any) {
        console.log(err)
      } finally {
        // stop loading
        setIsLoading(false)
      }
    }

    getCurUser()
  }, [])

  return (
    <GlobalContext.Provider value={{ isLoading, isLoggedIn, user } as GlobalContextType}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
