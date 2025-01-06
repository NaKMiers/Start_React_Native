import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

interface SearchProps {
  className?: string
}

function Search({ className = '' }: SearchProps) {
  // states
  const [keyword, setKeyword] = useState<string>('')

  return (
    <View className={`${className}`}>
      <View
        className="flex flex-row items-center justify-between overflow-hidden rounded-xl bg-neutral-900"
        style={{ height: 44 }}
      >
        <TextInput
          className="h-full flex-1 px-4 font-body tracking-wider text-light outline-none"
          value={keyword}
          onChangeText={text => setKeyword(text)}
          placeholder="Search for a video topic..."
          placeholderTextColor="#7C7C7C"
        />

        <TouchableOpacity className="px-4">
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

export default Search
