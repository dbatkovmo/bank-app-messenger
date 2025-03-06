import React, {createContext, useEffect, useState, ReactNode, useMemo} from 'react'
import {Socket} from 'socket.io-client'
import {createSocket, dummySocket} from '../../utils/socket'

export interface ISocketContext {
  socket: Socket
  isConnected: boolean
}

export const SocketContext = createContext<ISocketContext | null>(null)

export const SocketProvider = ({token, children}: {token: string; children: ReactNode}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false)

  const socket = useMemo(() => {
    if (!token) {
      return dummySocket
    }
    return createSocket(token)
  }, [token])

  useEffect(() => {
    if (socket === dummySocket) {
      // Не подключаемся к фейковому сокету
      return
    }

    socket.connect()
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))
    socket?.on('error', error => {
      console.log('Socket error', error)
    })

    return () => {
      socket.disconnect()
    }
  }, [socket])

  return <SocketContext.Provider value={{socket, isConnected}}>{children}</SocketContext.Provider>
}
