import create from 'zustand'
import {combine} from 'zustand/middleware'

interface ThemeStoreState {
  theme: 'light' | 'dark'
}

export const useThemeStore = create(
	combine({ theme: 'light' } as ThemeStoreState, set => ({
		toggleTheme: () => set(state => ({
			theme: state.theme === 'light' ? 'dark' : 'light'
		})),
	}))
) 