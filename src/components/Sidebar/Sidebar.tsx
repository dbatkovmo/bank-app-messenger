import React from 'react'
import {useSettings} from '../../core/hooks/useSettings'
import {SearchUser} from './include/SearchUser'
import {ListUser} from './include/ListUser/ListUser'
import {ControlTools} from './include/ControlTools'
import './Sidebar.scss'

export const Sidebar = () => {
  const {sidebar} = useSettings()
  const modeMiniClass = sidebar === 'full' ? '' : 'msgr__sidebar_mini'

  return (
    <div className={`msgr__sidebar ${modeMiniClass}`}>
      <SearchUser />
      <ListUser />
      <ControlTools />
    </div>
  )
}
