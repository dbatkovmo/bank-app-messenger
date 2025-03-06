import {useContext} from 'react'
import {SettingsContext} from '../context/SettingsContext'
import {colors} from '../../configs/colors'

export const useColors = (): {color: string} => {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error('useColors must be used within a SettingsProvider')
  }

  const color = context.theme === 'dark' ? colors.light : colors.dark

  return {color}
}
