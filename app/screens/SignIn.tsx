import { Button, Icon, IconProps, Input, Layout } from '@ui-kitten/components'
import React, { ReactElement, useState } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

export function PasswordInput(): ReactElement {
	const [value, setValue] = React.useState('')
	const [secureTextEntry, setSecureTextEntry] = React.useState(true)

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry)
	}

	const renderIcon = (props: IconProps) => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
		</TouchableWithoutFeedback>
	)

 
	return (
		<Input
			value={value}
			label='PASSWORD'
			placeholder='Password'
			accessoryRight={renderIcon}
			secureTextEntry={secureTextEntry}
			onChangeText={nextValue => setValue(nextValue)}
		/>
	)
}

export function SignInScreen(): ReactElement {
	const [username, setUsername] = useState('')

	return (
		<Layout style={{flex: 1}}>
			<Input
				value={username}
				label='USERNAME/EMAIL'
				placeholder='Username/Email'
				accessoryRight={<Icon name='person' />}
				onChangeText={nextValue => setUsername(nextValue)}
			/>
			<PasswordInput />

			<Button onPress={() => alert('hello')}>Sign In</Button>
		</Layout>
	)
}