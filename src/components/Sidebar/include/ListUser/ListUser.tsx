import React, {useEffect, useState} from 'react'
import {IUser} from '../../../../core/context/DataContext'
import {useData} from '../../../../core/hooks/useData'
import {useTranslate} from '../../../../core/hooks/useTranslate'
import {useColors} from '../../../../core/hooks/useColors'
import {searchUsers} from '../../../../utils/data'
import {ListUserItem} from './ListUserItem'
import {replaceSvgFill} from '../../../../utils/tools'
import {imagesUrl} from '../../../../configs/images-url'

export const ListUser = () => {
  const {users, searchText} = useData()
  const {color} = useColors()
  const [list, setList] = useState<IUser[]>(users)
  const {t} = useTranslate()

  useEffect(() => {
    if (searchText) {
      const result = searchUsers(users, searchText)
      setList(result)
    } else {
      setList(users)
    }
  }, [searchText, users])

  return (
    <div className="msgr__list-user">
      {list.length ? (
        list.map(user => <ListUserItem {...user} key={user.uuid} />)
      ) : (
        <div className="msgr__list-user_alert">
          <img src={replaceSvgFill(imagesUrl.info, color)} alt="info" />{' '}
          <div>{searchText ? `${t('tips.not_found')}: ${searchText}` : t('tips.user_offline')}</div>
        </div>
      )}
    </div>
  )
}
