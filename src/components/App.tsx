import React from 'react'
import {useSettings} from '../core/hooks/useSettings'
import {Sidebar} from './Sidebar/Sidebar'
import {Window} from './Window/Window'
import meta from '../configs/meta'
import '../styles/index.scss'

const App = () => {
  const {sidebar, fullScreen, theme} = useSettings()
  const fullScreenClass = fullScreen ? 'msgr__app_full-screen' : ''

  return (
    <div
      className={`msgr__app ${fullScreenClass}`}
      data-theme={theme}
      data-version={meta.version}
      data-author={meta.author}
    >
      {sidebar === 'none' ? null : <Sidebar />}
      <Window />
    </div>
  )
}

export default App
