import React from 'react'
import { Button, Divider, Icon, IconProps, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { NavigationProp } from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeStore } from '../stores/theme'

const BackIcon = (props: IconProps) => (
	<Icon {...props} name='arrow-back' />
)

export function DetailsScreen(props: { navigation: NavigationProp<Record<string, unknown>> }){

	const navigateBack = () => {
		props.navigation.goBack()
	}

	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
	)

	const toggleTheme = useThemeStore(state => state.toggleTheme)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction}/>
			<Divider/>
			<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text category='h1'>DETAILS</Text>
				<Button onPress={toggleTheme}>toggle theme</Button>
			</Layout>
		</SafeAreaView>
	)
}