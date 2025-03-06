import React, {createContext, ReactNode, useState} from 'react'
import {DEFAULT_OPTIONS} from '../../configs/default-options'
import {LOCALSTORAGE} from '../../configs/localstorage'
import {IMessengerProps} from '../../types/initial.types'
import {ModeLang, ModeSidebar, ModeTheme} from '../../types/base.types'
import {defineStartLang, defineStartTheme} from '../../utils/data'

export interface ISettingsContext {
  fullScreen: boolean
  setFullScreen: (fullScreen: boolean) => void
  theme: ModeTheme
  setTheme: (theme: ModeTheme) => void
  lang: ModeLang
  setLang: (lang: ModeLang) => void
  sidebar: ModeSidebar
  setSidebar: (sidebar: ModeSidebar) => void
}

interface ISettingsProvider {
  children: ReactNode
  options: Omit<IMessengerProps, 'token'>
}

export const SettingsContext = createContext<ISettingsContext | null>(null)

export const SettingsProvider = ({children, options}: ISettingsProvider) => {
  const mergedOptions = {...DEFAULT_OPTIONS, ...options} // дополняем не переданные параметры
  const [lang, saveLang] = useState<ModeLang>(defineStartLang(mergedOptions.lang))
  const [theme, saveTheme] = useState<ModeTheme>(defineStartTheme(mergedOptions.theme))
  const [sidebar, setSidebar] = useState<ModeSidebar>(mergedOptions.sidebar)
  const [fullScreen, setFullScreen] = useState<boolean>(mergedOptions.fullScreen)

  const setTheme = (theme: ModeTheme) => {
    saveTheme(theme)
    window.localStorage.setItem(LOCALSTORAGE.THEME, theme)
  }

  const setLang = (lang: ModeLang) => {
    saveLang(lang)
    window.localStorage.setItem(LOCALSTORAGE.LANG, lang)
  }

  return (
    <SettingsContext.Provider
      value={{
        fullScreen,
        setFullScreen,
        theme,
        setTheme,
        lang,
        setLang,
        sidebar,
        setSidebar
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
