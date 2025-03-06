import React from 'react'
import {useData} from '../../core/hooks/useData'
import {Header} from './include/Header'
import {Dialog} from './include/Dialog/Dialog'
import {DialogStart} from './include/Dialog/DialogStart'
import {Footer} from './include/Footer'
import './Window.scss'

export const Window = () => {
  const {activeChat} = useData()

  return (
    <div className="msgr__window">
      <Header />
      {activeChat ? <Dialog /> : <DialogStart />}
      {activeChat && <Footer />}
    </div>
  )
}
