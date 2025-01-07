import { FontAwesome } from '@expo/vector-icons'
import { router, usePathname } from 'expo-router'
import React, { memo, useCallback, useState } from 'react'
import { Alert, TextInput, TouchableOpacity, View } from 'react-native'

interface SearchInputProps {
  initialQuery?: string
  className?: string
}

function SearchInput({ initialQuery = '', className = '' }: SearchInputProps) {
  // hooks
  const pathname = usePathname()

  // states
  const [query, setKeyword] = useState<string>(initialQuery)

  // search
  const handleSearch = useCallback(() => {
    if (!query.trim()) {
      return Alert.alert('Please enter a keyword to search')
    }

    // already on search screen
    if (pathname.startsWith('/search')) {
      router.setParams({ query })
    } else {
      router.push(`/search/${query}`)
    }
  }, [query, pathname])

  return (
    <View className={`${className}`}>
      <View
        className="flex flex-row items-center justify-between overflow-hidden rounded-xl bg-neutral-900"
        style={{ height: 44 }}
      >
        <TextInput
          className="h-full flex-1 px-4 font-body tracking-wider text-light outline-none"
          value={query}
          onChangeText={text => setKeyword(text)}
          placeholder="Search for a video topic..."
          placeholderTextColor="#7C7C7C"
        />

        <TouchableOpacity
          className="px-4"
          onPress={handleSearch}
        >
          <FontAwesome
            name="search"
            color="yellow"
            size={16}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default memo(SearchInput)
