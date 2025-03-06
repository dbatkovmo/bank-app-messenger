import React, {useRef} from 'react'
import {useData} from '../../../core/hooks/useData'
import {useTranslate} from '../../../core/hooks/useTranslate'
import {useSocket} from '../../../core/hooks/useSocket'
import {useColors} from '../../../core/hooks/useColors'
import {ButtonIcon} from '../../ui/ButtonIcon/ButtonIcon'
import {SOCKET_EVENTS} from '../../../configs/socket-events'
import {imagesUrl} from '../../../configs/images-url'
import {replaceSvgFill} from '../../../utils/tools'

export const Footer = () => {
  const {socket} = useSocket()
  const {activeChat} = useData()
  const {color} = useColors()
  const preRef = useRef<HTMLPreElement>(null)
  const {t} = useTranslate()

  const sendMessage = async (message: string) => {
    if (!message.trim()) {
      return
    }

    if (activeChat?.type === 'user') {
      socket.emit(SOCKET_EVENTS.SEND_PRIVATE_MSG, {
        receiverId: activeChat.data.uuid,
        message
      })
    }
    if (activeChat?.type === 'group') {
      // socketIns.emit("sendGroupMessage", { groupId: '123', message })
      // console.log('send to group:', message)
    }

    if (preRef.current) {
      preRef.current.innerHTML = ''
    }
  }

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLPreElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(preRef.current?.textContent || '')
    }
  }

  const handleSubmit = () => {
    sendMessage(preRef.current?.textContent || '')
  }

  return (
    <div className="msgr__footer">
      <pre
        ref={preRef}
        contentEditable={true}
        data-placeholder={t('placeholders.message')}
        onInput={e => {
          const pre = e.currentTarget
          if (!pre.textContent?.trim()) {
            pre.innerHTML = ''
          }
        }}
        onKeyDown={handleKeyEnter}
      />
      <ButtonIcon
        icon={<img src={replaceSvgFill(imagesUrl.send, color)} alt="send" />}
        onClick={handleSubmit}
        width="50px"
      />
    </div>
  )
}
