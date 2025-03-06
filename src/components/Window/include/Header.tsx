import React from 'react'
import {useSettings} from '../../../core/hooks/useSettings'
import {useData} from '../../../core/hooks/useData'
import {useSocket} from '../../../core/hooks/useSocket'
import {useColors} from '../../../core/hooks/useColors'
import {useTranslate} from '../../../core/hooks/useTranslate'
import {ButtonIcon} from '../../ui/ButtonIcon/ButtonIcon'
import {Avatar} from '../../ui/Avatar/Avatar'
import {replaceSvgFill} from '../../../utils/tools'
import {imagesUrl} from '../../../configs/images-url'

export const Header = () => {
  const {isConnected} = useSocket()
  const {sidebar, setSidebar} = useSettings()
  const {activeChat} = useData()
  const {color} = useColors()
  const {t} = useTranslate()

  const handleOpenSidebar = () => {
    setSidebar('full')
  }

  return (
    <div className="msgr__header">
      {sidebar === 'none' ? (
        <ButtonIcon
          icon={<img src={replaceSvgFill(imagesUrl.list, color)} alt="list" />}
          onClick={handleOpenSidebar}
          tooltip={t('tooltips.open_sidebar')}
        />
      ) : null}

      {activeChat && (
        <div className="msgr__header_user">
          <Avatar
            avatar_url={activeChat.data.avatar_url}
            uuid={activeChat.data.uuid}
            alt={activeChat.data.first_name}
          />
          <div className="msgr__header_info">
            {activeChat.data.first_name} {activeChat.data.second_name}
          </div>
        </div>
      )}

      <div
        className="msgr__header_signal"
        title={isConnected ? t('tooltips.online') : t('tooltips.offline')}
      >
        <img
          src={replaceSvgFill(imagesUrl.network, isConnected ? 'limegreen' : 'tomato')}
          alt="network"
        />
      </div>
    </div>
  )
}
