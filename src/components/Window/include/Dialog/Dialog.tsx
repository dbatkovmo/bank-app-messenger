import React, {useEffect, useRef, useState} from 'react'
import {useSocket} from '../../../../core/hooks/useSocket'
import {SOCKET_EVENTS} from '../../../../configs/socket-events'
import {useData} from '../../../../core/hooks/useData'
import {formatterDateMsg} from '../../../../utils/data'
import {MsgItem} from './MsgItem'

interface IChatMessage {
  message: string
  senderId: string
  timestamp: Date
}

export const Dialog = () => {
  const chatDialogRef = useRef<HTMLDivElement>(null)
  const {socket} = useSocket()
  const {userId, activeChat} = useData()
  const [messages, setMessages] = useState<IChatMessage[]>([])

  useEffect(() => {
    // Чистим холст при смене активного чата
    setMessages([])

    socket.on(SOCKET_EVENTS.RECEIVE_PRIVATE_MSG, (msg: IChatMessage) => {
      // Выводим смс если выбран чат с отправителем или пишешь сам себе
      if (msg.senderId === activeChat?.data.uuid || msg.senderId === userId) {
        setMessages(prev => [...prev, msg])
      }
    })

    // socketIns.on('receiveGroupMessage', (msg: Message) => {
    //   if (groupId) {
    //     setMessages(prev => [...prev, msg])
    //   }
    // })

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_PRIVATE_MSG)
      // socketIns.off('receiveGroupMessage')
    }
  }, [activeChat])

  useEffect(() => {
    // Прокрутка скролла при новом сообщении
    if (chatDialogRef.current) {
      const dialog = chatDialogRef.current
      dialog.scrollTo({
        top: dialog.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  return (
    <div className="msgr__dialog" ref={chatDialogRef}>
      {messages.map((msg, idx) => (
        <MsgItem
          key={idx}
          text={msg.message}
          time={formatterDateMsg(msg.timestamp)}
          isSelf={msg.senderId === userId}
        />
      ))}
    </div>
  )
}
