import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from './screens/Home'
import { DetailsScreen } from './screens/Details'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => (
	<Navigator screenOptions={{
		headerShown: false
	}}>
		<Screen name='Home' component={HomeScreen}/>
		<Screen name='Details' component={DetailsScreen}/>
	</Navigator>
)

export const AppNavigator = () => (
	<NavigationContainer>
		<HomeNavigator/>
	</NavigationContainer>
)