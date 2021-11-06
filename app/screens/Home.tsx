import React from 'react'
import { Button, Layout } from '@ui-kitten/components'
import { NavigationProp } from '@react-navigation/core'

export function HomeScreen(props: { navigation: NavigationProp<Record<string, unknown>> }) {

	const navigateDetails = () => {
		props.navigation.navigate('Details')
	}

	return (
		<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Button onPress={navigateDetails}>OPEN DETAILS</Button>
		</Layout>
	)
}