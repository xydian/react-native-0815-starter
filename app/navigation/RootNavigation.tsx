import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '../screens/Home'
import { DetailsScreen } from '../screens/Details'
import { UIKittenHeader } from './CustomHeader'
import { SignInScreen } from '../screens/SignIn'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => (
	<Navigator screenOptions={{
		header:  props => <UIKittenHeader {...props} />
	}}>
		<Screen name='Sign In' component={SignInScreen} />
		<Screen name='Home' component={HomeScreen}/>
		<Screen name='Details' component={DetailsScreen}/>
	</Navigator>
)

export const AppNavigator = () => (
	<NavigationContainer>
		<HomeNavigator/>
	</NavigationContainer>
)