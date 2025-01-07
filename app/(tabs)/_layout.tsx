import { icons } from '@/constants'
import { capitalize } from '@/utils/string'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

const tabs: any[] = [
  {
    name: 'home',
    icon: icons.home,
  },
  {
    name: 'bookmark',
    icon: icons.bookmark,
  },
  {
    name: 'create',
    icon: icons.plus,
  },
  {
    name: 'profile',
    icon: icons.profile,
  },
]

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 2,
          height: 100,
          paddingTop: 10,
        },
        tabBarLabelStyle: { display: 'none' },
        tabBarIconStyle: { display: 'none' },
      }}
    >
      {tabs.map(tab => (
        <Tabs.Screen
          name={tab.name}
          options={{
            tabBarLabel: ({ color }) => (
              <View className="flex h-full items-center justify-center">
                <Image
                  source={tab.icon}
                  style={{
                    tintColor: color,
                    height: 20,
                    width: 20,
                  }}
                  resizeMode="contain"
                />
                <Text
                  className="mt-1 text-center font-body text-sm tracking-widest"
                  style={{ color }}
                >
                  {capitalize(tab.name)}
                </Text>
              </View>
            ),
          }}
          key={tab.name}
        />
      ))}
    </Tabs>
  )
}
