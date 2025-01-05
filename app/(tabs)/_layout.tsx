import { icons } from '@/constants'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, View } from 'react-native'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f44336',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 2,
          borderTopColor: '#f44336',
          height: 100,
          paddingTop: 15,
        },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.home}
              tintColor={color}
              resizeMode='contain'
              className='w-7 h-7 mb-1.5'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='bookmark'
        options={{
          title: 'Bookmark',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={icons.bookmark}
              tintColor={color}
              resizeMode='contain'
              className='w-7 h-7 mb-1.5'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={icons.plus}
              tintColor={color}
              resizeMode='contain'
              className='w-7 h-7 mb-1.5'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={icons.profile}
              tintColor={color}
              resizeMode='contain'
              className='w-7 h-7 mb-1.5'
            />
          ),
        }}
      />
    </Tabs>
  )
}
