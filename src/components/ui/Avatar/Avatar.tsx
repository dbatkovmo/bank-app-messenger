import React from 'react'
import {IUser} from '../../../core/context/DataContext'
import {useData} from '../../../core/hooks/useData'
import './Avatar.scss'

interface IAvatar {
  avatar_url: IUser['avatar_url']
  uuid: IUser['uuid']
  size?: number
  alt?: string
  shape?: 'circle' | 'square'
}

export const Avatar = ({avatar_url, uuid, size = 40, alt = '', shape = 'square'}: IAvatar) => {
  const {userId} = useData()
  const [imgError, setImgError] = React.useState(false)

  // Обработка ошибки загрузки изображения
  const handleError = () => {
    setImgError(true)
  }

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: shape === 'circle' ? '50%' : '6px'
  }

  const AvatarType = () => {
    return userId === uuid ? (
      <span className="msgr__avatar-self">❤</span> // ✴
    ) : (
      <img src={avatar_url} alt={alt} onError={handleError} />
    )
  }

  return (
    <div className="msgr__avatar" style={avatarStyle}>
      {avatar_url && !imgError ? (
        <AvatarType />
      ) : (
        <span className="msgr__avatar-fallback">{alt?.charAt(0)?.toUpperCase() || '?'}</span>
      )}
    </div>
  )
}
