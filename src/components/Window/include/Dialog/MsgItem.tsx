import React from 'react'

interface IChatMsgItem {
  text: string
  time: string
  isSelf?: boolean
}

export const MsgItem = ({text, time, isSelf}: IChatMsgItem) => {
  const sideClass = isSelf ? 'msgr__msg-sender' : 'msgr__msg-receiver'

  return (
    <div className={`msgr__msg ${sideClass}`}>
      <div className="msgr__msg-cloud">
        <div className="msgr__msg-text">{text}</div>
        <div className="msgr__msg-time">{time}</div>
      </div>
    </div>
  )
}
