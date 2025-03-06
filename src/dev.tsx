import React from 'react'
import {createRoot} from 'react-dom/client'
import {Messenger} from './index'

/*For development*/

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<Messenger />)
