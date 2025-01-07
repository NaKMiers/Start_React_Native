import { useEffect, useState } from 'react'

export const useAppwrite = (callback: Function) => {
  // states
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // fetch data
  const fetchData = async () => {
    // start loading
    setIsLoading(true)

    try {
      const res = await callback()

      setData(res)
    } catch (err: any) {
      throw new Error(err)
    } finally {
      // stop loading
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => fetchData()

  return { data, isLoading, refetch }
}
