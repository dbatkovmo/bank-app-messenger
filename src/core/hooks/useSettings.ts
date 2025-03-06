import {useContext} from 'react'
import {ISettingsContext, SettingsContext} from '../context/SettingsContext'

export const useSettings = (): ISettingsContext => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
