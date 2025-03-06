import {io, Socket} from 'socket.io-client'
import {env} from '../configs/env'

// https://railway.com/dashboard
// Вход через Git
// Vercel не поддерживает socket

export const createSocket = (tokenAccess: string): Socket => {
  console.info('Messenger ::::', process.env.NODE_ENV, env.socket_host)

  return io(env.socket_host, {
    transports: ['websocket'],
    withCredentials: true,
    autoConnect: false, // Отключаем авто-подключение
    auth: {
      token: tokenAccess
    }
  })
}

/*Фейковый сокет заглушка без подключения
 * для избавления от проверок на socket при использовании useSocket*/
export const dummySocket: Socket = Object.assign(
  io({
    autoConnect: false, // Отключаем автоматическое подключение
    reconnection: false // Запрещаем автоматическое переподключение
  }),
  {
    // Заглушаем методы
    connect: () => null,
    disconnect: () => null,
    emit: () => null,
    on: () => dummySocket,
    off: () => dummySocket
  }
)
