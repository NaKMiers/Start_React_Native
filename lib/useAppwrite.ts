import { useCallback, useEffect, useState } from 'react'

export const useAppwrite = (callback: Function) => {
  // states
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // fetch data
  const fetchData = useCallback(async () => {
    // start loading
    setIsLoading(true)

    try {
      const res = await callback()

      console.log('res', res)

      setData(res)
    } catch (err: any) {
      throw new Error(err)
    } finally {
      // stop loading
      setIsLoading(false)
    }
  }, [callback])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = () => fetchData()

  return { data, refetch }
}
