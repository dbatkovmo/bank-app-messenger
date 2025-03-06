import React, {useEffect, useState} from 'react'
import {IMessengerProps} from './types/initial.types'
import {SocketProvider} from './core/context/SocketContext'
import {SettingsProvider} from './core/context/SettingsContext'
import {DataProvider} from './core/context/DataContext'
import {generateFingerprint} from './utils/tools'
import {Loader} from './components/ui/Loader/Loader'
import App from './components/App'

const Messenger = (options: IMessengerProps) => {
  const {token, ...settingOptions} = options
  const [fingerprint, setFingerprint] = useState<string | null>(null)

  useEffect(() => {
    generateFingerprint().then(setFingerprint)
  }, [])

  if (!fingerprint) {
    return <Loader />
  }

  return (
    <SocketProvider token={token || fingerprint}>
      <SettingsProvider options={settingOptions}>
        <DataProvider>
          <App />
        </DataProvider>
      </SettingsProvider>
    </SocketProvider>
  )
}

export default Messenger
