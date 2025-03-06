import React, {createContext, ReactNode, useEffect, useState} from 'react'
import {SOCKET_EVENTS} from '../../configs/socket-events'
import {sortByUserUuid} from '../../utils/data'
import {useSocket} from '../hooks/useSocket'

export interface IUser {
  uuid: string
  email: string
  role_id: number
  tariff_id: number
  first_name: string
  second_name: string
  avatar_url: string
}

export interface IActiveChat {
  type: 'user' | 'group'
  data: IUser
}

export interface IDataContext {
  userId: IUser['uuid']
  users: IUser[]
  searchText: string
  setSearchText: (text: string) => void
  activeChat: IActiveChat | null
  setActiveChat: (data: IActiveChat | null) => void
}

export const DataContext = createContext<IDataContext | null>(null)

export const DataProvider = ({children}: {children: ReactNode}) => {
  const {socket} = useSocket()
  const [userId, setUserId] = useState<IUser['uuid']>('')
  const [users, setUsers] = useState<IUser[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [activeChat, setActiveChat] = useState<IActiveChat | null>(null)

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit(SOCKET_EVENTS.REGISTRY_USER)
    })

    socket.on(SOCKET_EVENTS.REGISTRY_USER, (userId: string) => {
      setUserId(userId)
    })

    return () => {
      socket.off(SOCKET_EVENTS.REGISTRY_USER)
      socket.off('connect')
    }
  }, [])

  useEffect(() => {
    socket.on(SOCKET_EVENTS.UPDATE_ONLINE_USERS, (list: IUser[]) => {
      setUsers(sortByUserUuid(list, userId))
    })
    socket.emit(SOCKET_EVENTS.GET_ONLINE_USERS)

    return () => {
      socket.off(SOCKET_EVENTS.UPDATE_ONLINE_USERS)
    }
  }, [userId])

  return (
    <DataContext.Provider
      value={{
        userId,
        users,
        searchText,
        setSearchText,
        activeChat,
        setActiveChat
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
