import {useContext} from 'react'
import {ISocketContext, SocketContext} from '../context/SocketContext'

export const useSocket = (): ISocketContext => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
