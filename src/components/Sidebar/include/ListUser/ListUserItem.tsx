import React from 'react'
import {useData} from '../../../../core/hooks/useData'
import {Avatar} from '../../../ui/Avatar/Avatar'
import {IUser} from '../../../../core/context/DataContext'

export const ListUserItem = (user: IUser) => {
  const {activeChat, setActiveChat} = useData()
  const activeClass = 'msgr__list-user_item-active'

  const handleChooseChat = () => {
    setActiveChat({type: 'user', data: user})
  }

  return (
    <div
      className={`msgr__list-user_item ${activeChat?.data.uuid === user.uuid && activeClass}`}
      onClick={handleChooseChat}
    >
      <Avatar avatar_url={user.avatar_url} uuid={user.uuid} alt={user.first_name} />
      <div className="msgr__list-user_info">
        <strong>
          {user.first_name} {user.second_name}
        </strong>
        {user.role_id !== 0 && <small>{user.email}</small>}
      </div>
    </div>
  )
}
