import {useContext} from 'react'
import {SettingsContext} from '../context/SettingsContext'
import {getNestedValue} from '../../utils/data'
import en from '../../assets/locales/en/translation.json'
import ru from '../../assets/locales/ru/translation.json'

const dictionaries = {ru, en}

export const useTranslate = (): {
  t: (path: string) => string
} => {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error('useTranslate must be used within a SettingsProvider')
  }

  const dictionary = dictionaries[context.lang]

  const t = (path: string): string => {
    return getNestedValue(dictionary, path)
  }

  return {t}
}
