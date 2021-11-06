import { getHeaderTitle } from '@react-navigation/elements'
import { StackHeaderProps } from '@react-navigation/stack'
import { TopNavigationAction, TopNavigation, IconProps, Icon, Divider } from '@ui-kitten/components'
import React, { ReactElement } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export function UIKittenHeader(props: StackHeaderProps): ReactElement {
	const title = getHeaderTitle(props.options, props.route.name)
  
	const BackIcon = (props: IconProps) => (
		<Icon {...props} name='arrow-back' />
	)

	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={() => props.navigation.goBack()}/>
	)

	return (
		<SafeAreaView>
			<TopNavigation title={title} alignment='center' accessoryLeft={props.back ? BackAction : undefined}/>
			<Divider/>
		</SafeAreaView>
	)
}

