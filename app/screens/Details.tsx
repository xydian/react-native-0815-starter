import React from 'react'
import { Button, Layout, Text } from '@ui-kitten/components'
import { useThemeStore } from '../stores/theme'

export function DetailsScreen(){
	const toggleTheme = useThemeStore(state => state.toggleTheme)

	return (
		<>
			<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text category='h1'>DETAILS</Text>
				<Button onPress={toggleTheme}>toggle theme</Button>
			</Layout>
		</>
	)
}