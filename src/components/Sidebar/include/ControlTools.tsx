import React from 'react'
import {useSettings} from '../../../core/hooks/useSettings'
import {useTranslate} from '../../../core/hooks/useTranslate'
import {useColors} from '../../../core/hooks/useColors'
import {ButtonIcon} from '../../ui/ButtonIcon/ButtonIcon'
import {replaceSvgFill} from '../../../utils/tools'
import {imagesUrl} from '../../../configs/images-url'

export const ControlTools = () => {
  const {t} = useTranslate()
  const {color} = useColors()
  const {sidebar, setSidebar, fullScreen, setFullScreen, theme, setTheme, lang, setLang} =
    useSettings()

  const handleSwitchSidebar = () => {
    setSidebar(sidebar === 'full' ? 'mini' : 'full')
  }

  const handleSwitchScreen = () => {
    setFullScreen(!fullScreen)
  }

  const handleSwitchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleSwitchLang = () => {
    const nextLang = lang === 'ru' ? 'en' : 'ru'
    setLang(nextLang)
  }

  return (
    <div className="msgr__control-tools">
      <ButtonIcon
        icon={
          fullScreen ? (
            <img src={replaceSvgFill(imagesUrl.minimize, color)} alt="minimize" />
          ) : (
            <img src={replaceSvgFill(imagesUrl.expand, color)} alt="expand" />
          )
        }
        onClick={handleSwitchScreen}
        tooltip={t('tooltips.full_screen')}
      />

      <ButtonIcon
        icon={
          theme === 'dark' ? (
            <img src={replaceSvgFill(imagesUrl.sun, color)} alt="light" />
          ) : (
            <img src={replaceSvgFill(imagesUrl.moon, color)} alt="dark" />
          )
        }
        onClick={handleSwitchTheme}
        tooltip={t('tooltips.change_theme')}
      />

      <ButtonIcon
        icon={
          lang === 'ru' ? (
            <img src={imagesUrl.eng} alt="eng" />
          ) : (
            <img src={imagesUrl.rus} alt="rus" />
          )
        }
        tooltip={t('tooltips.change_lang')}
        onClick={handleSwitchLang}
      />

      <div className="msgr__control-tools_sidebar">
        <ButtonIcon
          icon={<img src={replaceSvgFill(imagesUrl.arrow, color)} alt="mini" />}
          onClick={handleSwitchSidebar}
          width={sidebar === 'mini' ? '100%' : false}
          tooltip={t('tooltips.change_size_sidebar')}
        />
      </div>
    </div>
  )
}
