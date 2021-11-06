import React from 'react'

import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppNavigator } from './RootNavigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useThemeStore } from './stores/theme'

export default function App() {
	const theme =  useThemeStore(state => state.theme)

	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva[theme]}>
				<SafeAreaProvider>
					<AppNavigator/>
				</SafeAreaProvider>
			</ApplicationProvider>

		</>
	)
}
